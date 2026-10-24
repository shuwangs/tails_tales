import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEntries } from "../contexts/EntriesContext.jsx";
import FormInput from "./ui/FormInput.jsx";

const SearchBar = () => {
	const { onSearch, clearSearch } = useEntries();
	const [searchText, setSearchText] = useState("");

	return (
		<div className="flex items-center gap-2 sm:gap-3">
			<FormInput
				className="min-w-0 flex-1 rounded-xl border border-amber-200 bg-white"
				onChange={(e) => setSearchText(e.target.value)}
				type="text"
				placeholder="Searching for diary"
			/>
			<button
				className="text-amber-400 text-2xl"
				type="button"
				aria-label="Clear search"
				onClick={clearSearch}
			>
				<AiOutlineCloseCircle />
			</button>

			<button
				type="button"
				onClick={() => onSearch(searchText)}
				className="shrink-0 rounded-xl bg-amber-500 px-4 py-2 text-base font-medium text-white hover:bg-amber-600"
			>
				Search
			</button>
		</div>
	);
};

export default SearchBar;
