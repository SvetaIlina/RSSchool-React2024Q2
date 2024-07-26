import { useState, useEffect } from 'react';
import ErrorImitationBtn from '../../components/errorBoundary/errorImitationButton/errorImitationButton';
import ResultsSection from '../../components/resultSection/resultSection';
import SearchSection from '../../components/searchSection/searchSection';
import useSavedQuery from '../../hooks/useSavedQuery';
import '../pages.css';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import Pagination from '../../components/pagination/pagination';

export default function MainPage() {
    const [savedQuery, setSavedQuery] = useSavedQuery('searchTerm');
    const [searchTerm, setSearchTerm] = useState('');
    const [errorCounter, setErrorCounter] = useState(0);
    const initialSearchTerm = savedQuery || '';
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { data: searchResult, isLoading, totalPages } = useFetchData(initialSearchTerm, currentPage);
    const location = useLocation();

    useEffect(() => {
        let newCurrentPage = currentPage;

        if (searchParams.has('page')) {
            newCurrentPage = parseInt(searchParams.get('page') || '1');
        }

        if (newCurrentPage !== currentPage) {
            setCurrentPage(newCurrentPage);
        }
    }, [searchParams, currentPage]);

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

    const handleSearchTermChange = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBtnClick = async () => {
        setSavedQuery(searchTerm);
        setSearchParams({ page: '1' });
    };

    const simulateError = () => {
        setErrorCounter((prev) => prev + 1);
    };

    const handlePageChange = (page: number) => {
        setSearchParams({ page: page.toString() });
    };

    return (
        <div className="wrapper">
            <SearchSection
                searchTerm={searchTerm}
                onSearchTermChange={handleSearchTermChange}
                onSearch={handleSearchBtnClick}
            />
            <div className="result-section">
                <ResultsSection searchResults={searchResult} isReady={!isLoading} />
                {location.pathname.startsWith('/details') && (
                    <div className="right-section">
                        <Outlet context={currentPage} />
                    </div>
                )}
            </div>
            {searchResult.length > 0 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
            <ErrorImitationBtn onclick={simulateError} />
        </div>
    );
}
