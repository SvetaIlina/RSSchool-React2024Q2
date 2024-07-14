import { useState, useEffect } from 'react';
import ErrorImitationBtn from '../../components/errorBoundary/errorImitationButton/errorImitationButton';
import ResultsSection from '../../components/resultSection/resultSection';
import SearchSection from '../../components/searchSection/searchSection';
import useSavedQuery from '../../hooks/useSavedQuery';
import '../pages.css';
import { Outlet, useLocation } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';

export default function MainPage() {
    const [savedQuery, setSavedQuery] = useSavedQuery('searchTerm');
    const [searchTerm, setSearchTerm] = useState('');
    const [errorCounter, setErrorCounter] = useState(0);
    const initialSearchTerm = savedQuery || '';
    const { data: searchResult, isLoading } = useFetchData(initialSearchTerm);
    const location = useLocation();

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
    };

    const simulateError = () => {
        setErrorCounter((prev) => prev + 1);
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
                        <Outlet />
                    </div>
                )}
            </div>
            <ErrorImitationBtn onclick={simulateError} />
        </div>
    );
}
