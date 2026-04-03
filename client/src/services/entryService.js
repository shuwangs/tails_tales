import { FaTeeth } from "react-icons/fa";

export const getEntriesByPetId = async (petId) => {
	const response = await fetch(`/api/pets/${petId}/entries`);
	if (!response.ok) {
		throw new Error("Failed to fetch entries");
	}
	const data = await response.json();
	return data.data;
};

export const deleteEntry = async (entryId) => {
	const response = await fetch(`/api/entries/${entryId}`, {
		method: "DELETE"
	});
	if (!response.ok) {
		throw new Error("Failed to fetch entries");
	}

	const deleted = await response.json();
	return deleted.success;
}
