import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, Mock, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../utils/apiSlice';
import currentPageReducer from '../utils/currentPageSlice';
import Details from '../components/details/details';
import { mockSearchResultsLuke } from './mockData';
import React from 'react';
import { useRouter } from 'next/router';

let store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        currentPage: currentPageReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

beforeEach(() => {
    store = configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
            currentPage: currentPageReducer,
        },

        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    });
});

describe('DetailPage Component', () => {
    it('should render detail page with correct character information', async () => {
        render(
            <Provider store={store}>
                <Details initialDetailData={mockSearchResultsLuke} />
            </Provider>
        );

        await waitFor(() => {
            const characterName = screen.getByRole('heading', { name: /Luke Skywalker/i });
            expect(characterName).toBeInTheDocument();

            const descriptionText =
                'Luke Skywalker is 172 cm tall, weighs 77 kg, has blond hair, fair skin, and blue eyes.';
            const description = screen.getByText(descriptionText);
            expect(description).toBeInTheDocument();
        });
    });

    it('clicking the close button hides the component', async () => {
        const push = vi.fn();

        (useRouter as Mock).mockImplementation(() => ({
            query: { page: 1, details: 'Luke+Skywalker' },
            push,
        }));
        render(
            <Provider store={store}>
                <Details initialDetailData={mockSearchResultsLuke} />
            </Provider>
        );

        const closeBtn = screen.getByRole('button');
        fireEvent.click(closeBtn);

        expect(push).not.toHaveBeenCalledWith({
            query: { details: 'Luke+Skywalker' },
        });
    });
});
