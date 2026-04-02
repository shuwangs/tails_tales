import React, { useEffect } from "react";
import { useEntries } from "../contexts/EntriesContext.jsx";
import EntryCard from "./EntryCard.jsx";

const EntryList = () => {
    const { entries, loading, error } = useEntries();

    useEffect(() => {
        console.log(entries);
    }, [entries])


    return (
        <div>
            {
                entries.map((entry) => (<div >
                    <EntryCard entry={entry} />

                </div >))
            }</div>
    );
}

export default EntryList;
