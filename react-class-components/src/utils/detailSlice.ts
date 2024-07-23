import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SwapiPerson } from '../types/type';
import { RootState } from './store';

export interface SelectedItemState {
    character: SwapiPerson | null;
}

const initialState: SelectedItemState = {
    character: null,
};

export const selectedItemSlice = createSlice({
    name: 'selectedItem',
    initialState,
    reducers: {
        setSelectedItem(state, action: PayloadAction<SwapiPerson | null>) {
            state.character = action.payload;
        },
        clearSelectedItem(state) {
            state.character = null;
        },
    },
});

export const getSelectedItem = (state: RootState) => state.selectedItem.character;

export const { setSelectedItem, clearSelectedItem } = selectedItemSlice.actions;
export default selectedItemSlice.reducer;
