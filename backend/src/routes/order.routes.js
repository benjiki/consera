import express from "express";
import { createOrder, getUserOrders } from "../controllers/order.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder); // must be logged in
router.get("/:userId", authMiddleware, getUserOrders); // only logged in user

export default router;
