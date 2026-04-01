import AppError from "../utils/AppError.js";
import * as entriesModel from "../models/entriesModel.js";
// Single-entry routes:
// 2. PUT /api/entries/:id
// 3. DELETE /api/entries/:id
// getEntryById, updateEntry, deleteEntry
export const getEntryById = async (req, res, next) => {
    const { id } = req.params;
    if (!Number(id)) return next(new AppError("Bad Request", 400));

    try {
        const result = await entriesModel.getEntryByIdQuery(id);

        if (!result) {
            return next(new AppError("Not Found", 404));
        }
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export const updateEntry = async (req, res, next) => {
    const id = req.params.id;
    const {
        pet_id,
        title,
        mood,
        content,
        cover_image_url,
        entry_date,
        embedding,
    } = req.body;
    if (!Number(id) || !Number(pet_id))
        return next(new AppError("Bad Request", 400));

    try {
        const result = await entriesModel.updateEntryQuery(
            id,
            title,
            mood,
            content,
            cover_image_url,
            entry_date,
            embedding,
        );
        if (!result) {
            return next(new AppError("Not Found", 404));
        }

        res.status(200).json({ result });
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
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
