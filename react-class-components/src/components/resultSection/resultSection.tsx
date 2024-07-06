import React, { Component } from 'react';
import { SwapiPerson } from '../../types/type';
import './resultSection.css';
import Card from './card/card';

interface ResultsSectionProps {
    searchResults: SwapiPerson[];
}

class ResultsSection extends Component<ResultsSectionProps> {
    render() {
        const { searchResults } = this.props;

        return (
            <div className="result-section">
                {searchResults.length > 0 ? (
                    searchResults.map((result, index) => <Card key={index} character={result} />)
                ) : (
                    <p className="no-result">No results found</p>
                )}
            </div>
        );
    }
}

export default ResultsSection;
