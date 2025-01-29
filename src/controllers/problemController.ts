import { Request, Response } from "express";
import Problem from "../models/problemModel";

export const createProblems = async (req: Request, res: Response) => {
  try {
    const problems = req.body;
    const savedProblems = await Problem.insertMany(problems);
    res.status(201).json(savedProblems);
  } catch (err) {
    res.status(500).json({ message: "Failed to save problems", error: err });
  }
};

export const getProblems = async (req: Request, res: Response): Promise<any> => {
  const { category, difficulty, time_complexity, space_complexity } = req.query;

  try {
    const filter: any = {};

    if (category) {
      filter.category = category;
    }
    if (difficulty) {
      filter.difficulty = difficulty;
    }
    if (time_complexity) {
      filter.time_complexity = { $regex: time_complexity as string, $options: 'i' };
    }
    if (space_complexity) {
      filter.space_complexity = { $regex: space_complexity as string, $options: 'i' };
    }

    const problems = await Problem.find(filter);

    if (problems.length === 0) {
      return res.status(404).json({ message: 'No problems found matching the filters' });
    }

    return res.status(200).json(problems);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch problems', error: err });
  }
};
