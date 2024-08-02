import React, { useCallback } from 'react';
import DetailCard from '../resultSection/detailCard/detailCard';
import { SwapiPerson } from '../../types/type';
import styles from './detail.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface DetailProps {
    initialDetailData: SwapiPerson[];
}

export default function Details({ initialDetailData }: DetailProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const deleteQueryString = useCallback(
        (name: string) => {
            if (searchParams.has(name)) {
                const params = new URLSearchParams(searchParams.toString());
                params.delete(name);
                return params.toString();
            }
        },
        [searchParams]
    );

    return (
        <div className={styles.details}>
            {initialDetailData.map((person, index) => (
                <DetailCard key={index} character={person} />
            ))}

            <button
                className={styles.closeDetail}
                onClick={() => {
                    router.push(`${pathname}?${deleteQueryString('details')}`);
                }}
            >
                &times;
            </button>
        </div>
    );
}
