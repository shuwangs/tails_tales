import * as petModel from "../models/petModel.js";
import AppError from "../utils/AppError.js";

export const getEntriesByPetId = async (req, res, next) => {
	try {
		const { petId } = req.params;
		if (!Number(petId) || Number.isNaN(petId))
			return next(new AppError("Invalid petId", 400));

		const result = await petModel.getEntriesByPetIdQuery(petId);
		if (result.length === 0) {
			return next(new AppError("Not Found", 404));
		}

		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

export const addEntryToPetId = async (req, res, next) => {
	try {
		const { petId } = req.params;
		const entry = req.body;

		if (!petId || Number.isNaN(petId)) {
			return next(new AppError("Invalid petId", 400));
		}

		const { content, entry_date } = entry;

		if (!content) {
			return next(new AppError("Content is required", 400));
		}

		if (!entry_date) {
			return next(new AppError("Entry date is required", 400));
		}

		const result = await petModel.addEntriesByPetIdQuery(petId, entry);
		if (!result) return next(new AppError("Failed to create entry", 500));
		res.status(201).json({
			success: true,
			data: result,
		});
	} catch (err) {
		next(err);
	}
};
