import { useEffect, useState } from 'react';

export default function useSavedQuery(key: string, defaultValue = null) {
    const getValue = () => {
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
