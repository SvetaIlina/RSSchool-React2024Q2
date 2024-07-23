export interface SwapiPeopleResponse {
    count: number;
    next: null | string;
    previous: null | string;
    results: SwapiPerson[];
}

export interface SwapiPerson {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

export interface CharactersResponse {
    results: SwapiPerson[];
    pageCount: number;
}

export type Props = Record<string, never>;
