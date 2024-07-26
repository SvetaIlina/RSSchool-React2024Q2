import { useState, useEffect } from 'react';
import ErrorImitationBtn from '../../components/errorBoundary/errorImitationButton/errorImitationButton';
import ResultsSection from '../../components/resultSection/resultSection';
import SearchSection from '../../components/searchSection/searchSection';
import '../pages.css';
import { Outlet, useLocation } from 'react-router-dom';
import Pagination from '../../components/pagination/pagination';
import Flyout from '../../components/flyout/flyout';
import useTheme from '../../hooks/useTheme';
import { useSelector } from 'react-redux';
import { getTotalPage } from '../../utils/currentPageSlice';

export default function MainPage() {
    const [errorCounter, setErrorCounter] = useState(0);
    const totalPages = useSelector(getTotalPage);
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
                <ResultsSection />
                {location.pathname.startsWith('/details') && (
                    <div className="right-section">
                        <Outlet />
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
