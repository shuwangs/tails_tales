import { calCosineSimilarity } from "../models/cosineSimilarity.js";
import { getPetsByUserIdQuery } from "../models/petModel.js";
import diaryAnswerGenerator from "../utils/diaryAnswerGenerator.js";
import AppError from "../utils/AppError.js";
import { embedText } from "../utils/embedText.js";
import textTranslator from "../utils/textTranslation.js";
import titleGenerator from "../utils/titleGenerator.js";

export const semanticSearch = async (req, res, next) => {
	console.log("semantic controller is called...");
	try {
		const petId = req.params.petId;
		if (!Number(petId)) {
			return next(new AppError("Bad request", 400));
		}
		const { searchText } = req.body;
		if (!searchText?.trim()) {
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
		});
	} catch (err) {
		next(err);
	}
};

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
};

export const translateContent = async (req, res, next) => {
	console.log("translating controller is called....");
	try {
		const { content, target } = req.body;
		if (!content?.trim()) {
			return next(new AppError("Content is required", 400));
		}
		if (!target?.trim()) {
			return next(new AppError("Target language is required", 400));
		}

		const translated = await textTranslator(content, target);
		console.log("translating content is: ", translated);
		res.status(200).json({
			success: true,
			data: translated,
		});
	} catch (err) {
		next(err);
	}
};

export const askDiary = async (req, res, next) => {
	console.log("ask diary controller is called....");
	try {
		const petID = req.params.petId;
		const { question } = req.body ?? {};
		if (!petID) {
			return next(new AppError("Pet ID is required", 400));
		}
		if (typeof question !== "string" || !question.trim()) {
			return next(new AppError("Question is required", 400));
		}

		const pets = await getPetsByUserIdQuery(req.user.id);

		const ownsPet = pets.some(
			(pet) => Number(pet.id) === Number(req.params.petId),
		);

		if (!ownsPet) {
			throw new AppError("Pet not found", 404);
		}

		const questionEmbedding = await embedText(question.trim());

		const entries = await calCosineSimilarity(
			req.params.petId,
			questionEmbedding,
		);

		console.log("Retrieved diary entries:", entries);
		const context = entries
			.map((entry, index) =>
				JSON.stringify({
					source: index + 1,
					title: entry.title,
					date: entry.entry_date,
					content: entry.content,
				}),
			)
			.join("\n\n");

		const answer = await diaryAnswerGenerator(question, context);

		res.status(200).json({
			success: true,
			data: answer,
		});
	} catch (err) {
		next(err);
	}
};
