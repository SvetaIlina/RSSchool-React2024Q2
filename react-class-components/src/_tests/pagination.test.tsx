import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import Pagination from '../components/pagination/pagination';
import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const push = vi.fn();

(useRouter as Mock).mockImplementation(() => ({
    push,
}));
(usePathname as Mock).mockReturnValue('/');

const mockSearchParams = new URLSearchParams();

describe('Pagination Component', () => {
    it('should updates URL query parameter when page changes', async () => {
        mockSearchParams.set('page', '1');
        (useSearchParams as Mock).mockReturnValue(mockSearchParams);

        render(<Pagination totalPages={5} />);

        fireEvent.click(screen.getByText('Next'));

        await waitFor(() => {
            expect(push).toHaveBeenCalledWith('/?page=2');
        });
    });
    it('should updates URL query parameter when page changes', async () => {
        mockSearchParams.set('page', '2');
        (useSearchParams as Mock).mockReturnValue(mockSearchParams);

        render(<Pagination totalPages={5} />);

        fireEvent.click(screen.getByText('Previous'));

        await waitFor(() => {
            expect(push).toHaveBeenCalledWith('/?page=1');
        });
    });

    it('renders with correct current page and total pages', () => {
        mockSearchParams.set('page', '1');
        (useSearchParams as Mock).mockReturnValue(mockSearchParams);
        render(<Pagination totalPages={5} />);

        expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
        expect(screen.getByText('Previous')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('disables Previous button on the first page', () => {
        mockSearchParams.set('page', '1');
        (useSearchParams as Mock).mockReturnValue(mockSearchParams);
        render(<Pagination totalPages={5} />);

        const previousButton = screen.getByText('Previous');
        for (let i = 0; i < 2; i++) {
            fireEvent.click(previousButton);
        }
        expect(previousButton).toBeDisabled();
    });

    it('disables Next button on the last page', () => {
        mockSearchParams.set('page', '5');
        (useSearchParams as Mock).mockReturnValue(mockSearchParams);
        render(<Pagination totalPages={5} />);

        const nextButton = screen.getByText('Next');
        for (let i = 0; i < 2; i++) {
            fireEvent.click(nextButton);
        }
        expect(nextButton).toBeDisabled();
    });
});
