import express from "express";
import {
  createBlogCategory,
  deleteBlogCategory,
  getAllBlogCategory,
  getOneBlogCategory,
  updateBlogCategory,
} from "../controllers/blogCategoryController.js";
import { authHandler, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getAllBlogCategory", authHandler, isAdmin, getAllBlogCategory);
router.get("/getOneBlogCategory/:id", authHandler, isAdmin, getOneBlogCategory);
router.post("/createBlogCategory", authHandler, isAdmin, createBlogCategory);
router.put("/updateBlogCategory/:id", authHandler, isAdmin, updateBlogCategory);
router.delete(
  "/deleteBlogCategory/:id",
  authHandler,
  isAdmin,
  deleteBlogCategory
);
export default router;
