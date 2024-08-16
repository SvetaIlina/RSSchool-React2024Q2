import { useSelector } from 'react-redux';
import { getSelectCountries } from '../../../service/countrySlice';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
// import { FormInputPropsRHF } from '../../../types/types';
import { FieldError, FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import '../autocmplete.css';

interface oo<T extends FieldValues> {
    name: Path<T>;
    register: UseFormRegister<T>;
    errors?: FieldError;
    setValue: UseFormSetValue<T>;
}
export default function AutocompleteControlHookForm<T extends FieldValues>({
    name,
    register,
    errors,
    setValue,
}: oo<T>) {
    const countries: string[] = useSelector(getSelectCountries);
    const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
    const [showOptions, setShowOptions] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const countryRef = useRef<HTMLInputElement>(null);
    const { ref, ...rest } = register(name);

    useImperativeHandle(ref, () => countryRef.current);

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
        if (countryRef.current) {
            const value = countryRef.current.value.toLocaleLowerCase();
            const filtered = countries.filter((country) => country.toLowerCase().startsWith(value));
            setFilteredCountries(filtered);
            setShowOptions(true);
        }
    };
    const handleClick = (country: string) => {
        setValue(name, country as PathValue<T, Path<T>>);
        setShowOptions(false);
    };

    return (
        <div className="form-field autocomplete" ref={containerRef}>
            <label className="form-label" htmlFor="country">
                Select Country
            </label>
            <input
                {...rest}
                ref={countryRef}
                onChange={handleChange}
                id="country"
                type="text"
                className="form-input"
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
            <span className="error-message">{!errors ? '' : !errors.ref ? '' : errors.message}</span>
        </div>
    );
}
