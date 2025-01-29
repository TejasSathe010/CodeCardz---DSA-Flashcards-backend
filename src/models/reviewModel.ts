import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  problemId: mongoose.Schema.Types.ObjectId;
  nextReviewDate: Date;
  repetitions: number;
  interval: number;
  easeFactor: number;
  isReviewed: boolean;
}

const reviewSchema = new Schema<IReview>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  nextReviewDate: { type: Date, required: true },
  repetitions: { type: Number, default: 0 },
  interval: { type: Number, default: 1 },
  easeFactor: { type: Number, default: 2.5 },
  isReviewed: { type: Boolean, default: false },
});

const Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;
