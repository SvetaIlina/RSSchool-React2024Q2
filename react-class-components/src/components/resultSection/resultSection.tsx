import React, { Component } from 'react';
import { Result } from '../../types/type';
import './resultSection.css';
import Card from './card/card';

interface ResultsSectionProps {
    searchResults: Result[];
}

class ResultsSection extends Component<ResultsSectionProps> {
    render() {
        const { searchResults } = this.props;

        return (
            <div className="result-section">
                {searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                        <Card key={index} name={result.name} description={result.description} />
                    ))
                ) : (
                    <p className="no-result">No results found</p>
                )}
            </div>
        );
    }
}

export default ResultsSection;
