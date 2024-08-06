import { SwapiPeopleResponse } from '../types/type';

export const BASE_URL = 'https://swapi.dev/api';

const fetchData = async (searchTerm: string = '', page: string = '1'): Promise<SwapiPeopleResponse> => {
    let url = `${BASE_URL}/people/`;

    searchTerm ? (url += `?search=${searchTerm}&page=${page}`) : (url += `?page=${page}`);

    try {
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: SwapiPeopleResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default fetchData;
