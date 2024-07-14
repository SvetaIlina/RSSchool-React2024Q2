import { useNavigate, useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import DetailCard from '../../components/resultSection/detailCard/detailCard';
import './detailPage.css';
import Loader from '../../components/loader/loader';

export default function DetailPage() {
    const { name } = useParams();
    const { data: detail, isLoading } = useFetchData(name as string);
    const navigate = useNavigate();

    return (
        <div className="details">
            {isLoading ? <Loader /> : detail.map((person, index) => <DetailCard key={index} character={person} />)}

            <button
                className="close-detail"
                onClick={() => {
                    navigate('/');
                }}
            >
                &times;
            </button>
        </div>
    );
}
