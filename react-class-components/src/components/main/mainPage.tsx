import { useState, useEffect } from 'react';
import ErrorImitationBtn from '../errorBoundary/errorImitationButton/errorImitationButton';
import ResultsSection from '../resultSection/resultSection';
import SearchSection from '../searchSection/searchSection';
import Pagination from '../pagination/pagination';
import Flyout from '../flyout/flyout';
import useTheme from '../../hooks/useTheme';
import { SwapiPeopleResponse } from '../../types/type';
import { Outlet, useLocation } from '@remix-run/react';

interface MainPageProps {
    searchResult: SwapiPeopleResponse;
    totalPages: number;
}

export default function MainPage({ searchResult, totalPages }: MainPageProps) {
    const [errorCounter, setErrorCounter] = useState(0);
    const { isDark, toggleTheme } = useTheme();
    const location = useLocation();

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
                <ResultsSection results={searchResult} />

                {location.pathname.startsWith('/details') && (
                    <div className="right-section">
                        <Outlet />
                    </div>
                )}
            </div>

            {totalPages > 1 && <Pagination pages={totalPages} />}
            <Flyout />
            <ErrorImitationBtn onclick={simulateError} />
            <button className="toggle-theme-btn" onClick={toggleTheme}>
                Toggle Theme
            </button>
        </div>
    );
}
