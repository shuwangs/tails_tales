import { useState } from 'react';
import { useEntries } from "../contexts/EntriesContext.jsx";
import { AiOutlineCloseCircle } from "react-icons/ai";
import FormInput from "./ui/FormInput.jsx";
import FormBtn from "./ui/FormBtn.jsx";

const SearchBar = () => {
	const { onSearch, clearSearch } = useEntries();
	const [searchText, setSearchText] = useState("");

	return (
		<div className="flex px-8 py-2 gap-6">
			<FormInput
				className="w-96 rounded-xl border-3 border-amber-300"
				onChange={(e) => setSearchText(e.target.value)}
				type="text"
				placeholder="Searching for diary"
			/>
			<button className='text-amber-400 text-2xl'
				onClick={clearSearch}>
				<AiOutlineCloseCircle />
			</button>

			<FormBtn onClick={() => onSearch(searchText)}>Search</FormBtn>
		</div>

	);
};

export default SearchBar;
