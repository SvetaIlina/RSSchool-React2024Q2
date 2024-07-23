import { useState, useEffect } from 'react';
import ErrorImitationBtn from '../../components/errorBoundary/errorImitationButton/errorImitationButton';
import ResultsSection from '../../components/resultSection/resultSection';
import SearchSection from '../../components/searchSection/searchSection';
import useSavedQuery from '../../hooks/useSavedQuery';
import '../pages.css';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/pagination/pagination';
import { useGetCharactersQuery } from '../../utils/apiSlice';

export default function MainPage() {
    const [savedQuery, setSavedQuery] = useSavedQuery<string>('searchTerm');
    const [searchTerm, setSearchTerm] = useState('');
    const [errorCounter, setErrorCounter] = useState(0);
    const [, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { data: searchResult } = useGetCharactersQuery({ page: currentPage, searchTerm });
    const itemPerPage = 10;
    const totalPages = searchResult?.pageCount ? Math.ceil(searchResult.pageCount / itemPerPage) : 0;
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
        <div className="wrapper">
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
            <ErrorImitationBtn onclick={simulateError} />
        </div>
    );
}
