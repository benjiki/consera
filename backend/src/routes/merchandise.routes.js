import express from "express";
import {
  createMerchandise,
  getMerchandise,
} from "../controllers/merchandise.controller.js";
import { authMiddleware, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getMerchandise); // public
router.post("/", authMiddleware, isAdmin, createMerchandise); // only admins

export default router;
