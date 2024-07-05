import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "../controllers/productController.js";
import { authHandler, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/createProduct", authHandler, isAdmin, createProduct);
router.get("/getOneProduct/:id", authHandler, isAdmin, getOneProduct);
router.get("/getAllProducts", authHandler, isAdmin, getAllProducts);
router.put("/updateProduct/:id", authHandler, isAdmin, updateProduct);
router.delete("/deleteProduct/:id", authHandler, isAdmin, deleteProduct);

export default router;
