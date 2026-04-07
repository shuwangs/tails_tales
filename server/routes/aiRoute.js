import { Router } from "express";
import { suggestTitles, translateContent} from "../controller/aiController.js";

const router = Router();

router.post("/title", suggestTitles);
router.post("/translate", translateContent);

export default router;
