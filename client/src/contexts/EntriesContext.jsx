import React, { createContext, useContext, useEffect, useState } from "react";
import { getEntriesByPetId } from "../services/entryService.js";

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

	const values = {
		petId,
		entries,
		error,
		loading,
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
