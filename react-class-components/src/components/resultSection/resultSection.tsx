import './resultSection.css';
import Card from './card/card';
import { useGetCharactersQuery } from '../../utils/apiSlice';
import Loader from '../loader/loader';

interface ResultsSectionProps {
    currentPage: number;
    searchTerm: string | null;
}

export default function ResultsSection({ currentPage, searchTerm }: ResultsSectionProps) {
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
    return (
        <div className="left-section">
            {isFetching && <Loader />}
            {isError && <div>Error: {error.toString()}</div>}
            {isSuccess && !isFetching && content}
        </div>
    );
}
