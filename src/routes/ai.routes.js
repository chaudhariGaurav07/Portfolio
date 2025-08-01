import { Router } from "express";
import { askAI } from "../controllers/ai.controller.js";

const router = Router();

router.post("/ask", askAI);

export default router;