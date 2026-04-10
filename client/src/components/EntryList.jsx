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
		<div className="flex flex-wrap justify-around gap-6">
			{displayedEntries.map((entry) => (
				<div key={entry.id}>
					<Link to={`/entries/${entry.id}`}>
						<EntryCard entry={entry} />
					</Link>
				</div>
			))}
		</div>
	);
};

export default EntryList;
