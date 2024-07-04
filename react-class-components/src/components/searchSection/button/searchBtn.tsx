import React, { Component } from 'react';

interface SearchButtonProps {
    onClick: () => void;
}

export default class SearcButton extends Component<SearchButtonProps> {
    render() {
        return <button onClick={this.props.onClick}>Search</button>;
    }
}
