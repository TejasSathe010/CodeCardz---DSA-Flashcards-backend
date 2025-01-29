
export const calculateNextReview = (repetitions: number, easeFactor: number, grade: number) => {
    let newRepetitions = repetitions;
    let newEaseFactor = easeFactor;
    let interval = 1;
  
    if (grade >= 3) {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
    } else {
      newRepetitions = 0;
      interval = 1;
    }
  
    newEaseFactor = easeFactor + 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02);
    newEaseFactor = Math.max(newEaseFactor, 1.3); 
  
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);
  
    return { newRepetitions, newEaseFactor, interval, nextReviewDate };
  };
  