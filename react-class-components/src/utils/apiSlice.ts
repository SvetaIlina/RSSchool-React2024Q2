import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SwapiPeopleResponse, SwapiPerson, CharactersResponse } from '../types/type';

export const apiSlice = createApi({
    reducerPath: 'Swapi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
    endpoints: (builder) => ({
        getCharacters: builder.query<CharactersResponse, { page: number; searchTerm: string | null }>({
            query: ({ page, searchTerm }) =>
                searchTerm ? `people/?search=${searchTerm}&page=${page}` : `people/?page=${page}`,
            transformResponse: (response: SwapiPeopleResponse): CharactersResponse => ({
                results: response.results,
                itemsCount: response.count,
            }),
        }),
        getCharacterByName: builder.query<SwapiPerson[], { name: string | string[] }>({
            query: ({ name }) => `people/?search=${name}`,
            transformResponse: (response: SwapiPeopleResponse): SwapiPerson[] => response.results,
        }),
    }),
});

export const { useGetCharactersQuery, useGetCharacterByNameQuery } = apiSlice;
