import SearchInput from './input/searchInput';
import SearchButton from './button/searchBtn';
import styles from './searchSection.module.css';
import useSavedQuery from '../../hooks/useSavedQuery';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import useCreateQueryString from '../../hooks/useCreateQueryString';

export default function SearchSection() {
    const [savedQuery, setSavedQuery] = useSavedQuery<string>('searchTerm');
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    const createQueryString = useCreateQueryString();

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
            router.push(
                `${pathname}?${createQueryString([
                    { name: 'searchTerm', value: searchTerm, removal: false },
                    { name: 'page', value: '1', removal: false },
                ])}`
            );
        } else {
            router.push(
                `${pathname}?${createQueryString([
                    { name: 'searchTerm', value: searchTerm, removal: true },
                    { name: 'page', value: '1', removal: false },
                ])}`
            );
        }
    }, [savedQuery]);
    return (
        <form className={styles.searchSection} onSubmit={onFormSubmit}>
            <SearchInput value={searchTerm} onChange={handleSearchTermChange} />
            <SearchButton />
        </form>
    );
}
