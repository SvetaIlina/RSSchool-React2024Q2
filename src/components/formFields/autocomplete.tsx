import { useSelector } from 'react-redux';
import { getSelectCountries } from '../../service/countrySlice';
import { useEffect, useRef, useState } from 'react';
import './autocmplite.css';

interface AutocompleteControlProps {
    inputRef?: React.MutableRefObject<HTMLInputElement | null>;
}

export default function AutocompleteControl({ inputRef }: AutocompleteControlProps) {
    const countries: string[] = useSelector(getSelectCountries);
    const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
    const [showOptions, setShowOptions] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (event.target instanceof Node) {
                if (containerRef.current && !containerRef.current.contains(event.target)) {
                    setShowOptions(false);
                }
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleChange = () => {
        if (inputRef?.current) {
            const value = inputRef.current.value.toLocaleLowerCase();
            const filtered = countries.filter((country) => country.toLowerCase().startsWith(value));
            setFilteredCountries(filtered);
            setShowOptions(true);
        }
    };
    const handleClick = (country: string) => {
        if (inputRef?.current) {
            // eslint-disable-next-line react-compiler/react-compiler
            inputRef.current.value = country;
            setShowOptions(false);
        }
    };

    return (
        <div className="form-field autocomplete" ref={containerRef}>
            <label className="form-label" htmlFor="country">
                Select Country
            </label>
            <input
                ref={inputRef}
                id="country"
                type="text"
                className="form-input"
                onChange={handleChange}
                placeholder="Start typing a country name..."
                autoComplete="off"
            />
            {showOptions && filteredCountries.length !== 0 && (
                <ul className="autocomplete-options">
                    {filteredCountries.map((country, index) => (
                        <li key={index} className="autocomplete-option" onClick={() => handleClick(country)}>
                            {country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
