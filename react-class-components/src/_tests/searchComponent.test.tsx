import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SearchSection from '../components/searchSection/searchSection';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import currentPageReducer from '../utils/currentPageSlice';
import searchTermReduser from '../utils/searchTermSlice';

const store = configureStore({
    reducer: {
        currentPage: currentPageReducer,
        searchTerm: searchTermReduser,
    },
});

describe('DetailPage Component', () => {
    it('clicking the Search button saves the entered value to the local storage', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <SearchSection />
                </MemoryRouter>
            </Provider>
        );

        const input = screen.getByRole('textbox');
        const searcBtn = screen.getByText('Search');
        fireEvent.change(input, { target: { value: 'test query' } });
        fireEvent.click(searcBtn);
        expect(store.getState().searchTerm.searchTerm).toBe('test query');
    });
    it('component retrieves the value from the local storage upon mounting', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <SearchSection />
                </MemoryRouter>
            </Provider>
        );
        const input: HTMLInputElement = screen.getByRole('textbox');
        expect(input.value).toBe('test query');
    });
});
