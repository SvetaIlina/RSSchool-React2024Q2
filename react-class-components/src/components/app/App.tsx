import { useEffect, useState } from 'react';
import { SwapiPerson } from '../../types/type';
import ResultsSection from '../resultSection/resultSection';
import SearchSection from '../searchSection/searchSection';
import './app.css';
import ErrorImitationBtn from '../errorBoundary/errorImitationButton/errorImitationButton';
import fetchData from '../../utils/swapi';
import useSavedQuery from '../../hooks/useSavedQuery';

export default function App() {
    const [savedQuery, setSavedQuery] = useSavedQuery('searchTerm');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState<SwapiPerson[]>([]);
    const [errorCounter, setErrorCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function displayResult() {
            let term: string = searchTerm;
            if (savedQuery) {
                setSearchTerm(savedQuery);
                term = savedQuery;
            }
            await getResults(term);
        }

        displayResult();
    }, []);

    useEffect(() => {
        if (errorCounter > 1) {
            throw new Error('I crashed!');
        }
    }, [errorCounter]);

    const getResults = async (term: string) => {
        setIsLoading(true);

        try {
            const result = await fetchData(term);
            setSearchResult(result);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchTermChange = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBtnClick = async () => {
        setSavedQuery(searchTerm);
        await getResults(searchTerm);
    };

    const simulateError = () => {
        setErrorCounter((prev) => prev + 1);
    };

    return (
        <div className="app">
            <SearchSection
                searchTerm={searchTerm}
                onSearchTermChange={handleSearchTermChange}
                onSearch={handleSearchBtnClick}
            />
            <ResultsSection searchResults={searchResult} isReady={!isLoading} />
            <ErrorImitationBtn onclick={simulateError} />
        </div>
    );
}
