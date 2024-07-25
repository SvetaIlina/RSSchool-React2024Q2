import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DetailPage from '../pages/detailPage/detailPage';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../utils/apiSlice';

let store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

beforeEach(() => {
    store = configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
        },

        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    });
});

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router-dom')>();
    return {
        ...actual,
        useParams: () => ({ name: 'Luke Skywalker' }),
    };
});

describe('DetailPage Component', () => {
    it('should render detail page with correct character information', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <DetailPage />
                </MemoryRouter>
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
    it('loading indicator is displayed while fetching data', async () => {
        const { container } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <DetailPage />
                </MemoryRouter>
            </Provider>
        );
        const loader = container.querySelector('.loader-wrapper');
        expect(loader).toBeInTheDocument();
        await waitFor(() => {
            const loaderAfterLoad = container.querySelector('.loader-wrapper');
            expect(loaderAfterLoad).not.toBeInTheDocument();
        });
    });
    it('clicking the close button hides the component', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <DetailPage />
                </MemoryRouter>
            </Provider>
        );
        const closeBtn = screen.getByRole('button');
        fireEvent.click(closeBtn);
        expect(screen.queryByText(/Luke Skywalker/i)).not.toBeInTheDocument();
    });
});
