import {Router} from "express"
import { loginAdmin, registerAdmin } from "../controllers/auth.controller.js"

const router = Router()

router.post("/login",loginAdmin)
// i have to remove this for protection purpose after using one time 
router.post("/register", registerAdmin);

export default router;
