// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { mockResults } from './mockData';
import Card from '../components/resultSection/card/card';
import { Provider } from 'react-redux';
import { apiSlice } from '../utils/apiSlice';
import selectedItemReducer from '../utils/selectedItemlSlice';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '../context/context';
import { server } from '../../vitestSetup';
import { useRouter } from 'next/router';

let store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        selectedItem: selectedItemReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

beforeEach(() => {
    store = configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
            selectedItem: selectedItemReducer,
        },

        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    });
});

const character = mockResults.results[0];

describe('Card Component', () => {
    it('renders the relevant card data', () => {
        render(
            <Provider store={store}>
                <ThemeProvider>
                    <Card character={character} />
                </ThemeProvider>
            </Provider>
        );
        const characterName = screen.getByText('Luke Skywalker');
        expect(characterName).toBeInTheDocument();
    });
    it('should navigate to detail page on card click ', () => {
        const push = vi.fn();

        (useRouter as Mock).mockImplementation(() => ({
            push,
        }));
        render(
            <Provider store={store}>
                <ThemeProvider>
                    <Card character={character} />
                </ThemeProvider>
            </Provider>
        );
        const cardBtn = screen.getByText('Show Details');
        fireEvent.click(cardBtn);
        expect(push).toHaveBeenCalledWith({
            query: { details: character.name },
        });
    });
    it('clicking triggers an additional API call to fetch detailed information', async () => {
        const push = vi.fn();

        (useRouter as Mock).mockImplementation(() => ({
            push,
        }));

        render(
            <Provider store={store}>
                <ThemeProvider>
                    <Card character={character} />
                </ThemeProvider>
            </Provider>
        );
        const cardBtn = screen.getByText('Show Details');
        fireEvent.click(cardBtn);
        await waitFor(() => {
            const apiCall = server.listHandlers()[0];
            expect(apiCall.isUsed);
        });
    });
});
