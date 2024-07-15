import { render } from '@testing-library/react';
import { SwapiPerson } from '../../types/type'; // Adjust the import path as per your project structure
import { describe, it, expect } from 'vitest';
import ResultsSection from './resultSection';
import { MemoryRouter } from 'react-router-dom';

// Mock data for testing
const mockResults: SwapiPerson[] = [
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

describe('ResultsSection component', () => {
    it('renders the specified number of cards', () => {
        const { getAllByRole } = render(
            <MemoryRouter>
                <ResultsSection searchResults={mockResults} isReady={true} />
            </MemoryRouter>
        );
        const cards = getAllByRole('heading', { level: 3 });
        expect(cards).toHaveLength(mockResults.length);
    });

    it('displays "No results found" message when searchResults is empty', () => {
        const { getByText } = render(
            <MemoryRouter>
                <ResultsSection searchResults={[]} isReady={true} />
            </MemoryRouter>
        );
        const noResultMessage = getByText('No results found');
        expect(noResultMessage).toBeInTheDocument();
    });

    it('displays Loader when isReady is false', () => {
        const { container } = render(
            <MemoryRouter>
                <ResultsSection searchResults={[]} isReady={false} />
            </MemoryRouter>
        );
        const loader = container.querySelector('.loader-wrapper');
        expect(loader).toBeInTheDocument();
    });
});
