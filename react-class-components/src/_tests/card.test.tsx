// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { mockNavigate, mockResults } from './mockData';
import Card from '../components/resultSection/card/card';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../utils/store';
import DetailPage from '../pages/detailPage/detailPage';
import { server } from '../setupTests';

const character = mockResults.results[0];

describe('Card Component', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it('renders the relevant card data', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Card character={character} />
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
                    <Card character={character} />
                </MemoryRouter>
            </Provider>
        );
        const cardBtn = screen.getByText('Show Details');
        fireEvent.click(cardBtn);
        expect(mockNavigate).toHaveBeenCalledWith(`details/${character.name}`, { replace: true });
    });
    it('clicking triggers an additional API call to fetch detailed information', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route path="/" element={<Card character={character} />} />
                        <Route path="details/:name" element={<DetailPage />} />
                    </Routes>
                </MemoryRouter>
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
