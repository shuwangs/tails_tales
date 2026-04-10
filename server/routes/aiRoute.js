import { Router } from "express";
import { suggestTitles } from "../controller/aiController.js";

const router = Router();

router.post("/title", suggestTitles);

export default router;
