export const getEntriesByPetId = async (petId) => {
	const result = await fetch(`/api/pets/${petId}/entries`);
	if (!result.ok) {
		throw new Error("Failed to fetch entries");
	}
	const data = await result.json();
	return data.data;
};

export const addEntriesToPetId = async (petId, newEntry) => {
	const result = await fetch(`/api/pets/${petId}/entries`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newEntry),
	});
	if (!result.ok) {
		throw new Error("Failed to post entry");
	}

	const newDairy = await result.json.data();
	return newDairy;
};
