import SearchInput from './input/searchInput';
import SearchButton from './button/searchBtn';
import './searchSection.css';

interface SearchSectionProps {
    searchTerm: string;
    onSearchTermChange: (term: string) => void;
    onSearch: () => void;
}

export default function SearchSection({ searchTerm, onSearchTermChange, onSearch }: SearchSectionProps) {
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <form className="search-section" onSubmit={onFormSubmit}>
            <SearchInput value={searchTerm} onChange={onSearchTermChange} />
            <SearchButton />
        </form>
    );
}
