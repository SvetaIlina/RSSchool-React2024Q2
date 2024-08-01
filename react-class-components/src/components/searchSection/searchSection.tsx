import SearchInput from './input/searchInput';
import SearchButton from './button/searchBtn';
import styles from './searchSection.module.css';
import useSavedQuery from '../../hooks/useSavedQuery';
import { setCurrentPageNumber } from '../../utils/currentPageSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import React from 'react';

export default function SearchSection() {
    const [savedQuery, setSavedQuery] = useSavedQuery<string>('searchTerm');
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

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
    };

    useEffect(() => {
        if (savedQuery) {
            setSearchTerm(savedQuery);
            router.push({
                pathname: router.pathname,
                query: { ...router.query, searchTerm: savedQuery, page: 1 },
            });
        } else {
            router.push({
                pathname: router.pathname,
                query: { page: 1 },
            });
        }
    }, [savedQuery]);
    return (
        <form className={styles.searchSection} onSubmit={onFormSubmit}>
            <SearchInput value={searchTerm} onChange={handleSearchTermChange} />
            <SearchButton />
        </form>
    );
}
