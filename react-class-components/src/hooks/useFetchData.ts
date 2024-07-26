import { useState, useEffect } from 'react';
import fetchData from '../utils/swapi';
import { SwapiPerson } from '../types/type';

export default function useFetchData(searchTerm: string, currentPage?: number) {
    const [data, setData] = useState<SwapiPerson[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        async function fetchDataAsync() {
            setIsLoading(true);
            try {
                const result = await fetchData(searchTerm, currentPage);
                setTotalPages(Math.ceil(result.count / 10));
                setData(result.results);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchDataAsync();
    }, [searchTerm, currentPage]);

    return { data, isLoading, totalPages };
}
