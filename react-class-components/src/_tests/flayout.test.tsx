import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemReducer, { SelectedItemsState } from '../utils/selectedItemlSlice';
import Flyout from '../components/flyout/flyout';
import { mockResults } from './mockData';
import { convertToCSV } from '../services/services';
import React from 'react';
import { ThemeProvider } from '../context/context';

const preloadedState: { selectedItem: SelectedItemsState } = {
    selectedItem: {
        details: mockResults.results,
    },
};

let store = configureStore({
    reducer: {
        selectedItem: selectedItemReducer,
    },

    preloadedState,
});

beforeEach(() => {
    store = configureStore({
        reducer: {
            selectedItem: selectedItemReducer,
        },
        preloadedState,
    });
});

describe('Flyout Component', () => {
    it('should contain number of selected elements', () => {
        render(
            <Provider store={store}>
                <ThemeProvider>
                    <Flyout />
                </ThemeProvider>
            </Provider>
        );

        expect(screen.getByText('You have 2 favorite characters')).toBeInTheDocument();
    });
    it('When "Unselect all" button is clicked, all the selected items should be unselected and the flyout should be removed from the page', () => {
        render(
            <Provider store={store}>
                <ThemeProvider>
                    <Flyout />
                </ThemeProvider>
            </Provider>
        );
        const unselectBtn = screen.getByText('Unselect all');
        fireEvent.click(unselectBtn);
        expect(store.getState().selectedItem.details.length).toBe(0);
        expect(unselectBtn).not.toBeInTheDocument();
    });
    it('When "Download" button is clicked, the list of selected items should save to the .csv file, name should contain the number of selected items', () => {
        render(
            <Provider store={store}>
                <ThemeProvider>
                    <Flyout />
                </ThemeProvider>
            </Provider>
        );
        const downloadLink = screen.getByText('Download');
        fireEvent.click(downloadLink);
        const csvContent = convertToCSV(mockResults.results);

        const expectedBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });

        expect(downloadLink).toHaveAttribute('href');
        expect(downloadLink).toHaveAttribute('download', '2_starwars_characters.csv');
        expect(global.URL.createObjectURL).toHaveBeenCalledWith(expectedBlob);
    });
});
