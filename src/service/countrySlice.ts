import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import countries from './countryData';

type TCountryState = {
    countries: string[];
};

const initialState: TCountryState = {
    countries: countries,
};

const countrySlice = createSlice({ name: 'country', initialState, reducers: {} });

export const getSelectCountries = (state: RootState) => state.country.countries;

export default countrySlice.reducer;
