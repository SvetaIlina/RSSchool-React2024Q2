import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFoundPage from '../../pages/404';
import React from 'react';

describe('Flyout Component', () => {
    it('renders the not found page correctly', () => {
        render(<NotFoundPage />);
        expect(screen.getByText('Sorry, we can’t find this page')).toBeInTheDocument();
        const linkElement = screen.getByText('back to homepage');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement.tagName).toBe('A');
        expect(linkElement).toHaveAttribute('href', '/');
    });
});
