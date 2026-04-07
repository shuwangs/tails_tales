import { Router } from "express";
import { semanticSearch, suggestTitles, translateContent } from "../controller/aiController.js";

const router = Router();

router.post("/:petId/search", semanticSearch);
router.post("/title", suggestTitles);
router.post("/translate", translateContent);

export default router;
