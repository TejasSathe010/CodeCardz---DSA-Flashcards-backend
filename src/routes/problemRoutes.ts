import express from "express";
import { protect, authorize } from "../middleware/roleMiddleware";
import { createProblems, getProblems } from "../controllers/problemController";

const router = express.Router();

router.post("/problems", protect, authorize("Admin"), createProblems);

router.get("/problems", getProblems);

export default router;
