import { pipeline } from "@huggingface/transformers";

let extractor = null;

const getExtractor = async () => {
	if (!extractor) {
		extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
	}
	return extractor;
};
const truncateText = (text, maxLength = 1000) => {
	return text.length > maxLength ? text.slice(0, maxLength) : text;
};

export const embedText = async (text) => {
	if (!text || !text.trim()) {
		throw new Error("text cannot be emtpy");
	}
	const model = await getExtractor();

	const result = await model(truncateText(text), {
		pooling: "mean",
		normalize: true,
	});
	return Array.from(result.data);
};
