import SearchInput from './input/searchInput';
import SearchButton from './button/searchBtn';
import styles from './searchSection.module.css';
import useSavedQuery from '../../hooks/useSavedQuery';
import { setCurrentPageNumber } from '../../utils/currentPageSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTerm } from '../../utils/searchTermSlice';

export default function SearchSection() {
    const [savedQuery, setSavedQuery] = useSavedQuery<string>('searchTerm');
    const [searchTerm, setSearchTerm] = useState('');
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
    };

    useEffect(() => {
        if (savedQuery) {
            setSearchTerm(savedQuery);
            dispatch(setTerm(savedQuery));
        }
    }, []);
    return (
        <form className={styles.searchSection} onSubmit={onFormSubmit}>
            <SearchInput value={searchTerm} onChange={handleSearchTermChange} />
            <SearchButton />
        </form>
    );
}
