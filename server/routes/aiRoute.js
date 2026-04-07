import { Router } from "express";
<<<<<<< HEAD
import { semanticSearch, suggestTitles, translateContent } from "../controller/aiController.js";
=======
import { suggestTitles, translateContent } from "../controller/aiController.js";
>>>>>>> 83ed675 (format code with biome)

const router = Router();

router.post("/:petId/search", semanticSearch);
router.post("/title", suggestTitles);
router.post("/translate", translateContent);

export default router;
