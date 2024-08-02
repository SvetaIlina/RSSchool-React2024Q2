import styles from './resultSection.module.css';
import Card from './card/card';
import useTheme from '../../hooks/useTheme';
import { SwapiPerson } from '../../types/type';
import React from 'react';
interface ResultsSectionProps {
    initialData: SwapiPerson[];
}

export default function ResultsSection({ initialData }: ResultsSectionProps) {
    const { isDark } = useTheme();

    let content: React.ReactNode;
    if (initialData) {
        if (initialData.length > 0) {
            content = initialData.map((result, index) => <Card key={index} character={result} />);
        } else {
            content = <p className={styles.noResult}>No results found</p>;
        }
    }

    return <div className={`${styles.leftSection} ${isDark ? styles.leftSectionDark : ''}`}>{content}</div>;
}
