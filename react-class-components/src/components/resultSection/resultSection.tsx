import React, { Component } from 'react';
import { Result } from '../../types/type';

interface ResultsSectionProps {
    searchResults: Result[];
}

class ResultsSection extends Component<ResultsSectionProps> {
    render() {
        const { searchResults } = this.props;

        return (
            <div className="bottom-section">
                {searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                        <div key={index} className="result-item">
                            <h3 className="item-title">{result.name}</h3>
                            <p className="item-description">{result.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-result">No results found</p>
                )}
            </div>
        );
    }
}

export default ResultsSection;
