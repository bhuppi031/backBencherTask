# backbencher-technology-task

# User and Task Management API

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the server: `npx nodemon index.js`

## API Endpoints

### Authentication

- **POST /register**: Register a new user.
- **POST /login**: Login and receive a JWT token.

### Tasks

- **GET /tasks**: Retrieve tasks for the authenticated user.
- **POST /tasks**: Create a task.
- **PUT /tasks/:id**: Update a task.
- **DELETE /tasks/:id**: Delete a task.

## Testing

Use Postman or curl to test the API endpoints.