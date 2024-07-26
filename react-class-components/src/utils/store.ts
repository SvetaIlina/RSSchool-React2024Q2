import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import currentPageReducer from './currentPageSlice';
import selectedItemReducer from './selectedItemlSlice';
import searchTermReduser from './searchTermSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        currentPage: currentPageReducer,
        selectedItem: selectedItemReducer,
        searchTerm: searchTermReduser,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
