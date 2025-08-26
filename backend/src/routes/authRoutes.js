import express from "express";
import { register, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Example protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Profile accessed", user: req.user });
});

export default router;
