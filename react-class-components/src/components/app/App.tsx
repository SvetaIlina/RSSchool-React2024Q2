import React, { Component } from 'react';
import { Props, Result } from '../../types/type';
import ResultsSection from '../resultSection/resultSection';
import SearchSection from '../searchSection/searchSection';
import './app.css';
import ErrorImitationBtn from '../errorBoundary/errorImitationButton/errorImitationButton';

interface AppState {
    searchTerm: string;
    searchResult: Result[];
    errorCounter: number;
}

export default class App extends Component<Props, AppState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchResult: [],
            errorCounter: 0,
        };
        this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
        this.handleSearchBtnClick = this.handleSearchBtnClick.bind(this);
        this.simulateError = this.simulateError.bind(this);
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

    simulateError() {
        this.setState({
            errorCounter: this.state.errorCounter + 1,
        });
    }

    render() {
        const { searchTerm, searchResult } = this.state;
        if (this.state.errorCounter > 0) {
            throw new Error('I crashed!');
        }
        return (
            <div className="app">
                <SearchSection
                    searchTerm={searchTerm}
                    onSearchTermChange={this.handleSearchTermChange}
                    onSearch={this.handleSearchBtnClick}
                />
                <ResultsSection searchResults={searchResult} />
                <ErrorImitationBtn onclick={this.simulateError} />
            </div>
        );
    }
}
