import { embedText } from "../utils/embedText.js";

const testEmbedding = async () => {
	try {
		const emb = await embedText("Hello, I am bobo, I am an adorable cat.");

		console.log("embedding length: ", emb.length);
		console.log("first 5 values:", emb.slice(0, 5));
	} catch (error) {
		console.log("Opps, error..", error.message);
	}
};

testEmbedding();
