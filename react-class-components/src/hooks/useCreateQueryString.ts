import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

const useCreateQueryString = () => {
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            if (searchParams.get(name) !== value) {
                const params = new URLSearchParams(searchParams.toString());
                params.set(name, value);
                return params.toString();
            } else {
                return '';
            }
        },
        [searchParams]
    );

    return createQueryString;
};

export default useCreateQueryString;
