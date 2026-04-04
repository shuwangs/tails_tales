import { Router } from "express";
import {
	addEntryToPetId,
	getEntriesByPetId,
} from "../controller/petController.js";

const router = Router();

// Collection - level routes:
// - GET / api / pets /: petId / entries
// - POST / api / pets /: petId / entries
router.get("/:petId/entries", getEntriesByPetId);
router.post("/:petId/entries", addEntryToPetId);

export default router;
