## Overview

An interactive map routing application localized to the University of Maryland protected through auth. Custom user auth includes: account creation, login, logout, reset password, account deletion, profile management.

User auth stack:
 - JWT tokens stored in cookies
 - To be announced

https://scute.onrender.com

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

- Frontend: React, Vite, Tailwind CSS
- Backend: Express, PostgreSQL
- Pathfinding: Python, Flask
