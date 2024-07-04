import React, { Component } from 'react';
import './searchBtn.css';

interface SearchButtonProps {
    onClick: () => void;
}

export default class SearchButton extends Component<SearchButtonProps> {
    render() {
        return (
            <button className="search-btn" onClick={this.props.onClick}>
                Search
            </button>
        );
    }
}
