import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useEntries } from "../contexts/EntriesContext.jsx";
import EntryCard from "./EntryCard.jsx";

const EntryList = () => {
	const { entries, loading, error } = useEntries();

	useEffect(() => {
		console.log(entries);
	}, [entries]);

	if (loading) return <p>Loading...</p>;
	if (loading) return <p>{`Opps something is wrong, see here ${error}`}</p>;
	return (
		<div className="flex flex-wrap justify-around gap-6">
			{entries.map((entry) => (
				<div>
					<Link to="/detail">
						<EntryCard entry={entry} />
					</Link>
				</div>
			))}
		</div>
	);
};

export default EntryList;
