import React from 'react';
import DetailCard from '../resultSection/detailCard/detailCard';
import { SwapiPerson } from '../../types/type';
import styles from './detail.module.css';
import { useRouter } from 'next/router';

interface DetailProps {
    initialDetailData: SwapiPerson[];
}

export default function Details({ initialDetailData }: DetailProps) {
    const router = useRouter();
    return (
        <div className={styles.details}>
            {initialDetailData.map((person, index) => (
                <DetailCard key={index} character={person} />
            ))}

            <button
                className={styles.closeDetail}
                onClick={() => {
                    const query = router.query
                        ? Object.fromEntries(Object.entries(router.query).filter(([key]) => key !== 'details'))
                        : {};

                    router.push({
                        pathname: router.pathname,
                        query,
                    });
                }}
            >
                &times;
            </button>
        </div>
    );
}
