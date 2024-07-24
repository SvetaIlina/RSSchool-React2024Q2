import { useState, useEffect } from 'react';
import ErrorImitationBtn from '../../components/errorBoundary/errorImitationButton/errorImitationButton';
import ResultsSection from '../../components/resultSection/resultSection';
import SearchSection from '../../components/searchSection/searchSection';
import useSavedQuery from '../../hooks/useSavedQuery';
import '../pages.css';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/pagination/pagination';
import { useGetCharactersQuery } from '../../utils/apiSlice';
import { Page } from '../../types/enums';
import Flyout from '../../components/flyout/flyout';
import useTheme from '../../hooks/useTheme';

export default function MainPage() {
    const [savedQuery, setSavedQuery] = useSavedQuery<string>('searchTerm');
    const [searchTerm, setSearchTerm] = useState('');
    const [errorCounter, setErrorCounter] = useState(0);
    const [, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { data: searchResult } = useGetCharactersQuery({ page: currentPage, searchTerm: savedQuery });
    const totalPages = searchResult?.itemsCount ? Math.ceil(searchResult.itemsCount / Page.TOTAL) : 0;
    const { isDark, toggleTheme } = useTheme();
    const location = useLocation();

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
    };

    const simulateError = () => {
        setErrorCounter((prev) => prev + 1);
    };

    const handlePageChange = (page: number) => {
        setSearchParams({ page: page.toString() });
        setCurrentPage(page);
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

            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
            <Flyout />
            <ErrorImitationBtn onclick={simulateError} />
            <button className="toggle-theme-btn" onClick={toggleTheme}>
                Toggle Theme
            </button>
        </div>
    );
}
