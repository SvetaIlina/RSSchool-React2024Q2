import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next/types';
import { Provider } from 'react-redux';
import MainPage, { MainPageProps } from '../../pages/index';
import { ThemeProvider } from '../context/context';
import { configureStore } from '@reduxjs/toolkit';
import { SwapiPerson } from '../types/type';
import { mockCharactersResponse, mockSearchResults } from './mockData';
import { apiSlice } from '../utils/apiSlice';
import selectedItemReducer from '../utils/selectedItemlSlice';
import currentPageReducer from '../utils/currentPageSlice';
import searchTermReduser from '../utils/searchTermSlice';
import { useRouter } from 'next/router';

const mockGetServerSideProps = vi
    .fn()
    .mockImplementation((context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<MainPageProps>> => {
        const { query } = context;

        const initialData = mockCharactersResponse;
        let initialDetailsData: SwapiPerson[] = [];

        if (query.details === 'Luke+Skywalker') {
            initialDetailsData = mockSearchResults;
        }

        return Promise.resolve({
            props: {
                initialData,
                initialDetailsData,
            },
        });
    });

vi.mock('../../pages/index', async (importOriginal) => {
    const actual = await importOriginal<typeof import('../../pages/index')>();
    return {
        ...actual,
        getServerSideProps: vi.fn(),
    };
});

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
        const push = vi.fn();

        (useRouter as Mock).mockImplementation(() => ({
            push,
        }));
        const context = { query: { page: '2' } };
        const { props } = await mockGetServerSideProps(context);
        render(
            <Provider store={store}>
                <ThemeProvider>
                    <MainPage {...props} />
                </ThemeProvider>
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
        const push = vi.fn();

        (useRouter as Mock).mockImplementation(() => ({
            push,
        }));
        const { container } = render(
            <Provider store={store}>
                <ThemeProvider>
                    <MainPage initialData={mockCharactersResponse} initialDetailsData={mockSearchResults} />
                </ThemeProvider>
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
