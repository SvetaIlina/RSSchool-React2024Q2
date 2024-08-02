import React from 'react';
import styles from './pagination.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useCreateQueryString from '../../hooks/useCreateQueryString';

export interface PaginationProps {
    totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const createQueryString = useCreateQueryString();

    const updateQueryParams = (page: number) => {
        router.push(`${pathname}?${createQueryString('page', page.toString())}`);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            const page = currentPage - 1;
            updateQueryParams(page);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            const page = currentPage + 1;
            updateQueryParams(page);
        }
    };

    return (
        <div className={styles.pagination}>
            <button onClick={handlePrevious} disabled={currentPage === 1} className={styles.paginationBtn}>
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages} className={styles.paginationBtn}>
                Next
            </button>
        </div>
    );
}
