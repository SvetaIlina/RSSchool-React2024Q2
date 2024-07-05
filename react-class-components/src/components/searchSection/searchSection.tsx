import React, { Component } from 'react';
import SearchInput from './input/searchInput';
import SearchButton from './button/searchBtn';
import './searchSection.css';

interface SearchSectionProps {
    searchTerm: string;
    onSearchTermChange: (term: string) => void;
    onSearch: () => void;
}

class SearchSection extends Component<SearchSectionProps> {
    constructor(props: SearchSectionProps) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.onSearch();
    }
    render() {
        return (
            <form className="search-section" onSubmit={this.onFormSubmit}>
                <SearchInput value={this.props.searchTerm} onChange={this.props.onSearchTermChange} />
                <SearchButton />
            </form>
        );
    }
}

export default SearchSection;
