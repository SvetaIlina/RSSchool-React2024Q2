import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import Page from '../app/page';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import fetchData from '../utils/swapi';
import { mockResults } from './mockData';

const push = vi.fn();

(useRouter as Mock).mockImplementation(() => ({
    push,
}));
(usePathname as Mock).mockReturnValue('/');
const mockSearchParams = new URLSearchParams();
mockSearchParams.set('page', '1');
(useSearchParams as Mock).mockReturnValue(mockSearchParams);

describe('Page component', () => {
    it('should call fetchData with the correct parameters', async () => {
        vi.mock('../utils/swapi', () => ({
            default: vi.fn(),
        }));
        const fetchDataMock = fetchData as Mock;
        const mockResponse = mockResults;
        fetchDataMock.mockResolvedValue(mockResponse);

        const props = {
            searchParams: { searchTerm: 'Luke', page: '1', details: 'Darth Vader' },
        };

        const Result = await Page(props);
        render(Result);

        await waitFor(() => {
            expect(fetchDataMock).toHaveBeenCalledWith('Luke', '1');
            expect(fetchDataMock).toHaveBeenCalledWith('Darth Vader');
        });
    });
});
