import { useSelector } from 'react-redux';
import { getCurrentPage, getTotalPage, setCurrentPageNumber } from '../../utils/currentPageSlice';
import styles from './pagination.module.css';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export default function Pagination() {
    const currentPage = useSelector(getCurrentPage);
    const totalPages = useSelector(getTotalPage);
    const dispatch = useDispatch();
    const router = useRouter();
    const { query } = router;

    const updateQueryParams = (page: number) => {
        router.push({
            pathname: router.pathname,
            query: { ...query, page: page },
        });
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            const page = currentPage - 1;
            dispatch(setCurrentPageNumber(page));
            updateQueryParams(page);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            const page = currentPage + 1;
            dispatch(setCurrentPageNumber(page));
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
