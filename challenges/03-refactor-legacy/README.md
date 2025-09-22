# Challenge 3: Refactor Legacy Calculator

**Difficulty:** Medium
**Estimated Time:** 60-90 minutes
**Skills:** Code refactoring, design patterns, clean code principles, TypeScript

## Overview

You've inherited a working but poorly written calculator application. Your task is to refactor it while maintaining all existing functionality. This challenge tests your ability to:
- Identify and fix code smells
- Apply clean code principles
- Improve type safety and error handling
- Maintain backward compatibility
- Write better tests

## Getting Started

```bash
cd challenges/03-refactor-legacy
npm install
npm run dev
npm test
```

Try the calculator - it works, but the code is messy!

## Current Problems in the Code

### 1. Code Duplication
- Input validation is repeated in every method
- Similar error handling patterns everywhere
- Logging logic duplicated

### 2. Poor Type Safety
- Uses `any` types everywhere
- Inconsistent input handling
- No proper interfaces or types

### 3. Poor Naming
- Variables like `h`, `m` are unclear
- Method names could be more descriptive
- No clear separation of concerns

### 4. Mixed Responsibilities
- Methods handle validation, computation, logging, and history all together
- Console.log mixed with business logic
- No separation between pure functions and side effects

### 5. Poor Error Handling
- Inconsistent error responses (null vs exceptions)
- Error messages logged directly to console
- No proper error types

## Your Refactoring Tasks

### Phase 1: Type Safety & Interfaces
1. Create proper TypeScript interfaces and types
2. Remove all `any` types
3. Add proper return types to all methods
4. Create error classes for different error types

### Phase 2: Extract Common Logic
1. Create a input validation utility
2. Extract number parsing logic
3. Create a history management system
4. Separate memory operations into its own class

### Phase 3: Improve Architecture
1. Separate pure calculation functions from side effects
2. Create a proper error handling system
3. Implement the calculator using composition
4. Add proper logging abstraction

### Phase 4: Enhance Tests
1. Add tests for the new architecture
2. Test error conditions properly
3. Add integration tests
4. Ensure 100% functionality preservation

## Suggested New Structure

```typescript
interface CalculationResult {
  value: number;
  operation: string;
}

interface CalculatorError {
  type: 'InvalidInput' | 'DivisionByZero' | 'NegativeSquareRoot';
  message: string;
}

class InputValidator {
  // Handle all input validation
}

class HistoryManager {
  // Manage calculation history
}

class MemoryManager {
  // Handle memory operations
}

class MathOperations {
  // Pure calculation functions
}

class Calculator {
  // Orchestrate everything together
}
```

## Requirements

1. **Maintain Functionality**: All existing features must continue to work
2. **Improve Code Quality**: Apply clean code principles
3. **Better Type Safety**: Use TypeScript effectively
4. **Error Handling**: Proper error types and handling
5. **Test Coverage**: Maintain or improve test coverage
6. **Documentation**: Add JSDoc comments for public methods

## Success Criteria

- [ ] All existing tests still pass
- [ ] Code is more readable and maintainable
- [ ] No `any` types (except where absolutely necessary)
- [ ] Proper error handling with custom error types
- [ ] Clear separation of concerns
- [ ] DRY principle applied (no code duplication)
- [ ] Single Responsibility Principle followed
- [ ] Good TypeScript practices demonstrated

## Bonus Points

- Add configuration for decimal precision
- Implement a plugin system for new operations
- Add input/output formatting options
- Create a simple expression parser
- Add unit conversion features

## Tips for Success

1. **Start Small**: Refactor one method at a time
2. **Test Continuously**: Run tests after each change
3. **Keep It Working**: Don't break existing functionality
4. **Think SOLID**: Apply SOLID principles where appropriate
5. **Use TypeScript**: Leverage types for better development experience

## Common Pitfalls

- Trying to refactor everything at once
- Breaking existing functionality
- Over-engineering the solution
- Not running tests frequently enough
- Changing behavior instead of just structure

This challenge simulates real-world refactoring scenarios you'll encounter as a developer!