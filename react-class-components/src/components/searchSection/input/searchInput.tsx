import { ChangeEvent } from 'react';
import styles from './searchInput.module.css';
import useTheme from '../../../hooks/useTheme';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}
export default function SearchInput({ value, onChange }: SearchInputProps) {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };
    const { isDark } = useTheme();

    return (
        <input
            className={`${styles.searchInput} ${isDark ? styles.darkThemeInput : ''}`}
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder="Search for a Star Wars character..."
            spellCheck={false}
        />
    );
}
