import * as entriesModel from "../models/entriesModel.js";
import AppError from "../utils/AppError.js";
import { embedText } from "../utils/embedText.js";
export const getEntryById = async (req, res, next) => {
	const { id } = req.params;
	if (!Number(id)) return next(new AppError("Bad Request", 400));

	try {
		const result = await entriesModel.getEntryByIdQuery(id);

		if (!result) {
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

export const updateEntry = async (req, res, next) => {
	const id = Number(req.params.id);
	const { title, content, mood, entry_date } = req.body ?? {};
	if (!Number.isSafeInteger(id) || id <= 0) {
		return next(new AppError("Invalid entry ID", 400));
	}
	if (typeof content !== "string" || !content.trim()) {
		return next(new AppError("Content is required", 400));
	}
	if (typeof title !== "string" || title.trim().length > 200) {
		return next(new AppError("Title must be at most 200 characters", 400));
	}
	if (typeof mood !== "string" || mood.length > 50) {
		return next(new AppError("Invalid mood", 400));
	}
	if (
		typeof entry_date !== "string" ||
		!/^\d{4}-\d{2}-\d{2}$/.test(entry_date)
	) {
		return next(new AppError("Date must use YYYY-MM-DD format", 400));
	}

	const parsedDate = new Date(`${entry_date}T00:00:00Z`);
	if (
		Number.isNaN(parsedDate.getTime()) ||
		parsedDate.toISOString().slice(0, 10) !== entry_date
	) {
		return next(new AppError("Invalid entry date", 400));
	}

	try {
		const existingEntry = await entriesModel.getEntryByIdQuery(id);

		if (!existingEntry) {
			return next(new AppError("Entry not found", 404));
		}

		const embedding = await embedText(content.trim());

		// Update the entry in the database with the new embedding and trimmed content
		const updatedEntry = await entriesModel.updateEntryQuery(
			id,
			title.trim(),
			mood,
			content.trim(),
			existingEntry.cover_image_url,
			entry_date,
			JSON.stringify(embedding),
		);

		if (!updatedEntry) {
			return next(new AppError("Entry not found", 404));
		}

		res.status(200).json({
			success: true,
			data: updatedEntry,
		});
	} catch (err) {
		next(err);
	}
};

export const deleteEntry = async (req, res, next) => {
	const { id } = req.params;
	if (!Number(id)) return next(new AppError("Bad Request", 400));

	try {
		const result = await entriesModel.deleteEntryByIdQuery(id);

		if (!result) {
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
