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
### Architecture Diagram
### Component Responsibilities

## 5. Data Model
### Database Schema
### Relationships
### Constraints

## 6. API Design
### Endpoints
### Request/Response
### Error Responses

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
### Database
### Network
### Concurrency
### UI

## 9. Security

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
### Decision 1
### Decision 2
### Decision 3

## 13. Risks / Limitations


## 14. Future Improvements