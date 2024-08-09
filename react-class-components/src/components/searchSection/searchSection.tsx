import SearchInput from './input/searchInput';
import SearchButton from './button/searchBtn';
import './searchSection.css';
import useSavedQuery from '../../hooks/useSavedQuery';
import { useEffect, useState } from 'react';
import { useNavigate } from '@remix-run/react';

export default function SearchSection() {
    const [savedQuery, setSavedQuery] = useSavedQuery<string>('searchTerm');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearchBtnClick();
    };

    const handleSearchTermChange = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBtnClick = () => {
        setSavedQuery(searchTerm);
    };

    useEffect(() => {
        if (savedQuery) {
            setSearchTerm(savedQuery);
            navigate(`/?searchTerm=${encodeURIComponent(savedQuery)}&page=1`);
        } else {
            navigate(`/?page=1`);
        }
    }, [savedQuery]);
    return (
        <form className="search-section" onSubmit={onFormSubmit}>
            <SearchInput value={searchTerm} onChange={handleSearchTermChange} />
            <SearchButton />
        </form>
    );
}
