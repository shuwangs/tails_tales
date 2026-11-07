import { Router } from "express";
import {
	addEntryToPetId,
	createPet,
	getEntriesByPetId,
	getMyPets,
} from "../controller/petController.js";

const router = Router();

router.get("/", getMyPets);
router.post("/", createPet);

router.get("/:petId/entries", getEntriesByPetId);
router.post("/:petId/entries", addEntryToPetId);

export default router;
