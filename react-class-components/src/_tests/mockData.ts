import { useState, useEffect } from 'react';
import { SwapiPerson } from '../types/type';
// import { vi } from 'vitest';

export const mockResults: SwapiPerson[] = [
    {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: 'Tatooine',
        films: [
            'A New Hope',
            'The Empire Strikes Back',
            'Return of the Jedi',
            'Revenge of the Sith',
            'The Force Awakens',
        ],
        species: [],
        vehicles: ['Snowspeeder', 'Imperial Speeder Bike'],
        starships: ['X-wing', 'Imperial shuttle'],
        created: '2014-12-09T13:50:51.644000Z',
        edited: '2014-12-20T21:17:56.891000Z',
        url: 'https://swapi.dev/api/people/1/',
    },
    {
        name: 'Darth Vader',
        height: '202',
        mass: '136',
        hair_color: 'none',
        skin_color: 'white',
        eye_color: 'yellow',
        birth_year: '41.9BBY',
        gender: 'male',
        homeworld: 'Tatooine',
        films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'Revenge of the Sith'],
        species: [],
        vehicles: [],
        starships: ['TIE Advanced x1'],
        created: '2014-12-10T15:18:20.704000Z',
        edited: '2014-12-20T21:17:50.313000Z',
        url: 'https://swapi.dev/api/people/4/',
    },
];

export function useMockFetchData(searchTerm: string) {
    const [data, setData] = useState<SwapiPerson[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        async function fetchDataAsync() {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setData(mockResults);
            setIsLoading(false);
            setTotalPages(3);
        }

        fetchDataAsync();
    }, [searchTerm]);

    return { data, isLoading, totalPages };
}
// export function mockParams() {
//     vi.mock('react-router-dom', async (importOriginal) => {
//         const actual = await importOriginal<typeof import('react-router-dom')>();
//         return {
//             ...actual,
//             useParams: () => ({ name: 'Luke Skywalker' }),
//         };
//     });
// }
// export function mockFetch() {
//     vi.mock('@hooks/useFetchData', () => ({
//         useFetchData: (searchTerm: string) => useMockFetchData(searchTerm),
//     }));
// }
