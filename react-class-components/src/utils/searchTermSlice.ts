import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface searchTermState {
    searchTerm: string | null;
}

const initialState: searchTermState = {
    searchTerm: null,
};

export const searchTermSlice = createSlice({
    name: 'searchTerm',
    initialState,
    reducers: {
        setTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
    },
});

export const { setTerm } = searchTermSlice.actions;

export const getSearchTerm = (state: RootState) => state.searchTerm.searchTerm;

export default searchTermSlice.reducer;
