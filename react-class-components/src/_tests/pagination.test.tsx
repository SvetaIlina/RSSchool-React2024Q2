import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Pagination from '../components/pagination/pagination';
import currentPageReducer, { currentPageState } from '../utils/currentPageSlice';
import { mockNavigate } from './mockData';

const preloadedState: { currentPage: currentPageState } = {
    currentPage: {
        currentPage: 3,
        totalPage: 5,
        results: [],
    },
};

let store = configureStore({
    reducer: {
        currentPage: currentPageReducer,
    },
    preloadedState,
});

beforeEach(() => {
    store = configureStore({
        reducer: {
            currentPage: currentPageReducer,
        },
        preloadedState,
    });
});

describe('Pagination Component', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it('should updates URL query parameter when page changes', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Pagination />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('Next'));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/?page=4');
            expect(store.getState().currentPage.currentPage).toBe(4);
        });
    });
    it('should updates URL query parameter when page changes', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Pagination />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('Previous'));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
            expect(store.getState().currentPage.currentPage).toBe(2);
        });
    });

    it('renders with correct current page and total pages', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Pagination />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Page 3 of 5')).toBeInTheDocument();
        expect(screen.getByText('Previous')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('disables Previous button on the first page', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Pagination />
                </MemoryRouter>
            </Provider>
        );

        const previousButton = screen.getByText('Previous');
        for (let i = 0; i < 2; i++) {
            fireEvent.click(previousButton);
        }
        expect(previousButton).toBeDisabled();
    });

    it('disables Next button on the last page', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Pagination />
                </MemoryRouter>
            </Provider>
        );

        const nextButton = screen.getByText('Next');
        for (let i = 0; i < 2; i++) {
            fireEvent.click(nextButton);
        }
        expect(nextButton).toBeDisabled();
    });
});
