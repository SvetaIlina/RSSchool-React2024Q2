import { SwapiPeopleResponse } from '../types/type';

const BASE_URL = 'https://swapi.dev/api';

const fetchData = async (searchTerm: string, page?: number): Promise<SwapiPeopleResponse> => {
    let url = `${BASE_URL}/people/`;

    const params = new URLSearchParams();
    if (searchTerm.trim() !== '') {
        params.append('search', searchTerm.trim());
    }
    if (page) {
        params.append('page', page.toString());
    }

    url += `?${params.toString()}`;
    try {
        const response = await fetch(url);
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
