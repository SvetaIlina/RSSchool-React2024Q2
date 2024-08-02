import { GetServerSidePropsContext } from 'next/types';
import { describe, expect, it } from 'vitest';
import { getServerSideProps, MainPageProps } from '../../pages';
import { mockCharactersResponse, mockEmptyCharactersResponse, mockSearchResultsDart } from './mockData';

describe('getServerSideProps', () => {
    it('should handle query parameters correctly', async () => {
        const context = {
            query: { searchTerm: 'Luke Skywalker', page: '2', details: 'Darth Vader' },
        } as unknown as GetServerSidePropsContext;

        const result = await getServerSideProps(context);
        if ('props' in result) {
            const { props } = result as { props: MainPageProps };
            expect(props.initialData).toEqual(mockCharactersResponse);
            expect(props.initialDetailsData).toEqual(mockSearchResultsDart);
        }
    });

    it('should handle missing query parameters correctly', async () => {
        const context = {
            query: {},
        } as unknown as GetServerSidePropsContext;

        const result = await getServerSideProps(context);

        if ('props' in result) {
            const { props } = result as { props: MainPageProps };
            expect(props.initialData).toEqual(mockCharactersResponse);
            expect(props.initialDetailsData).toEqual([]);
        }
    });

    it('should handle empty search results', async () => {
        const context = {
            query: { searchTerm: 'ddd', page: '1' },
        } as unknown as GetServerSidePropsContext;

        const result = await getServerSideProps(context);
        if ('props' in result) {
            const { props } = result as { props: MainPageProps };
            expect(props.initialData).toEqual(mockEmptyCharactersResponse);
            expect(props.initialDetailsData).toEqual([]);
        }
    });
});
