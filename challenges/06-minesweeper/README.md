# Challenge 6: Minesweeper Game

**Difficulty:** Medium
**Estimated Time:** 60-90 minutes
**Skills:** Recursive algorithms, flood-fill, game state management, probability

## Overview

Implement a terminal-based Minesweeper game. This challenge tests your ability to:
- Implement recursive flood-fill algorithms
- Manage complex game state with multiple conditions
- Handle random generation with constraints
- Design clean, modular code architecture
- Work with 2D arrays and neighbor calculations

## Getting Started

```bash
cd challenges/06-minesweeper
npm install
npm run dev
```

## What You Need to Implement

### 1. Core Game Logic (`src/minesweeper.ts`)
- `createEmptyBoard()` - Initialize the game board
- `placeMines()` - Randomly place mines avoiding first click area
- `calculateNeighborCounts()` - Calculate mine counts for each cell
- `revealCell()` - Handle cell revelation with flood-fill
- `floodFillReveal()` - Recursive algorithm for revealing connected empty cells
- `toggleFlag()` - Flag/unflag cells
- `checkWinCondition()` - Detect when player has won

### 2. Display System (`src/display.ts`)
- `displayBoard()` - Show current board state with proper symbols
- `getCellDisplay()` - Determine what symbol to show for each cell
- `displayGameStats()` - Show remaining mines, time, progress
- `displayGameOver()` - Handle win/loss display

### 3. Input Handling (`src/input.ts`)
- `parseCommand()` - Parse user commands (reveal, flag, etc.)
- `getDifficulty()` - Get difficulty selection from user

### 4. Game Controller (`src/index.ts`)
- `playGame()` - Main game loop
- `handleRevealCommand()` - Process reveal commands
- `handleFlagCommand()` - Process flag commands
- `setupNewGame()` - Initialize new games

### 5. Tests (`src/__tests__/minesweeper.test.ts`)
- Comprehensive test coverage for all game mechanics

## Game Rules

### Basic Mechanics
- Click cells to reveal them
- Numbers show how many mines are adjacent (1-8)
- Flag cells you suspect contain mines
- First click is always safe (no mine)
- Game ends when you click a mine (lose) or reveal all non-mine cells (win)

### Difficulty Levels
- **Beginner:** 9x9 board, 10 mines
- **Intermediate:** 16x16 board, 40 mines
- **Expert:** 16x30 board, 99 mines

### Controls
- `r <row> <col>` - Reveal cell (e.g., "r 3 5")
- `f <row> <col>` - Toggle flag (e.g., "f 3 5")
- `n` - New game
- `h` - Help
- `q` - Quit

## Key Algorithms to Implement

### 1. Mine Placement Algorithm
```typescript
// Ensure first click and its neighbors are safe
// Randomly distribute mines across remaining cells
// Validate mine count matches difficulty setting
```

### 2. Flood Fill Algorithm
```typescript
// When clicking empty cell (0 neighbors):
// 1. Reveal current cell
// 2. For each unrevealed neighbor:
//    - If also empty, recursively flood fill
//    - If numbered, reveal but don't continue
```

### 3. Neighbor Counting
```typescript
// For each non-mine cell:
// Count mines in all 8 adjacent directions
// Handle board boundaries correctly
```

### 4. Win Detection
```typescript
// Win when: revealedCells + mineCount === totalCells
// Alternative: all mines flagged AND all non-mines revealed
```

## Tips for Success

### Start Simple
1. Get basic board creation and display working first
2. Implement single cell reveal before flood fill
3. Add mine placement after basic mechanics work
4. Implement flood fill as the final complex algorithm

### Debugging Strategies
- Create a debug mode that shows all mine locations
- Test with small board sizes first (3x3 with 1-2 mines)
- Unit test individual algorithms before integration
- Verify neighbor calculations with known board states

### Common Pitfalls
- **Infinite recursion** in flood fill (check bounds and already-revealed cells)
- **Off-by-one errors** in neighbor calculations at board edges
- **First click mine** (ensure first move area is always safe)
- **Flag counting** (don't allow more flags than mines)
- **Win condition** (make sure it triggers correctly)

## Advanced Features (Optional)

If you finish early, consider implementing:
- **Timer** with elapsed time display
- **High scores** persistence to file
- **Custom difficulty** (user-defined board size and mine count)
- **Hint system** (suggest next safe move)
- **Auto-reveal** (when flagged mines around a number equal the number)

## Assessment Criteria

- **Algorithm implementation:** Correct flood-fill and neighbor counting
- **Edge case handling:** Bounds checking, invalid inputs, game states
- **Code organization:** Clean separation of concerns, modular design
- **Game state management:** Proper tracking of revealed/flagged cells
- **User experience:** Clear display, intuitive controls, helpful feedback
- **Testing coverage:** Comprehensive tests for core game mechanics

This challenge demonstrates your ability to implement classic algorithms while managing complex game state - essential skills for any software engineering role!