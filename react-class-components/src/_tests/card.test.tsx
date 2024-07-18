// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockResults } from './mockData';
import Card from '../components/resultSection/card/card';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
const character = mockResults[0];

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router-dom')>();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Card Component', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it('renders the relevant card data', () => {
        render(
            <MemoryRouter>
                <Card character={character} />
            </MemoryRouter>
        );
        const characterName = screen.getByText('Luke Skywalker');
        expect(characterName).toBeInTheDocument();
    });
    it('should navigate to detail page on card click ', () => {
        render(
            <MemoryRouter>
                <Card character={character} />
            </MemoryRouter>
        );
        const cardElement = screen.getByText(character.name);
        fireEvent.click(cardElement);
        expect(mockNavigate).toHaveBeenCalledWith(`details/${character.name}`, { replace: true });
    });
});
