import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Pagination from '../components/pagination/pagination';
import currentPageReducer, { currentPageState } from '../utils/currentPageSlice';
import React from 'react';
import { useRouter } from 'next/router';

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
    it('should updates URL query parameter when page changes', async () => {
        const push = vi.fn();

        (useRouter as Mock).mockImplementation(() => ({
            push,
        }));

        render(
            <Provider store={store}>
                <Pagination />
            </Provider>
        );

        fireEvent.click(screen.getByText('Next'));

        await waitFor(() => {
            expect(push).toHaveBeenCalledWith({
                query: { page: 4 },
            });
            expect(store.getState().currentPage.currentPage).toBe(4);
        });
    });
    it('should updates URL query parameter when page changes', async () => {
        const push = vi.fn();

        (useRouter as Mock).mockImplementation(() => ({
            push,
        }));

        render(
            <Provider store={store}>
                <Pagination />
            </Provider>
        );

        fireEvent.click(screen.getByText('Previous'));

        await waitFor(() => {
            expect(push).toHaveBeenCalledWith({
                query: { page: 2 },
            });
            expect(store.getState().currentPage.currentPage).toBe(2);
        });
    });

    it('renders with correct current page and total pages', () => {
        render(
            <Provider store={store}>
                <Pagination />
            </Provider>
        );

        expect(screen.getByText('Page 3 of 5')).toBeInTheDocument();
        expect(screen.getByText('Previous')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('disables Previous button on the first page', () => {
        render(
            <Provider store={store}>
                <Pagination />
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
                <Pagination />
            </Provider>
        );

        const nextButton = screen.getByText('Next');
        for (let i = 0; i < 2; i++) {
            fireEvent.click(nextButton);
        }
        expect(nextButton).toBeDisabled();
    });
});
