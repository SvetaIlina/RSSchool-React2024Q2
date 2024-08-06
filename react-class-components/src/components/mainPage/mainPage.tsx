'use client';

import { useState, useEffect } from 'react';
import Details from '../details/details';
import ErrorImitationBtn from '../errorBoundary/errorImitationButton/errorImitationButton';
import Flyout from '../flyout/flyout';
import Pagination from '../pagination/pagination';
import ResultsSection from '../resultSection/resultSection';
import SearchSection from '../searchSection/searchSection';
import { SwapiPerson } from '../../types/type';
import { ThemeProvider } from '../../context/context';
import { Provider } from 'react-redux';
import { store } from '../../utils/store';
import ToggleBtn from '../toggleBtn/toggleBtn';
import React from 'react';

export interface MainPageProps {
    initialData: SwapiPerson[];
    initialDetailData: SwapiPerson[];
    totalPages: number;
}

export default function MainPage({ initialData, initialDetailData, totalPages }: MainPageProps) {
    const [errorCounter, setErrorCounter] = useState(0);

    useEffect(() => {
        if (errorCounter > 1) {
            throw new Error('I crashed!');
        }
    }, [errorCounter]);

    const simulateError = () => {
        setErrorCounter((prev) => prev + 1);
    };

    return (
        <Provider store={store}>
            <ThemeProvider>
                <div className={`wrapper`}>
                    <SearchSection />

                    <div className="result-section">
                        <ResultsSection initialData={initialData} />

                        {initialDetailData.length !== 0 && (
                            <div className="right-section">
                                <Details initialDetailData={initialDetailData} />
                            </div>
                        )}
                    </div>

                    {totalPages > 1 && <Pagination totalPages={totalPages} />}
                    <Flyout />
                    <ErrorImitationBtn onclick={simulateError} />
                    <ToggleBtn />
                </div>
            </ThemeProvider>
        </Provider>
    );
}
