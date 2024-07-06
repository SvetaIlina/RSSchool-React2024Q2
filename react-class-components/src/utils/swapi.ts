import { SwapiPerson } from '../types/type';

const BASE_URL = 'https://swapi.dev/api';

const fetchData = async (searchTerm: string): Promise<SwapiPerson[]> => {
    let url = `${BASE_URL}/people/`;

    if (searchTerm.trim() !== '') {
        url += `?search=${searchTerm.trim()}&page=1`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default fetchData;
