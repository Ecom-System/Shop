import { useState } from 'react'
import Result from 'src/components/search/result';
import SearchForm from 'src/components/search/SearchForm';

const Search = () => {
	const [searchKeyword, setSearchKeyword] = useState("");
	const [read, setRead] = useState(0);

	const handleSearch = (keyword: string) => {
		setSearchKeyword(keyword);
		setRead(1);
	};
	return (
		<div>
			{read === 0 ? (
				<SearchForm onSearch={handleSearch} />
			) : (
				<Result keyToFind={searchKeyword} />
			)}
		</div>
	);
}

export default Search