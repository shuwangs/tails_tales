export const getSuggestedTitle = async (content) => {
	const response = await fetch(`/api/ai/title`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			content: content,
		}),
	});
	if (!response.ok) {
		throw new Error("Failed to generate titles");
	}
	const data = await response.json();
    const titles = data.data;
	return titles;
};
