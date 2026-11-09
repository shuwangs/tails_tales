import { Router } from "express";
import {
	askDiary,
	semanticSearch,
	suggestTitles,
	translateContent,
} from "../controller/aiController.js";

const router = Router();

router.post("/:petId/search", semanticSearch);
router.post("/title", suggestTitles);
router.post("/translate", translateContent);
router.post("/:petId/ask", askDiary);

export default router;
