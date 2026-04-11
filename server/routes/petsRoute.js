import { Router } from "express";
import {
	addEntryToPetId,
	getEntriesByPetId,
} from "../controller/petController.js";

const router = Router();

router.get("/:petId/entries", getEntriesByPetId);
router.post("/:petId/entries", addEntryToPetId);

export default router;
