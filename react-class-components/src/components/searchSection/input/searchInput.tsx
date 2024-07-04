import React, { ChangeEvent, Component } from 'react';
import './searchInput.css';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}
export default class SearchInput extends Component<SearchInputProps> {
    constructor(props: SearchInputProps) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.props.onChange(event.target.value);
    }
    render(): React.ReactNode {
        return (
            <input
                className="search-input"
                type="text"
                value={this.props.value}
                onChange={this.handleInputChange}
                placeholder="Search..."
                spellCheck={false}
            />
        );
    }
}
