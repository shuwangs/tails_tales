import { Router } from "express";
import { semanticSearch } from "../controller/aiController.js";

const router = Router();

router.post("/:petId/search", semanticSearch);

export default router;
