# Challenge 8: 2048 Game

**Difficulty:** Medium-Hard
**Estimated Time:** 90-120 minutes
**Skills:** Game logic, algorithms, 2D arrays, state management

## Overview

Implement the core game logic for a terminal-based 2048 game. The display, input handling, and game controller are already provided — you just need to implement the game mechanics!

This challenge tests your ability to:
- Work with 2D arrays and complex game state
- Implement sliding and merging algorithms
- Handle edge cases in game logic
- Write code that passes comprehensive tests

## Getting Started

```bash
cd challenges/08-2048-game
npm install
npm run dev    # Start the game (will error until you implement the core logic)
npm test       # Run tests to see what needs implementation
```

## What's Already Provided ✅

- **Input Handling (`src/input.ts`)** - Complete keyboard input with WASD/arrow key support, raw mode stdin handling
- **Comprehensive Tests (`src/__tests__/`)** - 45 tests covering all game mechanics
- **Type Definitions (`src/types.ts`)** - All TypeScript interfaces and types

## What You Need to Implement 🎯

### 1. Core Game Logic (`src/game2048.ts`)

You need to implement **ALL methods** in the Game2048 class:

#### Board Management
1. **`createEmptyBoard()`** - Create a 4x4 board filled with zeros
2. **`addRandomTile()`** - Add a random tile (2 or 4, with 90%/10% probability)
3. **`getBoard()`** - Return a copy of the current board
4. **`setBoardForTesting()`** - Set board state (already implemented for testing)

#### Core Game Mechanics
5. **`moveAndMergeRow(row)`** - The heart of 2048!
   - Slide and merge tiles in a single row/column
   - Example: `[2, 0, 2, 4] → [4, 4, 0, 0]`
   - **Critical:** `[2, 2, 2, 2] → [4, 4, 0, 0]` (merge once per tile!)

6. **`moveTiles(direction)`** - Apply movement in all directions
   - Handle left, right, up, down
   - Use `moveAndMergeRow` for each row/column
   - Track score gains and board changes

7. **`makeMove(direction)`** - Complete move coordination
   - Apply movement using `moveTiles`
   - Add new random tile if board changed
   - Check win condition
   - Return move result

#### Game State
8. **`canMove()`** - Check if any moves are possible
   - Empty cells exist? OR
   - Adjacent tiles can merge?

9. **`isGameOver()`** - Detect game over
10. **`checkWin()`** - Check for 2048 tile
11. **`getGameState()`** - Return complete game state
12. **`getScore()`** - Return current score
13. **`reset()`** - Reset game to initial state

### 2. Display System (`src/display.ts`)

Implement board rendering and UI messages:

1. **`displayBoard(board)`** - Render the 4x4 board with ASCII art
2. **`displayGameState(gameState)`** - Show board, score, and status
3. **`displayInstructions()`** - Show game rules and controls
4. **`clearScreen()`** - Clear the terminal
5. **Display helper functions** - Cell formatting, separators, colors

### 3. Game Controller (`src/index.ts`)

Implement the GameController class to coordinate everything:

1. **`start()`** - Initialize and start the game
2. **`handleMove(direction)`** - Process player moves
3. **`handleRestart()`** - Reset and restart the game
4. **`handleQuit()`** - Clean exit
5. **`updateDisplay()`** - Refresh the game display
6. **`showInitialState()`** - Display instructions and initial board
7. **`shouldContinue()`** - Check if game should keep running

## Game Rules

- **Objective:** Combine tiles to reach the 2048 tile
- **Board:** 4x4 grid starts with two random tiles (2 or 4)
- **Movement:** Use WASD or arrow keys to slide tiles
- **Merging:** Identical tiles merge when they collide (2+2=4, 4+4=8, etc.)
- **Scoring:** Gain points equal to the value of merged tiles
- **New Tiles:** A new tile (2 or 4) appears after each valid move
- **Win:** Reach the 2048 tile (can continue playing for higher scores)
- **Lose:** No more moves possible (board full with no mergeable tiles)

## Controls

- **W / ↑** : Move Up
- **S / ↓** : Move Down
- **A / ←** : Move Left
- **D / →** : Move Right
- **Q** : Quit game
- **R** : Restart game

## Implementation Tips

### Recommended Order
1. **Start with basic utilities:**
   - `createEmptyBoard()` - Simple 2D array creation
   - `getBoard()` - Return a copy (use `.map()`)
   - `getScore()` - Simple getter

2. **Add random tile logic:**
   - `addRandomTile()` - Find empty cells, place 2 (90%) or 4 (10%)

3. **Build the core algorithm:**
   - `moveAndMergeRow()` - The heart of 2048! Test thoroughly.
   - Handle edge case: `[2,2,2,2] → [4,4,0,0]`

4. **Apply to all directions:**
   - `moveTiles()` - Use `moveAndMergeRow` for all 4 directions
   - Left/Right: Process rows directly
   - Up/Down: Extract columns, process, put back

5. **Complete move logic:**
   - `makeMove()` - Coordinate everything
   - Add random tile after valid moves

6. **Game state checks:**
   - `checkWin()` - Scan for 2048
   - `canMove()` - Empty cells OR adjacent tiles can merge
   - `isGameOver()` - Just call `!canMove()`
   - `getGameState()` - Return complete state object

7. **Polish:**
   - `reset()` - Clear board and start fresh

### Core Algorithm Strategy
The sliding/merging algorithm is the heart of 2048:

```typescript
// For moveAndMergeRow(row):
// 1. Remove zeros (slide tiles together)
//    [2, 0, 2, 4] → [2, 2, 4]
// 2. Merge adjacent identical tiles (left to right, once per tile!)
//    [2, 2, 4] → [4, 4] (score += 4)
// 3. Pad with zeros to maintain row length
//    [4, 4] → [4, 4, 0, 0]
// 4. Return new row and score gained

// Important: [2, 2, 2, 2] → [4, 4, 0, 0] NOT [8, 0, 0, 0]!
```

### Testing Strategy
Run tests frequently to guide your implementation:
```bash
npm test                    # Run all tests
npm test -- game2048.test   # Run only game logic tests
npm test -- --watch         # Watch mode for continuous testing
```

The tests use `setBoardForTesting()` to set specific board states, making it easy to test:
- Known merge scenarios
- All four movement directions
- Win and game-over conditions
- Edge cases

### Common Pitfalls

**Critical: Merge Only Once Per Move**
```typescript
// WRONG: [2, 2, 2, 2] → [4, 4] → [8, 0, 0, 0]
// RIGHT: [2, 2, 2, 2] → [4, 4, 0, 0]
```
Each tile can only participate in ONE merge per move!

**Direction Handling:**
- For left: Apply `moveAndMergeRow()` directly to each row
- For right: Reverse the row, apply logic, reverse back
- For up: Extract column, apply logic, put column back
- For down: Extract and reverse column, apply logic, reverse and put back

**Board Copies:**
- Always work with copies when testing if a move changed the board
- Use `JSON.stringify()` or deep comparison to check equality

**Score Tracking:**
- Score increases by the VALUE of merged tiles (merge 2+2=4, score += 4)
- Track cumulative score across all moves

## Advanced Features (Optional)

If you finish early, consider adding:
- **Undo functionality** - Store previous game states
- **Best score tracking** - Persist high scores to file
- **Animations** - Smooth tile sliding effects
- **Larger boards** - Support 5x5 or 6x6 grids
- **Save/Load** - Persist game state between sessions

## Success Criteria

Your implementation should:
- ✅ Display the board clearly with proper formatting
- ✅ Handle all four movement directions correctly
- ✅ Merge tiles according to 2048 rules
- ✅ Track score accurately
- ✅ Detect win (2048) and lose (no moves) conditions
- ✅ Respond to keyboard input in real-time
- ✅ Pass all provided tests
- ✅ Handle edge cases gracefully
- ✅ Have clean, readable, well-documented code

This challenge demonstrates your ability to implement complex game logic, handle user input, and create an interactive terminal application!