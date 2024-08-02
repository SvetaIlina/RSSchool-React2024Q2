import MainPage from '../components/mainPage/mainPage';
import { PageCount } from '../types/enums';
import { SwapiPerson } from '../types/type';
import fetchData from '../utils/swapi';

export interface PageParams {
    searchParams: { searchTerm?: string; page?: string; details?: string };
}

export default async function Page({ searchParams }: PageParams) {
    const searchTerm = searchParams.searchTerm;
    const page = searchParams.page;
    const details = searchParams.details;
    const resultData = await fetchData(searchTerm, page);
    const totalPages = Math.ceil(resultData.count / PageCount.TOTAL);
    let detailsData: SwapiPerson[] = [];

    if (details) {
        const data = await fetchData(details);
        detailsData = data.results;
    }

    return <MainPage initialData={resultData.results} initialDetailData={detailsData} totalPages={totalPages} />;
}
