import { createContext, useContext, useEffect, useState } from "react";
import {
	addEntriesToPetId,
	deleteEntry,
	getEntriesByPetId,
} from "../services/entryService.js";
import { getSuggestedTitle, getTranslatedText } from "../services/aiService.js";
const EntriesContext = createContext();

export const EntriesProvider = ({ children }) => {
	const petId = 1;
	const [entries, setEntries] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [suggestedTitles, setSuggestedTitles] = useState([]);
	const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
	const [translatedText, setTranslatedText] = useState("");
	const [isTranslating, setIsTranslating] = useState(false);

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

	const handleSuggestTitle = async (content) => {
		if (!content.trim()) return;

		try {
			setIsGeneratingTitle(true);
			setSuggestedTitles([]);

			const result = await getSuggestedTitle(content);
			console.log("in useEntries, after fetch titles are: ", result);
			setSuggestedTitles(result.titles);
		} catch (error) {
			console.error("Failed to generate titles:", error);
		} finally {
			setIsGeneratingTitle(false);
		}
	};
	const handleTranslateText = async (content, lang) => {
		if (!content?.trim()) return;
		if (!lang?.trim()) return;

		try {
			setIsTranslating(true);
			setTranslatedText("");

			const result = await getTranslatedText(content, lang);
			console.log("in useEntries, after fetch translating are: ", result);
			setTranslatedText(result);
		} catch (error) {
			console.error("Failed to generate titles:", error);
		} finally {
			setIsTranslating(false);
		}
	};
	const values = {
		petId,
		entries,
		error,
		loading,
		suggestedTitles,
		isGeneratingTitle,
		translatedText,
		isTranslating,
		deleteEntryHandler,
		addEntry,
		handleSuggestTitle,
		handleTranslateText,
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
