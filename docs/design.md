# Project Design Document

## 1. Overview
### Problem

URL shorteners provide a way to convert long URLs into shorter, easier-to-share URLs. This project attempts to implement a full-stack URL shortening application. The system design question asked involves understanding and modeling this application so that it is scalable, fault-tolerant, and low-latency.

### Goals
- Allows users to create shortened URLs from original URLs
- Redirects users from shortened URLs to their original destinations
- Persists URL data using PostgreSQL
- Track the number of times each shortened URL is accessed
- Allows users to view and manage their shortened URLs
- Provided a proper UI for viewing all stored URLs

### Non-goals/Nice to haves
- User authentication and account management
- Further advanced analytics beyond click tracking
- Custom user-defined short URLs

## 2. Requirements

### Functional Requirements
- Users can submit a URL that will be shortened and added to the table
- Users can view their URLs stored in a clean table
- Users can delete stored URLs

### Non-functional Requirements

## 3. Use Cases
### Use Case 1: Creating a shortened URL
- User enters a URL in the form to be shortened
- The client sends the URL to the backend
- The server validates the URL and generates a unique short code
- The URL data is stored in PostgreSQL
- The server returns the data to the client
- The client displays the new URL data in the table

### Use Case 2: Resolving a URL
- User attempts to access a shortened URL
- Server locates the corresponding URl using its short code
- Server increments click count of URL
- User is redirected to the original URL

### Use Case 3: Updating table after changes
- User can see all of their URLs in the table
- User attempts to delete a URL
- Table updates the table with the removed URL data

## 4. System Architecture
### Component Responsibilities

#### Frontend

* Provides the user interface
* Submits URLs to the backend
* Displays stored URLs
* Handles pagination
* Sends delete requests
* Provides copy-to-clipboard functionality
* Displays shortened URLs as clickable links

#### Backend

* Exposes REST API endpoints
* Validates incoming URL requests
* Generates short codes
* Handles redirects
* Updates click counts
* Coordinates application logic between controllers, services, and repositories

#### PostgreSQL

* Persists URL records
* Enforces database constraints such as unique short codes
* Stores click counts and creation timestamps

## 5. Data Model
### Database Schema

The application uses a single `urls` table.

| Column         | Type        | Description                     |
| -------------- | ----------- | ------------------------------- |
| `id`           | Integer     | Primary key                     |
| `original_url` | Text        | Original destination URL        |
| `short_code`   | VARCHAR(20) | Unique shortened URL identifier |
| `click_count`  | Integer     | Number of successful redirects  |
| `created_at`   | Timestamp   | Record creation time            |

### Relationships

The current schema contains a single table and therefore does not require relational joins.

### Constraints

* `id` is the primary key
* `short_code` must be unique
* `original_url` cannot be null
* `short_code` cannot be null
* `click_count` cannot be null and defaults to `0`
* `created_at` cannot be null and defaults to the current timestamp

Duplicate original URLs are allowed. Submitting the same destination URL multiple times creates separate records with separate short codes and click counts.

## 6. API Design
### Endpoints

| Method   | Endpoint        | Description                       |
| -------- | --------------- | --------------------------------- |
| `POST`   | `/api/urls`     | Create a shortened URL            |
| `GET`    | `/api/urls`     | Retrieve all stored URLs          |
| `DELETE` | `/api/urls/:id` | Delete a stored URL               |
| `GET`    | `/:shortCode`   | Resolve a short code and redirect |

### Create URL

Request:

```json
{
  "originalUrl": "https://www.google.com"
}
```

Successful response:

```json
{
  "id": 1,
  "originalUrl": "https://www.google.com",
  "shortCode": "abc123",
  "clickCount": 0,
  "createdAt": "2026-09-16T18:00:00.000Z"
}
```

### Resolve Short Code

A request such as:

```text
GET /abc123
```

causes the backend to locate the corresponding URL, increment its click count, and redirect the client to the original destination.

### Error Responses

The API should return appropriate HTTP status codes for invalid requests, missing records, and server/database failures.

## 7. Application Design

### Backend
Follows a layered structure separating routes, controllers, services, and repositories

- Routes define the API endpoints
- Controllers which handle the HTTP requests and responses
- Services that perform application logic
- Repositories that handle the database layer logic
- PostgreSQL databse providing persistent storage

### Frontend
Uses React components to organized by responsibility

### State Management
### Data Flow

## 8. Edge Cases & Failure Handling

### Input

* Invalid URLs should be rejected by the backend
* Missing required input should not be submitted from the frontend
* Duplicate original URLs are allowed

### Database

* Short-code uniqueness is enforced by PostgreSQL
* Database errors should be handled without exposing internal database details to clients

### Network

* Failed frontend requests are caught and logged
* API failures should not cause the frontend to crash

### Concurrency

Short-code generation must account for the possibility of collisions. The database's unique constraint acts as the final enforcement mechanism for short-code uniqueness.

### UI

* Pagination should update when the number of URLs changes
* Deleting the final item on a page should not leave the user on an invalid page
* Long URLs should remain readable without breaking the table layout

## 9. Security

Current security measures include:

* PostgreSQL credentials are supplied through environment variables rather than hardcoded in application source
* Frontend configuration uses Vite environment variables for non-secret configuration such as the backend API URL
* API inputs are validated before database insertion
* External links opened in new tabs use `rel="noopener noreferrer"`

Security features intentionally outside the current scope include authentication, authorization, rate limiting, abuse prevention, and advanced URL safety checks.

## 10. Testing Strategy

### Frontend
- Component behavior testing where appropriate
- User interactions with submission, deletion, and copying present correct behavior

### Backend
- Unit tests to validate URL service logic
- Integration tests to validate API routes
- Use Vitest as the testing framework

## 11. Deployment & Infrastructure
- Docker is used to containerize the application services
- Docker compose is used to orchestrate the frontend, backend, and PostgreSQL services
- PostgreSQL data is persisted within the Docker container
- Environment variables are used to configure database connections

## 12. Design Decisions

### Decision 1: PostgreSQL

PostgreSQL was selected as the persistent database for its relational model, constraints, and suitability for the application's URL records.

### Decision 2: Layered Backend Architecture

Routes, controllers, services, and repositories are separated so that HTTP handling, application logic, and persistence logic remain independently testable and maintainable.

### Decision 3: Short Code as Public Identifier

The shortened URL uses a short code separate from the database primary key. This keeps internal database identifiers independent from the identifier exposed through public URLs.

### Decision 4: Separate API and Redirect Routes

API operations are placed under `/api/urls`, while public short URLs use `/:shortCode`. This keeps administrative/resource operations separate from the public redirect endpoint.

## 13. Risks / Limitations

* There is currently no authentication, so URL records are not associated with individual users
* The application is designed as a small single-instance service rather than a production-scale distributed system
* No rate limiting or abuse prevention is implemented
* Advanced analytics are not supported
* The local development test database workflow is not fully automated
* The current frontend does not automatically synchronize click counts immediately after a redirect

## 14. Future Improvements

* Add user authentication and per-user URL management
* Add custom aliases
* Add URL expiration
* Add advanced click analytics
* Add rate limiting and abuse prevention
* Improve local integration-test environment isolation
* Deploy the application to a public hosting platform
* Add automated frontend component and end-to-end testing
* Explore caching and horizontal scaling for larger workloads
