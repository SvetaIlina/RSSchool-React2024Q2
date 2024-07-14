import { useState, useEffect } from 'react';
import ErrorImitationBtn from '../../components/errorBoundary/errorImitationButton/errorImitationButton';
import ResultsSection from '../../components/resultSection/resultSection';
import SearchSection from '../../components/searchSection/searchSection';
import useSavedQuery from '../../hooks/useSavedQuery';
import { SwapiPerson } from '../../types/type';
import fetchData from '../../utils/swapi';
import '../pages.css';

export default function MainPage() {
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
        <div className="wrapper">
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
