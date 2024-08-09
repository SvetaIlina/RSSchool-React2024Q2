import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DetailPage from '~/routes/details.$name';
import { json } from '@remix-run/node';
import { createRemixStub } from '@remix-run/testing';
import { mockResultsLuke } from './mockData';

describe('DetailPage Component', () => {
    it('should render detail page with correct character information', async () => {
        const character = mockResultsLuke;
        const App = createRemixStub([
            {
                path: '/details',
                Component: DetailPage,
                loader() {
                    return json({ character });
                },
            },
        ]);

        await render(<App initialEntries={['/details']} />);

        await waitFor(() => {
            const characterName = screen.getByRole('heading', { name: /Luke Skywalker/i });
            expect(characterName).toBeInTheDocument();

            const descriptionText =
                'Luke Skywalker is 172 cm tall, weighs 77 kg, has blond hair, fair skin, and blue eyes.';
            const description = screen.getByText(descriptionText);
            expect(description).toBeInTheDocument();
            const closeBtn = screen.getByRole('button');
            expect(closeBtn).toBeInTheDocument();
        });
    });

    it('clicking the close button hides the component', async () => {
        const character = mockResultsLuke;
        const App = createRemixStub([
            {
                path: '/details',
                Component: DetailPage,
                loader() {
                    return json({ character });
                },
            },
        ]);
        await render(<App initialEntries={['/details']} />);
        await waitFor(() => {
            const closeBtn = screen.getByRole('button');
            fireEvent.click(closeBtn);
            expect(screen.queryByText(/Luke Skywalker/i)).not.toBeInTheDocument();
        });
    });
});
