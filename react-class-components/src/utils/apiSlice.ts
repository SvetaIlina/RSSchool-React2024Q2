import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SwapiPeopleResponse, SwapiPerson } from '../types/type';

export const apiSlice = createApi({
    reducerPath: 'Swapi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
    endpoints: (builder) => ({
        getCharacters: builder.query<SwapiPerson[], { page: number }>({
            query: ({ page }) => `people/?page=${page}`,
            transformResponse: (response: SwapiPeopleResponse): SwapiPerson[] => response.results,
        }),
        getCharacterByName: builder.query<SwapiPerson[], { name: string }>({
            query: ({ name }) => `people/?search=${name}`,
            transformResponse: (response: SwapiPeopleResponse): SwapiPerson[] => response.results,
        }),
    }),
});

export const { useGetCharactersQuery, useGetCharacterByNameQuery } = apiSlice;
