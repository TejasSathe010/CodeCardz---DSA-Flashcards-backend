import express, { Request, Response } from 'express';
import { protect } from '../middleware/roleMiddleware';
import { addProblemToReview, getDueProblemsForReview, reviewProblem } from '../controllers/reviewController';

const router = express.Router();

router.post('/', protect, addProblemToReview);

router.get('/', protect, getDueProblemsForReview);

router.post('/complete', protect, reviewProblem);

export default router;
