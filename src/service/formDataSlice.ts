import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type TFormData = {
    name: string;
    age: string;
    email: string;
    gender: string;
    acceptTC: boolean;
    country: string;
    file: string | ArrayBuffer | null;
};

const initialState: TFormData[] = [];

const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        addFormData: (state, action: PayloadAction<TFormData>) => {
            state.push(action.payload);
        },
    },
});

export const { addFormData } = formDataSlice.actions;

export const getData = (state: RootState) => state.formData;

export default formDataSlice.reducer;
