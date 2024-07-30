import { useState, useEffect } from 'react';
import ErrorImitationBtn from '../src/components/errorBoundary/errorImitationButton/errorImitationButton';
import ResultsSection from '../src/components/resultSection/resultSection';
import SearchSection from '../src/components/searchSection/searchSection';
import Pagination from '../src/components/pagination/pagination';
import Flyout from '../src/components/flyout/flyout';
import useTheme from '../src/hooks/useTheme';
import { useSelector } from 'react-redux';
import { getTotalPage, setResults } from '../src/utils/currentPageSlice';
import React from 'react';
import { CharactersResponse } from '../src/types/type';
import { wrapper } from '../src/utils/store';
import { apiSlice } from '../src/utils/apiSlice';
import { GetServerSideProps } from 'next/types';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

interface MainPageProps {
    initialData: CharactersResponse;
}

export default function MainPage({ initialData }: MainPageProps) {
    const [errorCounter, setErrorCounter] = useState(0);
    const totalPages = useSelector(getTotalPage);
    const { isDark, toggleTheme } = useTheme();
    const dispatch = useDispatch();
    const router = useRouter();
    const { query } = router;

    useEffect(() => {
        if (!query.page) {
            router.push(
                {
                    pathname: router.pathname,
                    query: { ...query, page: 1 },
                },
                undefined,
                { shallow: false }
            );
        }
    }, [query.page, router]);

    useEffect(() => {
        if (initialData) {
            dispatch(setResults(initialData));
        }
    }, [initialData]);

    useEffect(() => {
        if (errorCounter > 1) {
            throw new Error('I crashed!');
        }
    }, [errorCounter]);

    useEffect(() => {
        document.body.style.backgroundColor = isDark ? '#123c69' : '#eee2dc';
    }, [isDark]);

    const simulateError = () => {
        setErrorCounter((prev) => prev + 1);
    };

    return (
        <div className={`wrapper ${isDark ? 'dark-theme' : ''}`}>
            <SearchSection />

            <div className="result-section">
                <ResultsSection initialData={initialData} />
            </div>

            {totalPages > 1 && <Pagination />}
            <Flyout />
            <ErrorImitationBtn onclick={simulateError} />
            <button className="toggle-theme-btn" onClick={toggleTheme}>
                Toggle Theme
            </button>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const { query } = context;
    const page = query.page ? parseInt(query.page as string, 10) : 1;
    const searchTerm = query.searchTerm || '';

    const { data: initialData } = await store.dispatch(apiSlice.endpoints.getCharacters.initiate({ page, searchTerm }));

    return {
        props: {
            initialData,
        },
    };
});
