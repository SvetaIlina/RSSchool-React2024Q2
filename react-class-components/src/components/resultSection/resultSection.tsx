import { SwapiPerson } from '../../types/type';
import './resultSection.css';
import Card from './card/card';
import Loader from '../loader/loader';

interface ResultsSectionProps {
    searchResults: SwapiPerson[];
    isReady: boolean;
}

export default function ResultsSection({ searchResults, isReady }: ResultsSectionProps) {
    return (
        <div className="left-section">
            {isReady ? (
                searchResults.length > 0 ? (
                    searchResults.map((result, index) => <Card key={index} character={result} />)
                ) : (
                    <p className="no-result">No results found</p>
                )
            ) : (
                <Loader />
            )}
        </div>
    );
}
