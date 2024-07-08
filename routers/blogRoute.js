import express from "express";
import { createBlog } from "../controllers/blogController.js";

const router = express.Router();

router.post("/createBlog", createBlog);

export default router;
