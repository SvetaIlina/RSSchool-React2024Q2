import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DetailPage from '../pages/detailPage/detailPage'; // Путь к вашему компоненту DetailPage
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useMockFetchData } from './mockData';

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router-dom')>();
    return {
        ...actual,
        useParams: () => ({ name: 'Luke Skywalker' }),
    };
});

vi.mock('@hooks/useFetchData', () => ({
    useFetchData: (searchTerm: string) => useMockFetchData(searchTerm),
}));

describe('DetailPage Component', () => {
    it('should render detail page with correct character information', async () => {
        render(
            <MemoryRouter>
                <DetailPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            const characterName = screen.getByRole('heading', { name: /Luke Skywalker/i });
            expect(characterName).toBeInTheDocument();

            const descriptionText =
                'Luke Skywalker is 172 cm tall, weighs 77 kg, has blond hair, fair skin, and blue eyes.';
            const description = screen.getByText(descriptionText);
            expect(description).toBeInTheDocument();
        });
    });

    it('loading indicator is displayed while fetching data', async () => {
        const { container } = render(
            <MemoryRouter>
                <DetailPage />
            </MemoryRouter>
        );
        const loader = container.querySelector('.loader-wrapper');
        expect(loader).toBeInTheDocument();
        await waitFor(() => {
            const loaderAfterLoad = container.querySelector('.loader-wrapper');
            expect(loaderAfterLoad).not.toBeInTheDocument();
        });
    });
    it('clicking the close button hides the component', () => {
        render(
            <MemoryRouter>
                <DetailPage />
            </MemoryRouter>
        );
        const closeBtn = screen.getByRole('button');
        fireEvent.click(closeBtn);
        expect(screen.queryByText(/Luke Skywalker/i)).not.toBeInTheDocument();
    });
});
