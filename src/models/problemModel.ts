import mongoose, { Schema, Document } from 'mongoose';

interface ISolution {
  description: string;
  code: string;
}

interface IProblem extends Document {
  problem: string;
  category: string;
  difficulty: string;
  intuition: string;
  time_complexity: string;
  space_complexity: string;
  brute_force_solution: ISolution;
  optimized_solution: ISolution;
  key_points: string[];
  common_mistakes: string[];
}

const solutionSchema = new Schema<ISolution>({
  description: { type: String, required: true },
  code: { type: String, required: true },
});

const problemSchema = new Schema<IProblem>({
  problem: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  intuition: { type: String },
  time_complexity: { type: String },
  space_complexity: { type: String },
  brute_force_solution: { type: solutionSchema, required: true },
  optimized_solution: { type: solutionSchema, required: true },
  key_points: { type: [String], default: [] },
  common_mistakes: { type: [String], default: [] },
});

export default mongoose.model<IProblem>('Problem', problemSchema);
