import { Router } from "express";
import upload from "../middlewares/upload.js";
import { requireAuth } from "../middlewares/auth.js";
import {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

const router = Router();

// public
router.get("/", getAllBlog);
router.get("/:id", getSingleBlog);

//admin
router.post("/", requireAuth, upload.single("image"), createBlog);
router.put("/:id", requireAuth, upload.single("image"), updateBlog);
router.delete("/:id", requireAuth, deleteBlog);

export default router;
