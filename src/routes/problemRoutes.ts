import express from "express";
import { protect, authorize } from "../middleware/roleMiddleware";
import { createProblems, getProblems } from "../controllers/problemController";

const router = express.Router();

router.post("/", protect, authorize("Admin"), createProblems);

router.get("/", getProblems);

export default router;
