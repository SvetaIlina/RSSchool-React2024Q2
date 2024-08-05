import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

interface Query {
    name: string;
    value: string;
    removal: boolean;
}

const useCreateQueryString = () => {
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (queries: Query[]) => {
            const params = new URLSearchParams(searchParams.toString());

            queries.forEach((query) => {
                if (searchParams.has(query.name)) {
                    params.delete(query.name);
                    if (!query.removal) {
                        params.set(query.name, query.value);
                    }
                } else {
                    params.set(query.name, query.value);
                }
            });
            return params.toString();
        },
        [searchParams]
    );

    return createQueryString;
};

export default useCreateQueryString;
