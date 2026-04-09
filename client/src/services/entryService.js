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
		method: "DELETE",
	});
	if (!response.ok) {
		throw new Error("Failed to fetch entries");
	}

	const deleted = await response.json();
	return deleted.success;
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

	const newDairy = await result.json();
	console.log("In the service newDiary", newDairy);
	return newDairy.data;
};

export const searchDiary = async (petId, searchText) => {
	const result = await fetch(`/api/ai/${petId}/search`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ searchText }),
	});

	if (!result.ok) {
		throw new Error("Failed to post entry");
	}

	const relatedDairy = await result.json();
	const data = relatedDairy.data;
	console.log("In the service search Diary", data);

	return relatedDairy.data;
};
