# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo containing 5 TypeScript interview challenges for junior developers:
1. Connect 4 Game (game logic, algorithms)
2. Todo CLI with Persistence (file I/O, CRUD operations)
3. Refactor Legacy Calculator (code quality, clean code)
4. Library REST API (Express.js, middleware, validation)
5. Sales Data Processing (data transformation, aggregation)

## Project Structure

```
typescript-interview-challenges/
├── challenges/
│   ├── 01-connect4/
│   ├── 02-todo-cli/
│   ├── 03-refactor-legacy/
│   ├── 04-rest-api/
│   └── 05-data-processing/
├── package.json (workspace root)
├── README.md
└── CLAUDE.md (this file)
```

## Development Commands

### Root Level (All Challenges)
- `npm run install:all` - Install dependencies for all challenges
- `npm run build:all` - Build all challenges
- `npm run test:all` - Run tests for all challenges
- `npm run lint:all` - Lint all challenges
- `npm run format:all` - Format all challenges

### Individual Challenge Commands
Navigate to any challenge directory (e.g., `cd challenges/01-connect4`) and run:
- `npm run dev` - Run in development mode with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run compiled JavaScript
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier

### Running Single Tests
```bash
# Run specific test file
npm test -- connect4.test.ts

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## TypeScript Configuration

Each challenge has its own `tsconfig.json` with these settings:
- Target: ES2020
- Module: CommonJS
- Strict mode enabled
- Output directory: `./dist`
- Source maps enabled

## Testing Framework

- **Test Runner:** Jest with ts-jest preset
- **Test Location:** `src/__tests__/` in each challenge
- **Test Pattern:** `**/*.test.ts`
- **Coverage:** Enabled for `src/**/*.ts` files

## Code Quality Tools

- **Linter:** ESLint with TypeScript plugin
- **Formatter:** Prettier
- **Pre-commit:** Not configured (can be added if needed)

## Dependencies

### Shared Dev Dependencies (Root)
- TypeScript 5.x
- Jest 29.x with ts-jest
- ESLint with TypeScript support
- Prettier
- ts-node

### Challenge-Specific Dependencies
- **04-rest-api:** Express.js, supertest for API testing
- **05-data-processing:** csv-parser for CSV handling
- Others use only Node.js built-ins

## Architecture Notes

### Challenge Patterns
Each challenge follows consistent patterns:
- `src/types.ts` - TypeScript interfaces and types
- `src/index.ts` - Main entry point
- `src/__tests__/` - Jest test files
- Challenges 1-3 are incomplete starter templates
- Challenges 4-5 may have additional structure for REST APIs and data processing

### Code Organization
- **01-connect4:** Class-based game logic with separate display/input modules
- **02-todo-cli:** Service-layer architecture with storage abstraction
- **03-refactor-legacy:** Legacy code requiring refactoring (intentionally poor quality)
- **04-rest-api:** Express.js REST API structure
- **05-data-processing:** Functional data transformation approach

## Common Issues & Solutions

### TypeScript Errors
- If seeing "Cannot find name console" errors, ensure `tsconfig.json` includes `"lib": ["ES2020"]` or add `"DOM"` if needed
- For Node.js types, ensure `@types/node` is installed

### Testing Issues
- Tests run with Jest using ts-jest preset
- Mock implementations should be in `__tests__` directories
- Use `jest.spyOn(console, 'log').mockImplementation()` to suppress console output in tests

### Workspace Issues
- Run `npm run install:all` from root to install all workspace dependencies
- Each challenge is independent but shares root dev dependencies

## Interview Usage

This repository is designed for technical interviews:
- Each challenge takes 45-120 minutes
- Challenges test different skills (algorithms, APIs, refactoring, etc.)
- Candidates should work in one challenge directory at a time
- Interviewers can choose challenges based on role requirements

## Maintenance Notes

- Keep all challenges using the same TypeScript/Jest versions
- Update shared dev dependencies at the root level
- Test all challenges after dependency updates
- Ensure each challenge README is up-to-date with current requirements