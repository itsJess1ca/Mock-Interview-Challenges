# Challenge 4: Library REST API

**Difficulty:** Medium-Hard
**Estimated Time:** 90-120 minutes
**Skills:** REST APIs, Express.js, middleware, validation, testing

## Overview

Build a REST API for a simple library management system. This challenge tests your ability to:
- Design RESTful endpoints
- Handle HTTP methods and status codes
- Implement middleware for validation and error handling
- Work with request/response patterns
- Write API tests

## Getting Started

```bash
cd challenges/04-rest-api
npm install
npm run dev
```

## What You Need to Build

### API Endpoints

**Books**
- `GET /api/books` - List all books (with pagination)
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

**Authors**
- `GET /api/authors` - List all authors
- `GET /api/authors/:id` - Get author with their books
- `POST /api/authors` - Create a new author

**Search & Filter**
- `GET /api/books?search=title` - Search books by title/author
- `GET /api/books?genre=fiction` - Filter by genre
- `GET /api/books?available=true` - Filter by availability

### Data Models

```typescript
interface Book {
  id: number;
  title: string;
  authorId: number;
  genre: string;
  publishedYear: number;
  isbn: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Author {
  id: number;
  name: string;
  bio?: string;
  birthYear?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## Requirements

1. **Proper HTTP Status Codes**: 200, 201, 400, 404, 500
2. **Input Validation**: Validate all POST/PUT requests
3. **Error Handling**: Consistent error response format
4. **Middleware**: Logging, CORS, body parsing
5. **Tests**: API endpoint tests with supertest
6. **Documentation**: Clear API documentation

## Files to Implement

- `src/index.ts` - Express app setup and server
- `src/models/` - Data models and in-memory storage
- `src/routes/` - API route handlers
- `src/middleware/` - Custom middleware
- `src/__tests__/` - API tests

This challenge demonstrates full-stack API development skills!