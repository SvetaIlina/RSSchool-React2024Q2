import { render, screen, waitFor } from '@testing-library/react';
import ResultsSection from '../components/resultSection/resultSection';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../utils/apiSlice';
import selectedItemReducer from '../utils/selectedItemlSlice';
import currentPageReducer from '../utils/currentPageSlice';
import searchTermReduser, { searchTermState } from '../utils/searchTermSlice';

type PreloadedState = { searchTerm: searchTermState };

const preloadedState: PreloadedState = {
    searchTerm: {
        searchTerm: 'ddd',
    },
};

const createStore = (preloadedState?: PreloadedState) =>
    configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
            currentPage: currentPageReducer,
            selectedItem: selectedItemReducer,
            searchTerm: searchTermReduser,
        },
        preloadedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    });

describe('ResulSection Component', () => {
    it('renders the correct number of cards based on the API response', async () => {
        render(
            <Provider store={createStore()}>
                <MemoryRouter>
                    <ResultsSection />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getAllByRole('heading')).toHaveLength(2);
        });
    });
    it('Check that an appropriate message is displayed if no cards are present.', async () => {
        render(
            <Provider store={createStore(preloadedState)}>
                <MemoryRouter>
                    <ResultsSection />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('No results found')).toBeInTheDocument();
        });
    });
});
