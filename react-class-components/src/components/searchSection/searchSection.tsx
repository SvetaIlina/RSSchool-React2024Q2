import SearchInput from './input/searchInput';
import SearchButton from './button/searchBtn';
import './searchSection.css';
import useSavedQuery from '../../hooks/useSavedQuery';
import { setCurrentPageNumber } from '../../utils/currentPageSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTerm } from '../../utils/searchTermSlice';
import { useSearchParams } from 'react-router-dom';

export default function SearchSection() {
    const [savedQuery, setSavedQuery] = useSavedQuery<string>('searchTerm');
    const [searchTerm, setSearchTerm] = useState('');
    const [, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearchBtnClick();
    };

    const handleSearchTermChange = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    const handleSearchBtnClick = () => {
        setSavedQuery(searchTerm);
        dispatch(setCurrentPageNumber(1));
        dispatch(setTerm(searchTerm));
        setSearchParams({ page: '1' });
    };

    useEffect(() => {
        if (savedQuery) {
            setSearchTerm(savedQuery);
            dispatch(setTerm(savedQuery));
        }
    }, []);
    return (
        <form className="search-section" onSubmit={onFormSubmit}>
            <SearchInput value={searchTerm} onChange={handleSearchTermChange} />
            <SearchButton />
        </form>
    );
}
