import { createContext, useContext, useEffect, useState } from "react";
import {
	addEntriesToPetId,
	deleteEntry,
	getEntriesByPetId,
} from "../services/entryService.js";

const EntriesContext = createContext();

export const EntriesProvider = ({ children }) => {
	const petId = 1;
	const [entries, setEntries] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
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

		fetchEntries(petId);
	}, []);

	const deleteEntryHandler = async (entry_id) => {
		try {
			setLoading(true);
			setError("");
			await deleteEntry(entry_id);
			setEntries((prev) => prev.filter((e) => e.id !== Number(entry_id)));
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
			setEntries((prev) => [...prev, result]);
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
		deleteEntryHandler,
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
