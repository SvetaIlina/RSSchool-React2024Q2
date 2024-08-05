import React from 'react';
import DetailCard from '../resultSection/detailCard/detailCard';
import { SwapiPerson } from '../../types/type';
import styles from './detail.module.css';
import { usePathname, useRouter } from 'next/navigation';
import useCreateQueryString from '../../hooks/useCreateQueryString';

interface DetailProps {
    initialDetailData: SwapiPerson[];
}

export default function Details({ initialDetailData }: DetailProps) {
    const router = useRouter();
    const pathname = usePathname();
    const createQueryString = useCreateQueryString();

    return (
        <div className={styles.details}>
            {initialDetailData.map((person, index) => (
                <DetailCard key={index} character={person} />
            ))}

            <button
                className={styles.closeDetail}
                onClick={() => {
                    router.push(`${pathname}?${createQueryString([{ name: 'details', value: '', removal: true }])}`);
                }}
            >
                &times;
            </button>
        </div>
    );
}
