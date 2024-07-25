import express from "express";
import {
  createBlog,
  deleteBlog,
  dislikedBlog,
  getBlogs,
  getOneBlog,
  likedBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { authHandler, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/createBlog", authHandler, isAdmin, createBlog);
router.get("/getBlog/:id", authHandler, getOneBlog);
router.get("/getBlogs", authHandler, getBlogs);
router.put("/updateBlog/:id", authHandler, isAdmin, updateBlog);
router.delete("/deleteBlog/:id", authHandler, isAdmin, deleteBlog);
router.put("/likes", authHandler, likedBlog);
router.put("/dislikes", authHandler, dislikedBlog);

export default router;
