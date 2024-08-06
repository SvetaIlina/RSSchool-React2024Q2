import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import fetchData, { BASE_URL } from '../utils/swapi';

describe('fetchData', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    it('should call fetch with the correct URL when searchTerm and page are provided', async () => {
        const searchTerm = 'Luke';
        const page = '1';
        const expectedUrl = `${BASE_URL}/people/?search=${searchTerm}&page=${page}`;

        (global.fetch as Mock).mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: async () => ({
                    count: 1,
                    next: null,
                    previous: null,
                    results: [],
                }),
            })
        );

        await fetchData(searchTerm, page);

        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, { cache: 'no-store' });
    });

    it('should call fetch with the correct URL when only page is provided', async () => {
        const page = '1';
        const expectedUrl = `${BASE_URL}/people/?page=${page}`;

        (global.fetch as Mock).mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: async () => ({
                    count: 1,
                    next: null,
                    previous: null,
                    results: [],
                }),
            })
        );

        await fetchData('', page);

        expect(global.fetch).toHaveBeenCalledWith(expectedUrl, { cache: 'no-store' });
    });

    it('should throw an error when the response is not ok', async () => {
        (global.fetch as Mock).mockImplementation(() =>
            Promise.resolve({
                ok: false,
            })
        );

        await expect(fetchData('Luke', '1')).rejects.toThrow('Network response was not ok');
    });
});
