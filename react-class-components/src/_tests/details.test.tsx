import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, Mock, vi } from 'vitest';
import Details from '../components/details/details';
import { mockSearchResultsLuke } from './mockData';
import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const push = vi.fn();

(useRouter as Mock).mockImplementation(() => ({
    push,
}));
(usePathname as Mock).mockReturnValue('/');

const mockSearchParams = new URLSearchParams();

describe('DetailPage Component', () => {
    it('should render detail page with correct character information', async () => {
        render(<Details initialDetailData={mockSearchResultsLuke} />);

        await waitFor(() => {
            const characterName = screen.getByRole('heading', { name: /Luke Skywalker/i });
            expect(characterName).toBeInTheDocument();

            const descriptionText =
                'Luke Skywalker is 172 cm tall, weighs 77 kg, has blond hair, fair skin, and blue eyes.';
            const description = screen.getByText(descriptionText);
            expect(description).toBeInTheDocument();
        });
    });

    it('clicking the close button hides the component', async () => {
        mockSearchParams.set('details', 'Luke+Skywalker');
        (useSearchParams as Mock).mockReturnValue(mockSearchParams);
        render(<Details initialDetailData={mockSearchResultsLuke} />);

        const closeBtn = screen.getByRole('button');
        fireEvent.click(closeBtn);

        expect(push).not.toHaveBeenCalledWith('/');
    });
});
