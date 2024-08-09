import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, Mock, vi } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/context';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemReducer from '../utils/selectedItemlSlice';
import MainPage from 'src/components/main/mainPage';
import { mockResults } from './mockData';
import { useLocation, useNavigation } from '@remix-run/react';

let store = configureStore({
    reducer: {
        selectedItem: selectedItemReducer,
    },
});
const mockNavigate = vi.fn();
vi.mock('@remix-run/react', () => ({
    useLocation: vi.fn(),
    useNavigation: vi.fn(),
    NavLink: vi.fn(),
    useNavigate: () => mockNavigate,
}));

beforeEach(() => {
    store = configureStore({
        reducer: {
            selectedItem: selectedItemReducer,
        },
    });
    (useLocation as Mock).mockReturnValue({
        pathname: '/',
        search: '?page=1',
    });
    (useNavigation as Mock).mockReturnValue({
        state: 'idle',
        location: null,
    });
});

describe('Main Page', () => {
    it('when at least 1 item has been selected, the flyout element should appear', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ThemeProvider>
                        <MainPage searchResult={mockResults} totalPages={1} />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );
        await waitFor(() => {
            const inputs = screen.getAllByLabelText('Add to favorites');
            inputs.forEach((input) => fireEvent.click(input));
            expect(store.getState().selectedItem.details.length).toBe(2);
            expect(screen.getByText('You have 2 favorite characters')).toBeInTheDocument();
        });
    });
    it('toggles theme on button click', () => {
        const { container } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <ThemeProvider>
                        <MainPage searchResult={mockResults} totalPages={1} />
                    </ThemeProvider>
                </MemoryRouter>
            </Provider>
        );
        const wrapper = container.querySelector('.wrapper');
        const toggleButton = screen.getByText('Toggle Theme');
        expect(wrapper).not.toHaveClass('dark-theme');
        expect(document.body.style.backgroundColor).toBe('rgb(238, 226, 220)');
        fireEvent.click(toggleButton);
        expect(wrapper).toHaveClass('dark-theme');
        expect(wrapper).toBeInTheDocument();
        expect(document.body.style.backgroundColor).toBe('rgb(18, 60, 105)');
        fireEvent.click(toggleButton);
        expect(document.body.style.backgroundColor).toBe('rgb(238, 226, 220)');
    });
});
