import { render, screen, waitFor } from '@testing-library/react';
import ResultsSection from '../components/resultSection/resultSection';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../utils/store';
import { MemoryRouter } from 'react-router-dom';

describe('ResulSection Component', () => {
    it('renders the correct number of cards based on the API response', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ResultsSection currentPage={1} searchTerm="" />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getAllByRole('heading')).toHaveLength(2);
        });
    });
    it('Check that an appropriate message is displayed if no cards are present.', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ResultsSection currentPage={1} searchTerm="rrr" />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('No results found')).toBeInTheDocument();
        });
    });
});
