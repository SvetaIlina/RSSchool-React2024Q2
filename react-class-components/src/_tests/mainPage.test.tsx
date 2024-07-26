import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '../pages/main/mainPage';
import { ThemeProvider } from '../context/context';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../utils/apiSlice';
import selectedItemReducer from '../utils/selectedItemlSlice';
import currentPageReducer from '../utils/currentPageSlice';
import searchTermReduser from '../utils/searchTermSlice';

let store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        currentPage: currentPageReducer,
        selectedItem: selectedItemReducer,
        searchTerm: searchTermReduser,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

beforeEach(() => {
    store = configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
            currentPage: currentPageReducer,
            selectedItem: selectedItemReducer,
            searchTerm: searchTermReduser,
        },

        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    });
});

describe('Main Page', () => {
    it('when at least 1 item has been selected, the flyout element should appear', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ThemeProvider>
                        <MainPage />
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
                        <MainPage />
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
