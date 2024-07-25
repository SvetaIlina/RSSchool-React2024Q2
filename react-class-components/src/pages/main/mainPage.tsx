import { useState, useEffect } from 'react';
import ErrorImitationBtn from '../../components/errorBoundary/errorImitationButton/errorImitationButton';
import ResultsSection from '../../components/resultSection/resultSection';
import SearchSection from '../../components/searchSection/searchSection';
import useSavedQuery from '../../hooks/useSavedQuery';
import '../pages.css';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/pagination/pagination';
import Flyout from '../../components/flyout/flyout';
import useTheme from '../../hooks/useTheme';
import { useSelector } from 'react-redux';
import { getCurrentPage, getTotalPage, setCurrentPageNumber } from '../../utils/currentPageSlice';
import { useDispatch } from 'react-redux';

export default function MainPage() {
    const [savedQuery, setSavedQuery] = useSavedQuery<string>('searchTerm');
    const [searchTerm, setSearchTerm] = useState('');
    const [errorCounter, setErrorCounter] = useState(0);
    const [, setSearchParams] = useSearchParams();
    const currentPage = useSelector(getCurrentPage);
    const totalPages = useSelector(getTotalPage);
    const { isDark, toggleTheme } = useTheme();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (savedQuery) {
            setSearchTerm(savedQuery);
        }
        setSearchParams({ page: '1' });
    }, []);

    useEffect(() => {
        if (errorCounter > 1) {
            throw new Error('I crashed!');
        }
    }, [errorCounter]);

    useEffect(() => {
        document.body.style.backgroundColor = isDark ? '#123c69' : '#eee2dc';
    }, [isDark]);

    const handleSearchTermChange = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBtnClick = () => {
        setSavedQuery(searchTerm);
        setSearchParams({ page: '1' });
        dispatch(setCurrentPageNumber(1));
    };

    const simulateError = () => {
        setErrorCounter((prev) => prev + 1);
    };

    return (
        <div className={`wrapper ${isDark ? 'dark-theme' : ''}`}>
            <SearchSection
                searchTerm={searchTerm}
                onSearchTermChange={handleSearchTermChange}
                onSearch={handleSearchBtnClick}
            />

            <div className="result-section">
                <ResultsSection currentPage={currentPage} searchTerm={savedQuery} />
                {location.pathname.startsWith('/details') && (
                    <div className="right-section">
                        <Outlet context={currentPage} />
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
