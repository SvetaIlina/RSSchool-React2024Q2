import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResultsSection from '../components/resultSection/resultSection';
import { MemoryRouter } from 'react-router-dom';
import { mockResults } from './mockData';

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
});
