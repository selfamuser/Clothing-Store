import express from "express";
import {
  blockUser,
  createUser,
  deleteUser,
  forgetPasswordToken,
  getAllUsers,
  getUser,
  handleRefreshToken,
  loginUser,
  logoutUser,
  resetPassword,
  unblockUser,
  updatePassword,
  updateUser,
} from "../controllers/userController.js";
import { authHandler, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", authHandler, forgetPasswordToken);
router.post("/reset-password/:token", resetPassword);
router.post("/login", loginUser);
router.put("/updatePassword", authHandler, updatePassword);
router.get("/refreshToken", handleRefreshToken);
router.get("/logoutUser", authHandler, logoutUser);
router.get("/allUsers", authHandler, isAdmin, getAllUsers);
router.get("/:id", authHandler, isAdmin, getUser);
router.delete("/:id", authHandler, isAdmin, deleteUser);
router.put("/updateUser", authHandler, updateUser);
router.put("/blockUser/:id", authHandler, isAdmin, blockUser);
router.put("/unblockUser/:id", authHandler, isAdmin, unblockUser);

export default router;
