import {Router} from 'express'
import { sendMessage, getMessages } from "../controllers/contact.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router()

router.post("/", sendMessage)
router.get("/", requireAuth, getMessages) // admin only

export default router;
