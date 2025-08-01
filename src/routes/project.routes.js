import {Router} from "express";
import upload from "../middlewares/upload.js";
import { requireAuth } from "../middlewares/auth.js";
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  filterProjectsByTech
} from "../controllers/project.controller.js";


const router = Router()

// Public
router.get("/",getAllProjects)
router.get("/filter", filterProjectsByTech);

// Admin only
router.post("/", requireAuth, upload.single("image"), createProject)
router.put("/:id", requireAuth, upload.single("image"), updateProject)
router.delete("/:id", requireAuth, deleteProject)

export default router;