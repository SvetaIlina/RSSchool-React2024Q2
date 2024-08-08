import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const isBrowser = typeof window !== 'undefined';

export default function useSavedQuery<T>(
    key: string,
    defaultValue = null
): [T | null, Dispatch<SetStateAction<T | null>>] {
    const getValue = (): T | null => {
        if (!isBrowser) {
            return defaultValue;
        }
        const storage: string | null = localStorage.getItem(key);
        if (storage) {
            return JSON.parse(storage);
        } else {
            return defaultValue;
        }
    };
    const [query, setQuery] = useState(getValue);

    useEffect(() => {
        if (isBrowser) {
            localStorage.setItem(key, JSON.stringify(query));
        }
    }, [query, key]);

    return [query, setQuery];
}
