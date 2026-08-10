# Scute

Scute is a full-stack campus mapping and route-planning app for the University of Maryland. It uses a React/Vite frontend, an Express backend, and a Python pathfinding service powered by a custom A* implementation.

## Overview

- Interactive map UI with search, login, account creation, and route display
- Campus route generation using a custom A* pathfinding service
- API-backed authentication and user features
- Local development with PostgreSQL
- Production deployment on Render, with Supabase used in production for database hosting

Production app: https://scute.onrender.com

## Requirements

### System requirements

- Node.js 20+ recommended
- Python 3.12+ recommended
- npm
- PostgreSQL for local development
- Build tools required by native Node/Python dependencies, depending on your platform

### Project requirements

Install dependencies separately for each service:

```bash
cd frontend
npm install

cd ../backend
npm install

cd ../pathfinding-service
pip install -r requirements.txt
```

## Setup

1. Configure environment variables for the backend and any frontend API settings required by your local setup.
2. Start PostgreSQL locally.
3. Install dependencies for each service as shown above.
4. Run the services in separate terminals.

If you are looking for the exact environment variable names or service wiring, check the backend source in `backend/server.js` and the frontend API modules under `frontend/src/api/`.

## Running locally

### Frontend

```bash
cd frontend
npm run dev
```

### Backend

```bash
cd backend
npm run dev
```

### Pathfinding service

```bash
cd pathfinding-service
python app.py
```

## Build

The frontend includes a production build step:

```bash
cd frontend
npm run build
```

You can preview the production bundle with:

```bash
npm run preview
```

The backend and pathfinding service do not currently require a separate compile step.

## Usage

Open the app and use the search fields to choose a starting point and destination. The route is calculated and rendered on the map, with start and goal markers plus route details.

Typical flows:

```text
1. Search for a start location
2. Search for an end location
3. Click "Calculate Route"
4. Review the path and route information on the map
```

Additional features include account creation, login, and password reset.

## Tech stack

- Frontend: React, Vite, Leaflet, Tailwind CSS, TanStack Query, Zustand
- Backend: Express, PostgreSQL, JWT/cookie-based auth, rate limiting, email support
- Pathfinding: Python, Flask, NetworkX, Gunicorn

