import express from "express";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
} from "../controllers/couponController.js";
import { authHandler, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/createCoupon", authHandler, isAdmin, createCoupon);
router.get("/getAllCoupon", authHandler, isAdmin, getAllCoupons);
router.get("/getCoupon/:id", authHandler, isAdmin, getCoupon);
router.put("/updateCoupon/:id", authHandler, isAdmin, updateCoupon);
router.delete("/deleteCoupon/:id", authHandler, isAdmin, deleteCoupon);

export default router;
