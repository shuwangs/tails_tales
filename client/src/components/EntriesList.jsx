import { useEffect } from "react";
import { useEntries } from "../contexts/EntriesContext.jsx";
import EntryCard from "./EntryCard.jsx";

const EntryList = () => {
	const { entries } = useEntries();

	useEffect(() => {
		console.log(entries);
	}, [entries]);

	return (
		<div className="flex flex-row gap-6">
			{entries.map((entry) => (
				<div key={entry.id}>
					<EntryCard entry={entry} />
				</div>
			))}
		</div>
	);
};

export default EntryList;
