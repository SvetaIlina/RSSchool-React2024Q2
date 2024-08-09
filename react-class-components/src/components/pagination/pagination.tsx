import { useSearchParams } from '@remix-run/react';
import './pagination.css';

interface PaginationProps {
    pages: number;
}

export default function Pagination({ pages }: PaginationProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const handlePrevious = () => {
        if (currentPage > 1) {
            const page = currentPage - 1;
            setSearchParams(`?page=${page}`);
        }
    };

    const handleNext = () => {
        if (currentPage < pages) {
            const page = currentPage + 1;
            setSearchParams(`?page=${page}`);
        }
    };

    return (
        <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1} className="pagination-btn">
                Previous
            </button>
            <span>
                Page {currentPage} of {pages}
            </span>
            <button onClick={handleNext} disabled={currentPage === pages} className="pagination-btn">
                Next
            </button>
        </div>
    );
}
