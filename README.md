# DSA Flashcard API

This project provides an API for managing DSA (Data Structures and Algorithms) flashcards. The API allows users to create flashcards, review them with spaced repetition algorithms, and manage their progress.

## Features

- **User Authentication**: JWT-based authentication to ensure secure access to the API.
- **Role-Based Access**: Admin and User roles with different access privileges.
- **Flashcards**: Create, read, and update flashcards.
- **Review Mode**: A review mode that adds problems to a review list, incorporates spaced repetition, and allows users to track their progress.
- **Filtering**: Search flashcards based on category, difficulty, time complexity, and space complexity.
- **Spaced Repetition Algorithm**: Review flashcards based on a spaced repetition algorithm for better retention.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
  - [Flashcards](#flashcards)
  - [Review Mode](#review-mode)
- [Testing](#testing)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/dsa-flashcard-api.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:
    ```env
    JWT_SECRET=your_secret_key
    MONGO_URI=your_mongo_database_uri
    PORT=your_desired_port
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

The server will be running at `http://localhost:5000` (or the port specified in `.env`).

## Setup

1. **Database**: The project uses MongoDB as its database to store user and problem data.
2. **Authentication**: Use JWT for user authentication. Register a new user, log in, and retrieve a JWT token.
3. **Role Management**: Admins have additional privileges like creating, updating, and deleting flashcards, while regular users can only view and review them.

## API Endpoints

### User Authentication

1. **POST /api/auth/register**  
   Register a new user.
   - Body: `{ username, password }`
   - Response: `{ message: "User created successfully", userId }`

2. **POST /api/auth/login**  
   Log in and receive a JWT token.
   - Body: `{ username, password }`
   - Response: `{ token: "JWT_TOKEN" }`

### Flashcards

1. **POST /api/flashcards**  
   Create a new flashcard (Admin only).
   - Body: `{ category, difficulty, time_complexity, space_complexity, problem_statement, solution }`
   - Response: `{ message: "Flashcard created successfully", flashcard }`

2. **GET /api/flashcards**  
   Get all flashcards with optional filtering by category, difficulty, time complexity, or space complexity.
   - Query Params: `category`, `difficulty`, `time_complexity`, `space_complexity`
   - Response: Array of flashcards.

3. **GET /api/flashcards/:id**  
   Get a specific flashcard by ID.
   - Response: `{ flashcard }`

4. **PUT /api/flashcards/:id**  
   Update a flashcard (Admin only).
   - Body: `{ category, difficulty, time_complexity, space_complexity, problem_statement, solution }`
   - Response: `{ message: "Flashcard updated successfully", flashcard }`

### Review Mode

1. **POST /api/review**  
   Add a flashcard to the review list.
   - Body: `{ problemId }`
   - Response: `{ message: "Problem added to review list", review }`

2. **GET /api/review**  
   Get all problems due for review (based on spaced repetition).
   - Response: Array of flashcards due for review.

3. **POST /api/review/:id**  
   Mark a problem as reviewed and update the next review date based on the spaced repetition algorithm.
   - Body: `{ grade }`  
     Where `grade` is a value between 1 and 5 indicating how well the user remembered the problem.
   - Response: `{ message: "Problem reviewed", review }`

## Testing

To run tests:

1. Install testing dependencies:
   ```bash
   npm install --save-dev jest supertest
