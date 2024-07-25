import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { emptyMockResults, mockResults } from './_tests/mockData';
import { beforeAll, afterEach, afterAll } from 'vitest';

const handlers = [
    http.get('https://swapi.dev/api/people/', ({ request }) => {
        const url = new URL(request.url);
        const search = url.searchParams.get('search');

        if (search === 'rrr') {
            return HttpResponse.json(emptyMockResults, { status: 200 });
        }
        return HttpResponse.json(mockResults, { status: 200 });
    }),
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
