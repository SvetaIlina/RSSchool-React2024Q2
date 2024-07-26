import './resultSection.css';
import Card from './card/card';
import { useGetCharactersQuery } from '../../utils/apiSlice';
import Loader from '../loader/loader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentPage, setCurrentPageNumber, setResults } from '../../utils/currentPageSlice';
import { useSelector } from 'react-redux';
import { getSearchTerm } from '../../utils/searchTermSlice';

export default function ResultsSection() {
    const searchTerm = useSelector(getSearchTerm);
    const currentPage = useSelector(getCurrentPage);
    const dispatch = useDispatch();
    const {
        data: searchResult,
        isFetching,
        isSuccess,
        isError,
        error,
    } = useGetCharactersQuery({ page: currentPage, searchTerm });

    let content: React.ReactNode;
    if (searchResult) {
        if (searchResult.results.length > 0) {
            content = searchResult.results.map((result, index) => <Card key={index} character={result} />);
        } else {
            content = <p className="no-result">No results found</p>;
        }
    }

    useEffect(() => {
        if (isSuccess && searchResult) {
            dispatch(setResults(searchResult));
            dispatch(setCurrentPageNumber(currentPage));
        }
    }, [isSuccess, searchResult, dispatch]);

    return (
        <div className="left-section">
            {isFetching && <Loader />}
            {isError && <div>Error: {error.toString()}</div>}
            {isSuccess && !isFetching && content}
        </div>
    );
}
