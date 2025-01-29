import request from 'supertest';
import app from '../app';
import mongoose from "mongoose";


describe('Review Routes', () => {
  let userToken: string;

  beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI!);
    
    const userResponse = await request(app).post("/api/auth/login").send({
        email: "user@example.com",
        password: "user123",
      });
      userToken = userResponse.body.token;
  });

  it('should add a problem to the review list', async () => {
    const problemId = '6792e741053a707501a4cf42'; 

    const response = await request(app)
      .post('/api/review')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ problemId });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Problem added to review list');
    expect(response.body.review.problemId).toBe(problemId);
  });

  it('should get problems due for review', async () => {
    const response = await request(app)
      .get('/api/review')
      .set('Authorization', `Bearer ${userToken}`);

      expect([200, 404]).toContain(response.status);
      expect(Array.isArray(response.body)).toBe(true);
  });

  it('should mark problem as reviewed and update the next review date', async () => {
    const problemId = '60b78f8f1c1c4b3f8cb4d57e';

    const response = await request(app)
      .post('/api/review/complete')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ problemId, grade: 4 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Problem reviewed');
    expect(response.body.review.nextReviewDate).not.toBeNull();
    expect(response.body.review.isReviewed).toBe(true);
  });
});
