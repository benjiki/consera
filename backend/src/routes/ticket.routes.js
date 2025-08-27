import express from "express";
import { createTicket } from "../controllers/ticket.controller.js";
import { authMiddleware, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createTicket); // only admins

export default router;
