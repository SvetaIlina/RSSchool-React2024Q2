import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { emptyMockResults, mockResults, mockSearchResults } from './_tests/mockData';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';

const handlers = [
    http.get('https://swapi.dev/api/people/', async ({ request }) => {
        const url = new URL(request.url);
        const search = url.searchParams.get('search');

        if (search === 'ddd') {
            return HttpResponse.json(emptyMockResults, { status: 200 });
        }
        if (search === 'Luke%20Skywalker') {
            return HttpResponse.json(mockSearchResults, { status: 200 });
        }

        return HttpResponse.json(mockResults, { status: 200 });
    }),
];

export const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
    global.URL.createObjectURL = vi.fn(() => 'mocked-url');
});

afterEach(() => server.resetHandlers());

afterAll(() => {
    vi.restoreAllMocks();
    server.close();
});
