export const getEntriesByPetId = async (petId) => {
	const result = await fetch(`/api/pets/${petId}/entries`);
	if (!result.ok) {
		throw new Error("Failed to fetch entries");
	}
	const data = await result.json();
	return data.data;
};
