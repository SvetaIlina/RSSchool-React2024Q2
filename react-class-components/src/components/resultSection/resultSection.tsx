import styles from './resultSection.module.css';
import Card from './card/card';
import useTheme from '../../hooks/useTheme';
import { CharactersResponse } from '../../types/type';
import React from 'react';
interface ResultsSectionProps {
    initialData: CharactersResponse;
}

export default function ResultsSection({ initialData }: ResultsSectionProps) {
    const searchResult = initialData.results;
    const { isDark } = useTheme();

    let content: React.ReactNode;
    if (searchResult) {
        if (searchResult.length > 0) {
            content = searchResult.map((result, index) => <Card key={index} character={result} />);
        } else {
            content = <p className={styles.noResult}>No results found</p>;
        }
    }

    return <div className={`${styles.leftSection} ${isDark ? styles.leftSectionDark : ''}`}>{content}</div>;
}
