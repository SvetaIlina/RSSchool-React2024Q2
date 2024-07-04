import React, { Component } from 'react';
import SearchInput from './input/searchInput';
import SearchButton from './button/searchBtn';

interface SearchSectionProps {
    searchTerm: string;
    onSearchTermChange: (term: string) => void;
    onSearch: () => void;
}

class SearchSection extends Component<SearchSectionProps> {
    render() {
        return (
            <div className="top-section">
                <SearchInput value={this.props.searchTerm} onChange={this.props.onSearchTermChange} />
                <SearchButton onClick={this.props.onSearch} />
            </div>
        );
    }
}

export default SearchSection;
