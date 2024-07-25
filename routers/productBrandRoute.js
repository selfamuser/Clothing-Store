import express from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  getOneBrand,
  updateBrand,
} from "../controllers/productBrandController.js";
import { authHandler, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getAllBrand", authHandler, isAdmin, getAllBrand);
router.get("/getOneBrand/:id", authHandler, isAdmin, getOneBrand);
router.post("/createBrand", authHandler, isAdmin, createBrand);
router.put("/updateBrand/:id", authHandler, isAdmin, updateBrand);
router.delete("/deleteBrand/:id", authHandler, isAdmin, deleteBrand);
export default router;
