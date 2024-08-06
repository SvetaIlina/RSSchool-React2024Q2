import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { mockResults, mockSearchResultsLuke } from './mockData';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import MainPage from '../components/mainPage/mainPage';

const push = vi.fn();

(useRouter as Mock).mockImplementation(() => ({
    push,
}));
(usePathname as Mock).mockReturnValue('/');

const mockSearchParams = new URLSearchParams();
mockSearchParams.set('page', '1');
(useSearchParams as Mock).mockReturnValue(mockSearchParams);

describe('Main Page', () => {
    it('when at least 1 item has been selected, the flyout element should appear', async () => {
        render(<MainPage initialData={mockResults.results} initialDetailData={[]} totalPages={5} />);
        await waitFor(() => {
            const inputs = screen.getAllByLabelText('Add to favorites');
            inputs.forEach((input) => fireEvent.click(input));
            expect(screen.getByText('You have 2 favorite characters')).toBeInTheDocument();
        });
    });
    it('toggles theme on button click', () => {
        render(<MainPage initialData={mockResults.results} initialDetailData={[]} totalPages={5} />);

        const toggleButton = screen.getByText('Toggle Theme');
        const searchButton = screen.getByText('Search');
        expect(document.body).not.toHaveClass('isDark');
        expect(searchButton.className).not.toContain('darkThemeSearchBtn');
        fireEvent.click(toggleButton);
        expect(document.body).toHaveClass('isDark');
        expect(searchButton.className).toContain('darkThemeSearchBtn');
        fireEvent.click(toggleButton);
        expect(document.body).not.toHaveClass('isDark');
        expect(searchButton.className).not.toContain('darkThemeSearchBtn');
    });
    it('render Details and hides the component when the close button is clicked', async () => {
        const { rerender } = render(
            <MainPage initialData={mockResults.results} initialDetailData={mockSearchResultsLuke} totalPages={5} />
        );
        const descriptionText =
            'Luke Skywalker is 172 cm tall, weighs 77 kg, has blond hair, fair skin, and blue eyes.';
        const description = screen.getByText(descriptionText);
        expect(description).toBeInTheDocument();
        const closeBtn = screen.getByRole('button', { name: /×/ });
        fireEvent.click(closeBtn);
        rerender(<MainPage initialData={mockResults.results} initialDetailData={[]} totalPages={5} />);
        expect(closeBtn).not.toBeInTheDocument();
    });
});
