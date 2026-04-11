import { Router } from "express";
import {
	deleteEntry,
	getEntryById,
	updateEntry,
} from "../controller/entriesController.js";

const router = Router();

router.get("/:id", getEntryById);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

export default router;
