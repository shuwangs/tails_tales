import React, { createContext, useContext, useEffect, useState } from "react";
import {
	getEntriesByPetId,
	addEntriesToPetId,
} from "../services/entryService.js";

const EntriesContext = createContext();

export const EntriesProvider = ({ children }) => {
	const petId = 1;
	const [entries, setEntries] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchEntries(petId);
	}, [petId]);

	const fetchEntries = async (pet_id) => {
		try {
			setLoading(true);
			setError("");
			const result = await getEntriesByPetId(pet_id);
			setEntries(result);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const addEntry = async (pet_id, newEntry) => {
		try {
			setLoading(true);
			setError("");
			const result = await addEntriesToPetId(pet_id, newEntry);
			console.log("In entryContext check the result", result);
			setEntries((prev) => [...prev, result]);
			console.log("In entryContext check after setEntries", entries);

			// await fetchEntries(pet_id);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const values = {
		petId,
		entries,
		error,
		loading,
		addEntry,
	};

	return (
		<EntriesContext.Provider value={values}>{children}</EntriesContext.Provider>
	);
};

export const useEntries = () => {
	const ctx = useContext(EntriesContext);
	if (!ctx) {
		throw new Error("useEntires must be used within and EntriesProvider");
	}
	return ctx;
};
