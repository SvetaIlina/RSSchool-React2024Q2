import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SearchSection from '../components/searchSection/searchSection';
import { MemoryRouter } from 'react-router-dom';

describe('DetailPage Component', () => {
    it('clicking the Search button saves the entered value to the local storage', () => {
        render(
            <MemoryRouter>
                <SearchSection />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        const searcBtn = screen.getByText('Search');
        fireEvent.change(input, { target: { value: 'test query' } });
        fireEvent.click(searcBtn);
        expect(localStorage.getItem('searchTerm')).toBe('"test query"');
    });
    it('component retrieves the value from the local storage upon mounting', () => {
        render(
            <MemoryRouter>
                <SearchSection />
            </MemoryRouter>
        );
        const input: HTMLInputElement = screen.getByRole('textbox');
        expect(input.value).toBe('test query');
    });
});
