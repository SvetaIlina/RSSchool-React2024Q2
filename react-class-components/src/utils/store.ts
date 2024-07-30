import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import currentPageReducer from './currentPageSlice';
import selectedItemReducer from './selectedItemlSlice';
import searchTermReduser from './searchTermSlice';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
    configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
            currentPage: currentPageReducer,
            selectedItem: selectedItemReducer,
            searchTerm: searchTermReduser,
        },

        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper(makeStore);
