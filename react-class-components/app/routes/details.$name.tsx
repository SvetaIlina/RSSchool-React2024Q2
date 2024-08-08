import { json, LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useLocation, useNavigate, useNavigation } from '@remix-run/react';
import DetailCard from '../../src/components/resultSection/detailCard/detailCard';
import invariant from 'tiny-invariant';
import fetchData from '../../src/utils/swapi';
import detailsStylesHref from './detailPage.css?url';
import Loader from 'src/components/loader/loader';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: detailsStylesHref }];

export const loader = async ({ params }: LoaderFunctionArgs) => {
    invariant(params.name, 'Missing contactId param');
    const character = await fetchData(params.name);
    if (!character) {
        throw new Response('Not Found', { status: 404 });
    }
    return json({ character });
};

export default function DetailPage() {
    const { character } = useLoaderData<typeof loader>();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const location = useLocation();
    const currentSearch = location.search;

    const isSearchChange = navigation.location && navigation.location.search !== currentSearch;

    const newUrl = `/${location.search}`;
    return (
        <div className="details">
            {navigation.state === 'loading' && !isSearchChange ? (
                <Loader />
            ) : (
                character.results.map((person, index) => <DetailCard key={index} character={person} />)
            )}

            <button
                className="close-detail"
                onClick={() => {
                    navigate(newUrl);
                }}
            >
                &times;
            </button>
        </div>
    );
}
