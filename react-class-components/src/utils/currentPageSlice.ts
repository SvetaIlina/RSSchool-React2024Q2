import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharactersResponse, SwapiPerson } from '../types/type';
import { Page } from '../types/enums';
import { RootState } from './store';

export interface currentPageState {
    totalPage: number;
    currentPage: number;
    results: SwapiPerson[];
}

const initialState: currentPageState = {
    totalPage: 0,
    currentPage: 1,
    results: [],
};

export const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState,
    reducers: {
        setResults: (state, action: PayloadAction<CharactersResponse>) => {
            state.totalPage = Math.ceil(action.payload.itemsCount / Page.TOTAL);
            state.results = action.payload.results;
        },
        setCurrentPageNumber: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        clearResults(state) {
            state.totalPage = 0;
            state.currentPage = 0;
            state.results = [];
        },
    },
});

export const { setResults, clearResults, setCurrentPageNumber } = currentPageSlice.actions;

export const getTotalPage = (state: RootState) => state.currentPage.totalPage;
export const getCurrentPage = (state: RootState) => state.currentPage.currentPage;
export const getItems = (state: RootState) => state.currentPage.results;

export default currentPageSlice.reducer;
