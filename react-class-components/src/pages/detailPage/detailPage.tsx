import { useLocation, useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import DetailCard from '../../components/resultSection/detailCard/detailCard';
import './detailPage.css';
import Loader from '../../components/loader/loader';
import { useEffect } from 'react';
import { useGetCharacterByNameQuery } from '../../utils/apiSlice';

export default function DetailPage() {
    const { name } = useParams();
    const {
        data: character,
        isFetching,
        isSuccess,
        isError,
        error,
    } = useGetCharacterByNameQuery({ name: name || '' }, { skip: !name });
    const navigate = useNavigate();
    const page: number = useOutletContext();
    const [, setSearchParams] = useSearchParams();
    const location = useLocation();
    const newURL = `${location.search}${location.hash}`;

    // useEffect(() => {
    //     if (isSuccess && character && character.length > 0) {
    //         dispatch(setSelectedItem(character[0]));
    //     }
    //     return () => {
    //         dispatch(clearSelectedItem());
    //     };
    // }, [isSuccess, character, dispatch]);

    useEffect(() => setSearchParams({ page: `${page}` }), [page, name]);

    return (
        <div className="details">
            {isFetching && <Loader />}
            {isError && <div>Error: {error.toString()}</div>}
            {isSuccess &&
                !isFetching &&
                character.map((person, index) => <DetailCard key={index} character={person} />)}
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
