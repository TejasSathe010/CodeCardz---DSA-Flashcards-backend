import request from "supertest";
import app from "../app";
import mongoose from "mongoose";

let adminToken: string;
let userToken: string;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  const adminResponse = await request(app).post("/api/auth/login").send({
    email: "admin@example.com",
    password: "admin123",
  });
  adminToken = adminResponse.body.token;


  const userResponse = await request(app).post("/api/auth/login").send({
    email: "user@example.com",
    password: "user123",
  });
  userToken = userResponse.body.token;

});


afterAll(async () => {
  await mongoose.disconnect();
});

describe("Role-Based Access Control", () => {
  it("should allow Admin to create problems", async () => {
    const res = await request(app)
      .post("/api/problems")
      .set("Authorization", `Bearer ${adminToken}`)
      .send([
        {
          problem: "Find the Largest Element in an Array",
          category: "Array",
          difficulty: "Easy",
          intuition: "To find the largest element, iterate through the array while keeping track of the maximum value encountered.",
          time_complexity: "O(n) - Linear time complexity, where n is the number of elements in the array.",
          space_complexity: "O(1) - Constant space required for tracking the maximum element.",
          brute_force_solution: {
            description: "Traverse the entire array and compare each element with a temporary maximum value.",
            code: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint findLargest(vector<int>& arr) {\n sort(arr.begin(),arr.end()); \n return arr[arr.size()-1];   \n}\n\nint main() {\n    vector<int> arr = {10, 20, 4, 45, 99};\n    cout << \"Largest element is \" << findLargest(arr) << endl;\n    return 0;\n}"
          },
          optimized_solution: {
            description: "Same approach, as only one traversal of the array is needed.",
            code: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint findLargest(vector<int>& arr) {\n    int maxElement = arr[0];\n    for (int i = 1; i < arr.size(); i++) {\n        if (arr[i] > maxElement) {\n            maxElement = arr[i];\n        }\n    }\n    return maxElement;\n}\n\nint main() {\n    vector<int> arr = {10, 20, 4, 45, 99};\n    cout << \"Largest element is \" << findLargest(arr) << endl;\n    return 0;\n}"
          },
          key_points: [
            "Finding the largest element in an array is a basic problem in many algorithms.",
            "Use a single traversal through the array for optimal performance.",
            "You only need to compare each element once to determine the largest."
          ],
          common_mistakes: [
            "Not initializing the maximum element properly.",
            "Using nested loops or unnecessary comparisons."
          ]
        }
      ]);

    expect(res.status).toBe(201);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should not allow User to create problems", async () => {
    const res = await request(app)
      .post("/api/problems")
      .set("Authorization", `Bearer ${userToken}`)
      .send([
        {
          problem: "Find the Largest Element in an Array",
          category: "Array",
          difficulty: "Easy",
        }
      ]);

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Not authorized, insufficient privileges");
  });

  it("should allow anyone to get problems", async () => {
    const res = await request(app).get("/api/problems");

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
