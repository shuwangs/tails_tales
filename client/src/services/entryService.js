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

export const getEntryById = async (id, signal) => {
	const response = await fetch(`/api/entries/${id}`, { signal });

	if (response.status === 404) {
		return null;
	}

	if (!response.ok) {
		throw new Error("Failed to load entry");
	}

	const result = await response.json();
	return result.data;
};

export const updateEntry = async (entryId, entry) => {
	const response = await fetch(`/api/entries/${entryId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(entry),
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message || "Failed to update entry");
	}

	return result.data;
};