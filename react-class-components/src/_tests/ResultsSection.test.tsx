import { render, screen, waitFor } from '@testing-library/react';
import ResultsSection from '../components/resultSection/resultSection';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemReducer from '../utils/selectedItemlSlice';
import { mockResults } from './mockData';
import React from 'react';
import { ThemeProvider } from '../context/context';

const store = configureStore({
    reducer: {
        selectedItem: selectedItemReducer,
    },
});

describe('ResulSection Component', () => {
    it('renders the correct number of cards based on the API response', async () => {
        render(
            <Provider store={store}>
                <ThemeProvider>
                    <ResultsSection initialData={mockResults.results} />
                </ThemeProvider>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getAllByRole('heading')).toHaveLength(2);
        });
    });
    it('Check that an appropriate message is displayed if no cards are present.', async () => {
        render(
            <Provider store={store}>
                <ThemeProvider>
                    <ResultsSection initialData={[]} />
                </ThemeProvider>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('No results found')).toBeInTheDocument();
        });
    });
});
