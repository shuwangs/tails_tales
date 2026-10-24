import { Link } from "react-router-dom";
import { useEntries } from "../contexts/EntriesContext.jsx";
import EntryCard from "./EntryCard.jsx";

const EntryList = () => {
	const { entries, searchResults, isSearching, loading, error } = useEntries();
	const displayedEntries = isSearching ? searchResults : entries;

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{`Opps something is wrong, see here ${error}`}</p>;

	if (isSearching && displayedEntries.length === 0) {
		return <p>No matching diary entries found 🐱</p>;
	}
	return (
		<div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
			{displayedEntries.map((entry) => (
				<div key={entry.id} className="min-w-0">
					<Link to={`/entries/${entry.id}`} className="block h-full">
						<EntryCard entry={entry} />
					</Link>
				</div>
			))}
		</div>
	);
};

export default EntryList;
