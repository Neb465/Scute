# BenBenBen

A full-stack JavaScript application with a React/Vite frontend and an Express backend. The backend currently provides user management endpoints, PostgreSQL persistence, request validation, password hashing, and map/geocoding integrations through OpenRouteService.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Database](#database)
- [Quality and Maintenance](#quality-and-maintenance)
- [Roadmap](#roadmap)
- [License](#license)

## Overview

This repository is organized as a split frontend/backend application:

- `frontend/` contains a React 19 application powered by Vite.
- `backend/` contains an Express 5 API server using PostgreSQL through `pg-promise`.
- User data is validated with Joi and passwords are hashed with bcrypt before storage.
- Map-related endpoints proxy OpenRouteService geocoding and directions APIs.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React, Vite |
| Backend | Node.js, Express |
| Database | PostgreSQL, pg-promise |
| Validation | Joi |
| Security | bcrypt password hashing |
| Maps | OpenRouteService API |
| Tooling | ESLint, npm |

## Project Structure

```text
.
+-- backend/
|   +-- config/             # Database configuration
|   +-- controllers/        # Request handlers
|   +-- middleware/         # Validation and error handling middleware
|   +-- models/             # Database query layer
|   +-- routes/             # API route definitions
|   +-- package.json
|   +-- server.js           # Express app entry point
+-- frontend/
|   +-- public/
|   +-- src/
|   +-- package.json
|   +-- vite.config.js
+-- README.md
```

## Prerequisites

Install the following before running the project locally:

- Node.js 20 or newer
- npm
- PostgreSQL
- An OpenRouteService API key

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=6767

DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password

ors_key=your_openrouteservice_api_key
```

> Note: `DB_PORT` defaults to `7676` in the current backend configuration if it is not provided. Set it explicitly if your PostgreSQL instance uses the default `5432` port.

## Getting Started

Clone the repository and install dependencies for both applications:

```bash
git clone <repository-url>
cd benbenben

cd backend
npm install

cd ../frontend
npm install
```

Start the backend API:

```bash
cd backend
npm run dev
```

The API will run on `http://localhost:6767` unless `PORT` is set in `backend/.env`.

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

The Vite development server will print the local frontend URL, usually `http://localhost:5173`.

## Available Scripts

### Backend

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Express server with Node watch mode and loads `backend/.env`. |

### Frontend

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the frontend for production. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs ESLint against the frontend source. |

## API Reference

Base URL:

```text
http://localhost:6767/api
```

### Users

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/users` | Fetch all users. |
| `GET` | `/users/:id` | Fetch a user by ID. |
| `POST` | `/users` | Create a user. |
| `PUT` | `/users/:id` | Update a user after password validation. |
| `DELETE` | `/users/:id` | Delete a user. |

Example create-user request:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secure-password"
}
```

### Maps

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/maps/interactions?lon=<longitude>&lat=<latitude>` | Reverse geocode a clicked map location. |
| `GET` | `/maps/places?searchQuery=<query>&focusPointLon=<longitude>&focusPointLat=<latitude>` | Search for places near a focus point. |
| `POST` | `/maps/distances` | Calculate walking directions between coordinates. |

Example distance request:

```json
{
  "coords": [
    [-73.9857, 40.7484],
    [-73.9851, 40.7580]
  ]
}
```

## Database

The backend expects a PostgreSQL database with a `users` table. A compatible starting schema is:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);
```

## Quality and Maintenance

- Keep secrets such as database credentials and API keys in `.env` files only.
- Run `npm run lint` in `frontend/` before opening pull requests.
- Add backend tests before expanding the API surface.
- Keep API response shapes consistent across new routes.
- Avoid committing generated dependency folders such as `node_modules/`.

## Roadmap

- Connect the React frontend to the backend API.
- Add authentication flows and session/token handling.
- Add automated backend tests.
- Add database migrations and seed scripts.
- Improve OpenRouteService request validation and error handling.

## License

The backend package currently declares the project license as `ISC`.
