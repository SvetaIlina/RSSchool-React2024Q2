import useTheme from '../../../hooks/useTheme';
import styles from './searchBtn.module.css';
import React from 'react';
export default function SearchButton() {
    const { isDark } = useTheme();
    return (
        <button className={`${styles.searchBtn} ${isDark ? styles.darkThemeSearchBtn : ''}`} type="submit">
            Search
        </button>
    );
}
