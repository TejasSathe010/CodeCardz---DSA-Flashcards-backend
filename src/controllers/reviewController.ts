import { Request, Response } from 'express';
import Review from '../models/reviewModel';
import { calculateNextReview } from '../utils/spacedRepetition';

export const addProblemToReview = async (req: Request, res: Response): Promise<any> => {
  const { problemId } = req.body;
  const userId = req.user?.id;

  try {
    const existingReview = await Review.findOne({ userId, problemId });

    if (existingReview) {
      return res.status(400).json({ message: 'Problem already in review list' });
    }

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + 1); 

    const newReview = new Review({
      userId,
      problemId,
      nextReviewDate,
      repetitions: 0,
      interval: 1,
      easeFactor: 2.5,
      isReviewed: false,
    });

    await newReview.save();
    return res.status(201).json({ message: 'Problem added to review list', review: newReview });
  } catch (err) {
    return res.status(500).json({ message: 'Error adding problem to review list', error: err });
  }
};

// Get problems due for review today
export const getDueProblemsForReview = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.id;

  try {
    const dueProblems = await Review.find({
      userId,
      nextReviewDate: { $lte: new Date() },
      isReviewed: false, 
    }).populate('problemId');

    if (dueProblems.length === 0) {
      return res.status(404).json({ message: 'No problems due for review today' });
    }

    return res.status(200).json(dueProblems.map((review) => review.problemId));
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching problems for review', error: err });
  }
};

export const reviewProblem = async (req: Request, res: Response): Promise<any> => {
  const { problemId, grade } = req.body;
  const userId = req.user?.id;

  try {
    const review = await Review.findOne({ userId, problemId });

    if (!review) {
      return res.status(404).json({ message: 'Problem not found in review list' });
    }

    const { newRepetitions, newEaseFactor, interval, nextReviewDate } = calculateNextReview(
      review.repetitions,
      review.easeFactor,
      grade
    );

    review.repetitions = newRepetitions;
    review.easeFactor = newEaseFactor;
    review.interval = interval;
    review.nextReviewDate = nextReviewDate;
    review.isReviewed = true;

    await review.save();
    return res.status(200).json({ message: 'Problem reviewed', review });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error reviewing problem', error: err });
  }
};
