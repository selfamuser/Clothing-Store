import express from "express";
import {
  addToWishlist,
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  rating,
  updateProduct,
} from "../controllers/productController.js";
import { authHandler, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/createProduct", authHandler, isAdmin, createProduct);
router.get("/getOneProduct/:id", authHandler, isAdmin, getOneProduct);
router.put("/wishlist", authHandler, addToWishlist);
router.put("/rating", authHandler, rating);
router.get("/getAllProducts", authHandler, getAllProducts);
router.put("/updateProduct/:id", authHandler, isAdmin, updateProduct);
router.delete("/deleteProduct/:id", authHandler, isAdmin, deleteProduct);

export default router;
