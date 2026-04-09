import { useState } from 'react';
import { useEntries } from "../contexts/EntriesContext.jsx";
import FormInput from "./ui/FormInput.jsx";
import FormBtn from "./ui/FormBtn.jsx";

const SearchBar = () => {
	const { onSearch } = useEntries();
	const [searchText, setSearchText] = useState("");

	return (
		<div className="flex px-8 py-2 gap-6">
			<FormInput
				className="w-96 rounded-xl border-2 border-amber-400"
				onChange={(e) => setSearchText(e.target.value)}
				type="text"
				placeholder="Searching for diary" />
			<FormBtn onClick={() => onSearch(searchText)}>Search</FormBtn>
		</div>

	);
};

export default SearchBar;
