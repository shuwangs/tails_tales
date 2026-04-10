import { calCosineSimilarity } from "../models/cosineSimilarity.js";
import { embedText } from "../utils/embedText.js";
import titleGenerator from "../utils/titleGenerator.js";

export const semanticSearch = async (req, res, next) => {
	console.log("semantic controller is called...");
	try {
		const petId = req.params.petId;
		if (!Number(petId)) {
			return next(new AppError("Bad request", 400));
		}
		const { searchText } = req.body;
		if (!searchText || !searchText.trim()) {
			return next(new AppError("search term is required", 400));
		}

		// embed the searchText
		const searchEmb = await embedText(searchText);
		console.log("searched sentence embedding is: ", searchEmb);

		const result = await calCosineSimilarity(petId, searchEmb);
		console.log("semantic searched results are: ", result);

		res.status(200).json({
			success: true,
			data: result,
		})

	} catch (err) {
		next(err);
	}
}

export const suggestTitles = async (req, res, next) => {
	console.log("suggesting title controller is called....");
	try {
		const { content } = req.body;
		if (!content?.trim()) {
			return next(new AppError("Content is required", 400));
		}

		const titles = await titleGenerator(content);
		console.log("ai generated titles are: ", titles);
		res.status(200).json({
			success: true,
			data: titles,
		});
	} catch (err) {
		next(err);
	}
}

