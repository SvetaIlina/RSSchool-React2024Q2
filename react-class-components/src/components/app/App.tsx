import React, { Component } from 'react';
import { Props, Result } from '../../types/type';
import ResultsSection from '../resultSection/resultSection';
import SearchSection from '../searchSection/searchSection';

interface AppState {
    searchTerm: string;
    searchResult: Result[];
}

export default class App extends Component<Props, AppState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchResult: [],
        };
        this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
        this.handleSearchBtnClick = this.handleSearchBtnClick.bind(this);
    }

    componentDidMount() {
        const savedSearchTerm = localStorage.getItem('searchTerm');
        if (savedSearchTerm) {
            this.setState({ searchTerm: savedSearchTerm });
        }
    }

    handleSearchTermChange(searchTerm: string) {
        this.setState({ searchTerm });
    }

    handleSearchBtnClick() {
        const { searchTerm } = this.state;
        localStorage.setItem('searchTerm', searchTerm);

        const results = [
            { name: 'Result 1', description: 'Description of result 1' },
            { name: 'Result 2', description: 'Description of result 2' },
        ];

        const filteredResults = results.filter((result) =>
            result.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.setState({ searchResult: filteredResults });
    }

    render() {
        const { searchTerm, searchResult } = this.state;

        return (
            <div className="app">
                <SearchSection
                    searchTerm={searchTerm}
                    onSearchTermChange={this.handleSearchTermChange}
                    onSearch={this.handleSearchBtnClick}
                />
                <ResultsSection searchResults={searchResult} />
            </div>
        );
    }
}
