# Backend README

This README provides an overview of the backend implementation for the prompt management application. It covers the technologies used, installation instructions, and details about the API endpoints.

## Technologies Used
- **NestJS**: I chose NestJS as it allows for faster implementation and provides a structured and modular approach to development, making codebase management and scalability easier.
- **Swagger**: I utilized Swagger to generate API documentation, providing a clear and interactive interface to understand and explore the available endpoints.
- **Passport**: I used Passport with a JSON Web Token (JWT) strategy for authentication purposes.
- **Redis**
- **TypeScript**


## Prerequisites
Make sure you have the following installed:

- **Redis**: You can install it from the [Redis website](https://redis.io/download).
- **Node.js** and **npm**: Make sure you have Node.js and npm installed. You can download them from the [Node.js website](https://nodejs.org). The project requires Node.js version 18.x and npm version 9.5 or higher.
- **Nest CLI**: The Nest CLI is required for running NestJS commands. You can install it globally by running the following command:
```bash
  npm install -g @nestjs/cli@10.1.7
```

## Installation
1. Clone the repository:
```bash
git clone https://github.com/soroushahrari/assignemnt_backend.git
```
2. Install dependencies:
```bash
npm install
```
3. Rename the `.env.example` file to `.env` and update the necessary environment variables.

4. Start the server:
```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Data Model

The backend application handles user, prompt data, and their relationship using Redis. Here's an overview of the data model:

### User Data
Each user object in Redis is stored with the following properties:
- `id`: A unique identifier for the user (UUID).
- `email`: The email address of the user.
- `createdAt`: The timestamp of when the user was created.
- `password`: The hashed password of the user.

User objects are stored in Redis using the key `user:<userid>`.

### Prompt Data
Each prompt object in Redis is stored with the following properties:
- `id`: A unique identifier for the prompt (UUID).
- `title`: The title of the prompt.
- `description`: The description of the prompt.
- `author`: The user ID of the prompt's author.
- `favorite`: A boolean field indicating whether the prompt is marked as a favorite.
- `createdAt`: The timestamp of when the prompt was created.
- `lastModifiedAt`: The timestamp of when the prompt was last modified.

Prompt objects are stored in Redis using the key `prompt:<promptId>`.

### User-Prompt Relationship
The relationship between users and prompts is managed using a Redis set. Each user has a set with the key `user_prompt:<userid>`. The set contains the keys of the prompts that are associated with that user.

## API Endpoints

The backend server exposes the following RESTful API endpoints:

### Prompt Endpoints

- **`GET /prompt`**: Retrieves all user prompts from the Redis database.
- **`GET /prompt/:id`**: Retrieves a specific prompt by its ID.
- **`POST /prompt`**: Creates a new prompt with the provided data.
- **`PATCH /prompt/:id`**: Updates an existing prompt with the provided data.
- **`DELETE /prompt/:id`**: Deletes a prompt with the specified ID.

### Authentication Endpoints

- **`POST /auth/signup`**: Registers a new user and generates an access token.
- **`POST /auth/login`**: Authenticates a user and generates an access token.

### Swagger Document

You can check the full API documentation by accessing the Swagger UI at: [Swagger Documentation](https://assignemntbackend-production.up.railway.app/api)

### Railway Deployment

The API is deployed on Railway and can be accessed using the following link: [Backend API](https://assignemntbackend-production.up.railway.app)

