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
import { CharactersResponse, SwapiPerson } from '../src/types/type';
import { wrapper } from '../src/utils/store';
import { apiSlice } from '../src/utils/apiSlice';
import { GetServerSideProps } from 'next/types';
import { useDispatch } from 'react-redux';
import Details from '../src/components/details/details';

interface MainPageProps {
    initialData: CharactersResponse;
    initialDetailsData: SwapiPerson[];
}

export default function MainPage({ initialData, initialDetailsData }: MainPageProps) {
    const [errorCounter, setErrorCounter] = useState(0);
    const totalPages = useSelector(getTotalPage);
    const { isDark, toggleTheme } = useTheme();
    const dispatch = useDispatch();

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
                {initialDetailsData.length !== 0 && (
                    <div className="right-section">
                        <Details initialDetailData={initialDetailsData} />
                    </div>
                )}
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
    const searchTerm = query.searchTerm || '';
    const page = query.page ? parseInt(query.page as string, 10) : 1;
    const details = Array.isArray(query.details) ? query.details[0] : query.details;

    const { data: initialData } = await store.dispatch(apiSlice.endpoints.getCharacters.initiate({ page, searchTerm }));

    let initialDetailsData: SwapiPerson[] = [];

    if (details) {
        const { data } = await store.dispatch(apiSlice.endpoints.getCharacterByName.initiate({ name: details }));
        if (data) {
            initialDetailsData = data;
        }
    }

    return {
        props: {
            initialData,
            initialDetailsData,
        },
    };
});
