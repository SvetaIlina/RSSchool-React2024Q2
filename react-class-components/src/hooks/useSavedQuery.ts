import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useSavedQuery<T>(
    key: string,
    defaultValue = null
): [T | null, Dispatch<SetStateAction<T | null>>] {
    const getValue = (): T | null => {
        const storage: string | null = localStorage.getItem(key);
        if (storage) {
            return JSON.parse(storage);
        } else {
            return defaultValue;
        }
    };
    const [query, setQuery] = useState(getValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(query));
    }, [query]);

    return [query, setQuery];
}
