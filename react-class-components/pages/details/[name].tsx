import { useGetCharacterByNameQuery } from '../../src/utils/apiSlice';
import React from 'react';
import { useRouter } from 'next/router';
import Loader from '../../src/components/loader/loader';
import DetailCard from '../../src/components/resultSection/detailCard/detailCard';

export default function DetailPage() {
    const router = useRouter();
    const { name } = router.query;
    const {
        data: character,
        isFetching,
        isSuccess,
        isError,
        error,
    } = useGetCharacterByNameQuery({ name: name || '' }, { skip: !name });

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
                    router.push('/');
                }}
            >
                &times;
            </button>
        </div>
    );
}
