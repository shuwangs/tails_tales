import { Router } from "express";
import {
	getEntryById,
	updateEntry,
	deleteEntry,
} from "../controller/entriesController.js";

const router = Router();

// Single-entry routes:
// 1. GET /api/entries/:id
// 2. PUT /api/entries/:id
// 3. DELETE /api/entries/:id

router.get("/:id", getEntryById);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

export default router;
