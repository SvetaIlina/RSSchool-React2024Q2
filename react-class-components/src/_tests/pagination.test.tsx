import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import Pagination from '../components/pagination/pagination';
import { MemoryRouter } from 'react-router-dom';
import { useSearchParams } from '@remix-run/react';

vi.mock('@remix-run/react', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@remix-run/react')>();
    return {
        ...actual,
        useSearchParams: vi.fn(),
    };
});

const setSearchParams = vi.fn();
const mockSearchParams = new URLSearchParams();

describe('Pagination Component', () => {
    it('should updates URL query parameter when page changes', async () => {
        mockSearchParams.set('page', '1');
        (useSearchParams as Mock).mockReturnValue([mockSearchParams, setSearchParams]);
        render(
            <MemoryRouter>
                <Pagination pages={5} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Next'));

        await waitFor(() => {
            expect(setSearchParams).toHaveBeenCalledWith('?page=2');
        });
    });
    it('should updates URL query parameter when page changes', async () => {
        mockSearchParams.set('page', '2');
        (useSearchParams as Mock).mockReturnValue([mockSearchParams, setSearchParams]);
        render(
            <MemoryRouter>
                <Pagination pages={5} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Previous'));

        await waitFor(() => {
            expect(setSearchParams).toHaveBeenCalledWith('?page=1');
        });
    });

    it('renders with correct current page and total pages', () => {
        mockSearchParams.set('page', '3');
        render(
            <MemoryRouter>
                <Pagination pages={5} />
            </MemoryRouter>
        );

        expect(screen.getByText('Page 3 of 5')).toBeInTheDocument();
        expect(screen.getByText('Previous')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('disables Previous button on the first page', () => {
        mockSearchParams.set('page', '1');
        (useSearchParams as Mock).mockReturnValue([mockSearchParams, setSearchParams]);
        render(
            <MemoryRouter>
                <Pagination pages={5} />
            </MemoryRouter>
        );

        const previousButton = screen.getByText('Previous');
        expect(previousButton).toBeDisabled();
    });

    it('disables Next button on the last page', () => {
        mockSearchParams.set('page', '5');
        (useSearchParams as Mock).mockReturnValue([mockSearchParams, setSearchParams]);
        render(
            <MemoryRouter>
                <Pagination pages={5} />
            </MemoryRouter>
        );

        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeDisabled();
    });
});
