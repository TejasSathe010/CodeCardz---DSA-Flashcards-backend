import { Request, Response } from "express";
import Problem from "../models/problemModel";

export const createProblems = async (req: Request, res: Response) => {
  try {
    const problems = req.body;
    const savedProblems = await Problem.insertMany(problems);
    res.status(201).json(savedProblems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save problems", error: err });
  }
};

export const getProblems = async (req: Request, res: Response) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch problems", error: err });
  }
};
