import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

// Protect route with auth later
router.get("/stats", getDashboardStats);

export default router;