import { useState } from 'react'
import { SearchForm } from 'src/components/search/SearchForm'

const Search = () => {
	const [name, setName] = useState("")
	return (
		<>
			<SearchForm />
		</>
	)
}

export default Search