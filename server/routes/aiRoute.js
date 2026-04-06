import { Router } from "express";
import { suggestTitles } from "../controller/aiController.js";

const router = Router();

router.get("/title", suggestTitles);

export default router;