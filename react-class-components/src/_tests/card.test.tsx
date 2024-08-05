import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { mockResults } from './mockData';
import Card from '../components/resultSection/card/card';
import selectedItemReducer from '../utils/selectedItemlSlice';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '../context/context';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Provider } from 'react-redux';

let store = configureStore({
    reducer: {
        selectedItem: selectedItemReducer,
    },
});

beforeEach(() => {
    store = configureStore({
        reducer: {
            selectedItem: selectedItemReducer,
        },
    });
});

const character = mockResults.results[0];

const push = vi.fn();

(useRouter as Mock).mockImplementation(() => ({
    push,
}));
(usePathname as Mock).mockReturnValue('/');

const mockSearchParams = new URLSearchParams();

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
        mockSearchParams.set('details', 'Luke+Skywalker');
        (useSearchParams as Mock).mockReturnValue(mockSearchParams);

        render(
            <Provider store={store}>
                <ThemeProvider>
                    <Card character={character} />
                </ThemeProvider>
            </Provider>
        );
        const cardBtn = screen.getByText('Show Details');
        fireEvent.click(cardBtn);
        expect(push).toHaveBeenCalledWith('/?details=Luke+Skywalker');
    });
});
