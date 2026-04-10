export const cleanText = (rawText) => {
	const clean = rawText.replace(/```json|```/g, "").trim();
	const cleanRes = JSON.parse(clean);
	return cleanRes;
};
