import { ChangeEvent } from 'react';
import './searchInput.css';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}
export default function SearchInput({ value, onChange }: SearchInputProps) {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <input
            className="search-input"
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder="Search for a Star Wars character..."
            spellCheck={false}
        />
    );
}
