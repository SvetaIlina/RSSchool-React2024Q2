import { useState, useEffect } from 'react';
import ErrorImitationBtn from '../src/components/errorBoundary/errorImitationButton/errorImitationButton';
import ResultsSection from '../src/components/resultSection/resultSection';
import SearchSection from '../src/components/searchSection/searchSection';
import Pagination from '../src/components/pagination/pagination';
import Flyout from '../src/components/flyout/flyout';
import useTheme from '../src/hooks/useTheme';
import { useSelector } from 'react-redux';
import { getTotalPage } from '../src/utils/currentPageSlice';
import React from 'react';

export default function MainPage() {
    const [errorCounter, setErrorCounter] = useState(0);
    const totalPages = useSelector(getTotalPage);
    const { isDark, toggleTheme } = useTheme();

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
                <ResultsSection />
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
