import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ResultsSection from '../components/resultSection/resultSection';
import { describe, it, expect, Mock, beforeEach, vi } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemReducer from '../utils/selectedItemlSlice';
import { mockResults, emptyMockResults } from './mockData';
import { useLocation, useNavigation } from '@remix-run/react';

const store = configureStore({
    reducer: {
        selectedItem: selectedItemReducer,
    },
});

vi.mock('@remix-run/react', () => ({
    useLocation: vi.fn(),
    useNavigation: vi.fn(),
    NavLink: vi.fn(),
}));

beforeEach(() => {
    (useLocation as Mock).mockReturnValue({
        pathname: '/',
        search: '?page=1',
    });
    (useNavigation as Mock).mockReturnValue({
        state: 'idle',
        location: null,
    });
});

describe('ResulSection Component', () => {
    it('renders the correct number of cards based on the API response', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ResultsSection results={mockResults} />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getAllByRole('heading')).toHaveLength(2);
        });
    });
    it('Check that an appropriate message is displayed if no cards are present.', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ResultsSection results={emptyMockResults} />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('No results found')).toBeInTheDocument();
        });
    });
    it('information about which items have been selected should be stored in the store', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ResultsSection results={mockResults} />
                </MemoryRouter>
            </Provider>
        );
        const inputs = screen.getAllByLabelText('Add to favorites');
        inputs.forEach((input) => fireEvent.click(input));

        await waitFor(() => {
            expect(store.getState().selectedItem.details).toHaveLength(2);
        });
    });
});
