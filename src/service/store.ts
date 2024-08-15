import { configureStore } from '@reduxjs/toolkit';
import countrySliceReducer from './countrySlice';
import formDataReducer from './formDataSlice';

export const store = configureStore({
    reducer: {
        country: countrySliceReducer,
        formData: formDataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
