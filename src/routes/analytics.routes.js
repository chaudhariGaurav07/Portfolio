import express from "express";
import { logEvent, getLogs } from "../controllers/analytics.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/log", logEvent); 
router.get("/", requireAuth, getLogs); 

export default router;
