import './resultSection.css';
import Card from './card/card';
import { SwapiPeopleResponse } from 'src/types/type';
import { useLocation, useNavigation } from '@remix-run/react';
import Loader from '../loader/loader';

interface ResultsSectionProps {
    results: SwapiPeopleResponse;
}

export default function ResultsSection({ results }: ResultsSectionProps) {
    const location = useLocation();
    const navigation = useNavigation();
    const currentSearch = location.search;

    const showDetails =
        navigation.location &&
        navigation.location.pathname.includes('details') &&
        navigation.location.search === currentSearch;
    let content: React.ReactNode;
    if (results) {
        if (results.results.length > 0) {
            content = results.results.map((result, index) => <Card key={index} character={result} />);
        } else {
            content = <p className="no-result">No results found</p>;
        }
    }

    return <div className="left-section">{navigation.state === 'loading' && !showDetails ? <Loader /> : content}</div>;
}
