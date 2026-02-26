# Problem 5: A Crude Server

This is a basic backend server built with **ExpressJS** and **TypeScript**, using **SQLite** for data persistence. It provides a RESTful API for managing a "resources" entity which has a name, description, and category.

## Architecture & Best Practices

The server follows a modern, scalable Layered Architecture pattern, separating concerns across distinct layers to adhere to enterprise best practices:

*   **`src/routes/`**: Express routers defining the API endpoints map.
*   **`src/controllers/`**: HTTP logic layer. Extracts requests, calls the models, and formats HTTP responses.
*   **`src/models/`**: Business logic and database access layer. Defines DB queries and encapsulates data operations.
*   **`src/database/`**: Database connection wrapper and generic query helpers.
*   **`src/middlewares/`**: Express middleware (including centralized validation via `zod` and unhandled error catching via `errorHandler.ts`).
*   **`src/types/`**: Shared TypeScript definitions and interfaces for strong typing (e.g., `Resource`).
*   **`src/docs/`**: Swagger openapi configurations.

## Features & Enhancements

*   **Layered Structure**: Follows MVC Controller/Model splits.
*   **Zod Validation**: Routes are protected by strict schema parsing.
*   **Swagger API Docs**: A beautiful auto-generated UI portal.
*   **Code Quality**: Enforced by ESLint, Winston Logger, and a complete Jest integration suite.

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node Package Manager)

## Setup and Installation

1. Navigate to the `problem5` directory:
   ```bash
   cd src/problem5
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript code:
   ```bash
   npm run build
   ```
   This compiles the code from `src/` and outputs the JavaScript files to the `dist/` directory.

## Running the Server

There are several ways to start the server:

### Development Mode
To run the application with hot-reloading (useful during development when making changes):
```bash
npm run dev
```

### Production Mode
To run the compiled JavaScript code directly:
```bash
npm start
```

## API Endpoints & Swagger UI

The server runs on **port `3000`** by default. Base URL: `http://localhost:3000/api/v1/resources`

To view the interactive Swagger Documentation Portal, navigate to:
**`http://localhost:3000/api-docs`**

| Method | Endpoint | Description | Request Body (JSON example) |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Create a new resource. | `{"name": "Apples", "description": "Red", "category": "Fruit"}` |
| `GET` | `/` | List all resources. Supports filtering via `?category=...` and `?name=...` | None |
| `GET` | `/:id` | Get details of a specific resource by ID. | None |
| `PUT` | `/:id` | Update an existing resource. At least one field is required. | `{"category": "Vegetable"}` |
| `DELETE` | `/:id` | Delete a resource by ID. | None |

## Running Tests

To run the complete Jest testing suite:
```bash
npm run test
```

## Data Persistence

The application uses SQLite for local file-based storage. A `resources.db` file will be created automatically in the root of the `problem5` directory upon the first run of the server. No additional database installation or configuration is required.
