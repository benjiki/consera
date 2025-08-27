import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/event.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import merchRoutes from "./routes/merchandise.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/merchandise", merchRoutes);
app.use("/api/orders", orderRoutes);

// Health check route
app.get("/api", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware (optional, good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
