import { useState, useEffect } from 'react';
import fetchData from '../utils/swapi';
import { SwapiPerson } from '../types/type';

export default function useFetchData(searchTerm: string) {
    const [data, setData] = useState<SwapiPerson[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchDataAsync() {
            setIsLoading(true);
            try {
                const result = await fetchData(searchTerm);
                setData(result);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchDataAsync();
    }, [searchTerm]);

    return { data, isLoading };
}
