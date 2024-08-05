import MainPage from '../components/mainPage/mainPage';
import { PageCount } from '../types/enums';
import { SwapiPeopleResponse, SwapiPerson } from '../types/type';
import fetchData from '../utils/swapi';

export interface PageParams {
    searchParams: { searchTerm?: string; page?: string; details?: string };
}

export default async function Page({ searchParams }: PageParams) {
    const searchTerm = searchParams.searchTerm;
    const page = searchParams.page;
    const details = searchParams.details;
    let detailsData: SwapiPerson[] = [];
    let resultData: SwapiPeopleResponse = {
        count: 0,
        next: null,
        previous: null,
        results: [],
    };
    let totalPages = 0;

    try {
        resultData = await fetchData(searchTerm, page);
        totalPages = Math.ceil(resultData.count / PageCount.TOTAL);

        if (details) {
            const data = await fetchData(details);
            detailsData = data.results;
        }
    } catch (error) {
        console.error(error);
    }

    return <MainPage initialData={resultData.results} initialDetailData={detailsData} totalPages={totalPages} />;
}
