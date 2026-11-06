import * as petModel from "../models/petModel.js";
import AppError from "../utils/AppError.js";

export const getEntriesByPetId = async (req, res, next) => {
	try {
		const { petId } = req.params;
		if (!Number(petId) || Number.isNaN(petId))
			return next(new AppError("Invalid petId", 400));

		const result = await petModel.getEntriesByPetIdQuery(petId);

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

export const getMyPets = async (req, res, next) => {
	try {
		const pets = await petModel.getPetsByUserIdQuery(req.user.id);

		res.status(200).json({
			success: true,
			data: pets,
		});
	} catch (err) {
		next(err);
	}
};

export const createPet = async (req, res, next) => {
	try {
		const { pet_name, animal_type, breed, age, personality_tags } =
			req.body ?? {};

		if (
			typeof pet_name !== "string" ||
			!pet_name.trim() ||
			pet_name.trim().length > 100
		) {
			throw new AppError("Pet name must be 1–100 characters", 400);
		}

		if (!["cat", "dog"].includes(animal_type)) {
			throw new AppError("Pet type must be cat or dog", 400);
		}

		if (
			breed != null &&
			(typeof breed !== "string" || breed.trim().length > 100)
		) {
			throw new AppError("Breed must be at most 100 characters", 400);
		}

		if (
			age != null &&
			(!Number.isInteger(age) || age < 0 || age > 2147483647)
		) {
			throw new AppError("Age must be a non-negative whole number", 400);
		}

		if (personality_tags != null && typeof personality_tags !== "string") {
			throw new AppError("Personality tags must be text", 400);
		}

		const pet = await petModel.createPetQuery(req.user.id, {
			pet_name: pet_name.trim(),
			animal_type,
			breed: breed?.trim() || null,
			age: age ?? null,
			personality_tags: personality_tags?.trim() || null,
		});

		res.status(201).json({
			success: true,
			data: pet,
		});
	} catch (err) {
		next(err);
	}
};
