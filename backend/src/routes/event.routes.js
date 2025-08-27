import express from "express";
import { createEvent, getEvents } from "../controllers/event.controller.js";
import { authMiddleware, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getEvents); // public
router.post("/", authMiddleware, isAdmin, createEvent); // only admins

export default router;
