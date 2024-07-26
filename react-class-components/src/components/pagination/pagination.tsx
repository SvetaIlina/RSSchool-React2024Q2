import { useSelector } from 'react-redux';
import { getCurrentPage, getTotalPage, setCurrentPageNumber } from '../../utils/currentPageSlice';
import './pagination.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Pagination() {
    const currentPage = useSelector(getCurrentPage);
    const totalPages = useSelector(getTotalPage);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [newSearch, setNewSearch] = useState('');
    const newURL = `${location.pathname}${newSearch}${location.hash}`;

    useEffect(() => navigate(`${newURL}`), [newURL]);

    const handlePrevious = () => {
        if (currentPage > 1) {
            const page = currentPage - 1;
            setNewSearch(`?page=${page}`);
            dispatch(setCurrentPageNumber(page));
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            const page = currentPage + 1;
            setNewSearch(`?page=${page}`);
            dispatch(setCurrentPageNumber(page));
        }
    };

    return (
        <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1} className="pagination-btn">
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages} className="pagination-btn">
                Next
            </button>
        </div>
    );
}
