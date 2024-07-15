import { useLocation, useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import DetailCard from '../../components/resultSection/detailCard/detailCard';
import './detailPage.css';
import Loader from '../../components/loader/loader';
import { useEffect } from 'react';

export default function DetailPage() {
    const { name } = useParams();
    const { data: detail, isLoading } = useFetchData(name as string);
    const navigate = useNavigate();
    const page: number = useOutletContext();
    const [, setSearchParams] = useSearchParams();
    const location = useLocation();
    const newURL = `${location.search}${location.hash}`;

    useEffect(() => setSearchParams({ page: `${page}` }), []);

    return (
        <div className="details">
            {isLoading ? <Loader /> : detail.map((person, index) => <DetailCard key={index} character={person} />)}

            <button
                className="close-detail"
                onClick={() => {
                    navigate(`/${newURL}`);
                }}
            >
                &times;
            </button>
        </div>
    );
}
