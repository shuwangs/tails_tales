import { Router } from "express";
import { semanticSearch } from "../controller/aiController.js";
import { suggestTitles } from "../controller/aiController.js";

const router = Router();

router.post("/:petId/search", semanticSearch);

router.post("/title", suggestTitles);

export default router;
