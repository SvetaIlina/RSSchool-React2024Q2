import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';
import NotFoundPage from 'src/components/404/404';
import { describe, it, expect } from 'vitest';

describe('404 Component', () => {
    it('renders the not found page correctly', async () => {
        const App = createRemixStub([
            {
                path: '/',
                Component: NotFoundPage,
            },
        ]);

        await render(<App initialEntries={['/']} />);
        expect(screen.getByText('Sorry, we can’t find this page')).toBeInTheDocument();
        const linkElement = screen.getByText('back to homepage');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement.tagName).toBe('A');
        expect(linkElement).toHaveAttribute('href', '/');
    });
});
