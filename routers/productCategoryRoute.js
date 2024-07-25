import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} from "../controllers/productCategoryController.js";
import { authHandler, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getAllCategory", authHandler, isAdmin, getAllCategory);
router.get("/getOneCategory/:id", authHandler, isAdmin, getOneCategory);
router.post("/createCategory", authHandler, isAdmin, createCategory);
router.put("/updateCategory/:id", authHandler, isAdmin, updateCategory);
router.delete("/deleteCategory/:id", authHandler, isAdmin, deleteCategory);
export default router;
