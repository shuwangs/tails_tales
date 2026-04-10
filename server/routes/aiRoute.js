import { Router } from "express";
import { semanticSearch, suggestTitles } from "../controller/aiController.js";

const router = Router();

router.post("/:petId/search", semanticSearch);

router.post("/title", suggestTitles);

export default router;
