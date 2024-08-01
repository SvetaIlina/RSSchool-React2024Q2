import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, Mock, vi } from 'vitest';
import SearchSection from '../components/searchSection/searchSection';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import currentPageReducer from '../utils/currentPageSlice';
import React from 'react';
import { ThemeProvider } from '../context/context';
import { useRouter } from 'next/router';
const store = configureStore({
    reducer: {
        currentPage: currentPageReducer,
    },
});

describe('DetailPage Component', () => {
    it('clicking the Search button saves the entered value to the local storage', () => {
        const push = vi.fn();

        (useRouter as Mock).mockImplementation(() => ({
            push,
        }));
        render(
            <Provider store={store}>
                <ThemeProvider>
                    <SearchSection />
                </ThemeProvider>
            </Provider>
        );

        const input = screen.getByRole('textbox');
        const searcBtn = screen.getByText('Search');
        fireEvent.change(input, { target: { value: 'test query' } });
        fireEvent.click(searcBtn);
        expect(localStorage.getItem('searchTerm')).toBe('"test query"');
    });
    it('component retrieves the value from the local storage upon mounting', () => {
        const push = vi.fn();

        (useRouter as Mock).mockImplementation(() => ({
            push,
        }));
        render(
            <Provider store={store}>
                <ThemeProvider>
                    <SearchSection />
                </ThemeProvider>
            </Provider>
        );
        const input: HTMLInputElement = screen.getByRole('textbox');
        expect(input.value).toBe('test query');
    });
});
