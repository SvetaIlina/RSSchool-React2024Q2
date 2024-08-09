// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { mockResults, mockResultsLuke } from './mockData';
import Card from '../components/resultSection/card/card';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../utils/store';
import { createRemixStub } from '@remix-run/testing';
import DetailPage from '~/routes/details.$name';
import { json } from '@remix-run/node';
import { server } from 'src/setupTests';

const luke = mockResults.results[0];

describe('Card Component', () => {
    it('renders the relevant card data', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Card character={luke} />
                </MemoryRouter>
            </Provider>
        );
        const characterName = screen.getByText('Luke Skywalker');
        expect(characterName).toBeInTheDocument();
    });
    it('should navigate to detail page on card click ', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Card character={luke} />
                </MemoryRouter>
            </Provider>
        );
        const link = screen.getByText('Show Details');
        expect(link).toHaveAttribute('href', '/details/Luke Skywalker');
    });
    it('clicking triggers an additional API call to fetch detailed information', async () => {
        const character = mockResultsLuke;
        const App = createRemixStub([
            {
                path: '/details',
                Component: DetailPage,
                loader() {
                    return json({ character });
                },
            },
        ]);
        await render(
            <Provider store={store}>
                <MemoryRouter>
                    <Card character={luke} />
                </MemoryRouter>
                <App initialEntries={['/details']} />
            </Provider>
        );
        const cardBtn = screen.getByText('Show Details');
        fireEvent.click(cardBtn);
        await waitFor(() => {
            const apiCall = server.listHandlers()[0];
            expect(apiCall.isUsed);
        });
    });
});
