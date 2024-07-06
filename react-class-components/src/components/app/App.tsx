import React, { Component } from 'react';
import { Props, SwapiPerson } from '../../types/type';
import ResultsSection from '../resultSection/resultSection';
import SearchSection from '../searchSection/searchSection';
import './app.css';
import ErrorImitationBtn from '../errorBoundary/errorImitationButton/errorImitationButton';
import fetchData from '../../utils/swapi';

interface AppState {
    searchTerm: string;
    searchResult: SwapiPerson[];
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

    async componentDidMount() {
        const savedSearchTerm = localStorage.getItem('searchTerm');
        if (savedSearchTerm) {
            this.setState({ searchTerm: savedSearchTerm }, this.getResults);
        } else {
            await this.getResults();
        }
    }

    async getResults() {
        try {
            const result = await fetchData(this.state.searchTerm);
            this.setState({ searchResult: result });
        } catch (error) {
            console.error(error);
        }
    }

    handleSearchTermChange(searchTerm: string) {
        this.setState({ searchTerm });
    }

    async handleSearchBtnClick() {
        const { searchTerm } = this.state;
        localStorage.setItem('searchTerm', searchTerm);
        await this.getResults();
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
