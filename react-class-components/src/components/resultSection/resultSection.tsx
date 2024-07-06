import { Component } from 'react';
import { SwapiPerson } from '../../types/type';
import './resultSection.css';
import Card from './card/card';
import Loader from '../loader/loader';

interface ResultsSectionProps {
    searchResults: SwapiPerson[];
    isReady: boolean;
}

class ResultsSection extends Component<ResultsSectionProps> {
    render() {
        const { searchResults, isReady } = this.props;

        return (
            <div className="result-section">
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
}

export default ResultsSection;
