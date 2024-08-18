import { useSelector } from 'react-redux';
import { getSelectCountries } from '../../service/countrySlice';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import './autocmplete.css';
import { FieldValues, UseFormRegister, FieldError, UseFormSetValue, Path, PathValue } from 'react-hook-form';
import { isNotNull } from '../../utils/utils';
import { TErrors } from '../../types/types';

interface AutocompleteControlProps<T extends FieldValues> {
    id: string;
    name?: Path<T>;
    register?: UseFormRegister<T>;
    errors?: FieldError;
    setValue?: UseFormSetValue<T>;
    inputRef?: React.MutableRefObject<HTMLInputElement | null>;
    yupErrors?: TErrors;
}

export default function AutocompleteControl<T extends FieldValues>({
    inputRef,
    name,
    id,
    register,
    errors,
    yupErrors,
    setValue,
}: AutocompleteControlProps<T>) {
    const countries: string[] = useSelector(getSelectCountries);
    const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
    const [showOptions, setShowOptions] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);
    const localRef = inputRef ? inputRef : countryRef;
    let ref: React.Ref<HTMLInputElement | null> = useRef(null);
    let rest: Partial<ReturnType<UseFormRegister<T>>> = {};

    const currentErrors = yupErrors ? yupErrors[id] : errors ? errors.message : '';

    if (register && name) {
        const registered = register(name);
        ref = registered.ref;
        rest = registered;
    }

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
        let value: string;
        if (inputRef?.current) {
            value = inputRef.current.value.toLocaleLowerCase();
        } else if (countryRef?.current) {
            value = countryRef.current.value.toLocaleLowerCase();
        }
        const filtered = countries.filter((country) => country.toLowerCase().startsWith(value));
        setFilteredCountries(filtered);
        setShowOptions(true);
    };
    const handleClick = (country: string) => {
        if (inputRef?.current) {
            // eslint-disable-next-line react-compiler/react-compiler
            inputRef.current.value = country;
        } else if (countryRef?.current) {
            isNotNull(setValue);
            isNotNull(name);
            setValue(name, country as PathValue<T, Path<T>>, { shouldValidate: true });
        }
        setShowOptions(false);
    };

    return (
        <div className="form-field autocomplete" ref={containerRef}>
            <label className="form-label" htmlFor={id}>
                Select Country
            </label>
            <input
                {...(rest ? rest : {})}
                ref={localRef}
                id={id}
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

            <span className="message-wrapper">
                <p className="error-message">{currentErrors}</p>
            </span>
        </div>
    );
}
