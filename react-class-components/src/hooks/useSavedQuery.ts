import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useSavedQuery<T>(
    key: string,
    defaultValue = null
): [T | null, Dispatch<SetStateAction<T | null>>] {
    const isClient = typeof window !== 'undefined';
    const getValue = (): T | null => {
        if (isClient) {
            const storage: string | null = localStorage.getItem(key);
            if (storage) {
                return JSON.parse(storage);
            }
        }
        return defaultValue;
    };
    const [query, setQuery] = useState(getValue);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem(key, JSON.stringify(query));
        }
    }, [query]);

    return [query, setQuery];
}
