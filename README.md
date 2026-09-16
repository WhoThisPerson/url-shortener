# URL Shortener

A full-stack URL shortener built to explore backend architecture, REST APIs, PostgreSQL persistence, automated testing, and Docker-based deployment.

## Current Build Status

![Build Status](https://github.com/WhoThisPerson/url-shortener/actions/workflows/ci-build.yaml/badge.svg)

## Features

* Create shortened URLs from original URLs
* Generate unique short codes
* Redirect shortened URLs to their original destinations
* Track click counts
* View stored URLs in a paginated table
* Copy shortened URLs to the clipboard
* Delete stored URLs
* Persist data with PostgreSQL
* Run frontend, backend, and database services with Docker Compose
* Automated backend testing with Vitest
* Continuous integration with GitHub Actions

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Axios
* Nginx

### Backend

* Node.js
* Express
* TypeScript
* Axios
* Vitest

### Database

* PostgreSQL

### Infrastructure

* Docker
* Docker Compose
* GitHub Actions

## Architecture

The application exposes API operations under `/api/urls` while public shortened links use `/:shortCode`.

```text
POST   /api/urls
GET    /api/urls
DELETE /api/urls/:id
GET    /:shortCode
```

## Project Structure

```text
url-shortener/
├── backend/
│   ├── migrations/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── repositories/
│   │   ├── routes/
│   │   └── services/
│   └── tests/
├── frontend/
│   ├── src/
│   │   └── components/
│   └── Dockerfile
├── common/
├── docker-compose.yml
└── .github/
    └── workflows/
```

## Running the Application

### Prerequisites

* Docker
* Docker Compose

### Start

Clone the repository and start the application:

```bash
git clone https://github.com/[YOUR GITHUB USERNAME]/url-shortener.git
cd url-shortener
docker compose up -d
```

The application will then be available at:

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:3000`

### Stop

```bash
docker compose down -v
```

## Testing

Backend tests use Vitest and are also executed in GitHub Actions.

Run the backend test suite from the backend directory:

```bash
cd backend
npm test
```

The local test environment currently expects PostgreSQL test configuration to be available separately from the primary application database.

## Design Documentation

More detailed architecture, data-model, API, testing, and design-decision documentation is available in [`design.md`](docs/design.md).

## Motivation

This project was created as a practical exercise in building a complete full-stack application while exploring concepts commonly encountered in backend and system design interviews.
