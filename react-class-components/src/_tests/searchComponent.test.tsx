import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, Mock, vi } from 'vitest';
import SearchSection from '../components/searchSection/searchSection';
import React from 'react';
import { ThemeProvider } from '../context/context';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const push = vi.fn();

(useRouter as Mock).mockImplementation(() => ({
    push,
}));
(usePathname as Mock).mockReturnValue('/');

const mockSearchParams = new URLSearchParams();
mockSearchParams.set('page', '1');
(useSearchParams as Mock).mockReturnValue(mockSearchParams);

describe('DetailPage Component', () => {
    it('clicking the Search button saves the entered value to the local storage', () => {
        render(
            <ThemeProvider>
                <SearchSection />
            </ThemeProvider>
        );

        const input = screen.getByRole('textbox');
        const searcBtn = screen.getByText('Search');
        fireEvent.change(input, { target: { value: 'test query' } });
        fireEvent.click(searcBtn);
        expect(localStorage.getItem('searchTerm')).toBe('"test query"');
    });
    it('component retrieves the value from the local storage upon mounting', () => {
        render(
            <ThemeProvider>
                <SearchSection />
            </ThemeProvider>
        );
        const input: HTMLInputElement = screen.getByRole('textbox');
        expect(input.value).toBe('test query');
    });
});
