import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SwapiPerson } from '../types/type';
import { RootState } from './store';

export interface SelectedItemsState {
    details: SwapiPerson[];
}

const initialState: SelectedItemsState = {
    details: [],
};

export const selectedItemSlice = createSlice({
    name: 'selectedItem',
    initialState,
    reducers: {
        toggleItemSelection(state, action: PayloadAction<SwapiPerson>) {
            const item = action.payload;
            const isSelected = state.details.some((selectedItem) => selectedItem.name === item.name);

            if (isSelected) {
                state.details = state.details.filter((selectedItem) => selectedItem.name !== item.name);
            } else {
                state.details.push(item);
            }
        },
        clearSelectedItems(state) {
            state.details = [];
        },
    },
});

export const getSelectedItemsDetails = (state: RootState) => state.selectedItem.details;
export const getNumberOfSelectedItems = (state: RootState) => state.selectedItem.details.length;

export const { toggleItemSelection, clearSelectedItems } = selectedItemSlice.actions;
export default selectedItemSlice.reducer;
