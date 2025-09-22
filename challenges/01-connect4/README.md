# Challenge 1: Connect 4 Game

**Difficulty:** Medium
**Estimated Time:** 45-90 minutes
**Skills:** Game logic, algorithms, win detection, OOP

## Overview

Implement a terminal-based Connect 4 game. This challenge tests your ability to:
- Work with 2D arrays and game state
- Implement game logic and validation
- Design clean, modular code
- Handle user input and display

## Getting Started

```bash
cd challenges/01-connect4
npm install
npm run dev
```

## What You Need to Implement

1. **Board Creation** (`src/connect4.ts`)
   - `createEmptyBoard()` - Create a 6x7 board filled with null values

2. **Game Logic** (`src/connect4.ts`)
   - `makeMove()` - Handle player moves and validation
   - `isValidColumn()` - Validate column input (1-7)
   - `findLowestAvailableRow()` - Find where a piece will land
   - `checkWin()` - Detect win conditions after each move
   - `checkDirection()` - Check for 4 in a row in any direction

3. **Display** (`src/display.ts`)
   - `displayBoard()` - Show the current board state in ASCII format

4. **Game Loop** (`src/index.ts`)
   - `playRound()` - Main game loop logic

5. **Tests** (`src/__tests__/connect4.test.ts`)
   - Add comprehensive tests for your implementation

## Game Rules

- Connect 4 is played on a 6x7 grid
- Players take turns dropping pieces into columns (1-7)
- The first player to get 4 pieces in a row wins (horizontal, vertical, diagonal)
- If the board fills up with no winner, it's a tie

## Tips for Success

- Start with board creation and display - get something visual working first
- Implement move validation before win detection
- Test each component as you build it
- Consider edge cases: full columns, invalid input, boundary conditions
- Break down the win detection into smaller, testable functions

## Common Pitfalls

- Not handling column bounds (1-7 vs 0-6 indexing)
- Forgetting to check if a column is full before placing a piece
- Win detection bugs in diagonal checking
- Not switching players after valid moves

This challenge helps demonstrate your problem-solving approach and code organization skills!