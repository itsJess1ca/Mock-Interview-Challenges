# Challenge 6: 2048 Game

**Difficulty:** Medium-Hard
**Estimated Time:** 60-120 minutes
**Skills:** Game logic, algorithms, 2D arrays, state management, input handling

## Overview

Implement a terminal-based 2048 game. This challenge tests your ability to:
- Work with 2D arrays and complex game state
- Implement sliding and merging algorithms
- Handle real-time keyboard input
- Design clean, modular code architecture
- Create comprehensive test coverage

## Getting Started

```bash
cd challenges/06-2048-game
npm install
npm run dev
```

## What You Need to Implement

### 1. Core Game Logic (`src/game2048.ts`)

**Board Management:**
- `createEmptyBoard()` - (Private) Create a 4x4 board filled with empty cells (0)
- `addRandomTile()` - Add a random tile (2 or 4) to an empty cell
- `getEmptyCells()` - Find all empty positions on the board
- `boardsEqual()` - Compare two boards for equality

**Move Logic:**
- `makeMove(direction)` - Process a move in the given direction
- `moveTiles(direction)` - Core sliding and merging logic
- `moveAndMergeRow(row)` - Slide and merge a single row/column

**Game State:**
- `canMove()` - Check if any valid moves are available
- `isGameOver()` - Determine if the game has ended
- `checkWin()` - Check if the player has reached 2048
- `getGameState()` - Return current game state
- `reset()` - Reset game to initial state
- `getScore()` - Get the current score
- `getBoard()` - Get a copy of the current board
- `setBoardForTesting()` - Set board state (useful for testing)

### 2. Display System (`src/display.ts`)

**Board Display:**
- `displayBoard(board)` - Show the board in ASCII format with borders
- `formatCellValue(value)` - Format cell values for consistent display
- `displayGameState(gameState)` - Show board, score, and status

**UI Messages:**
- `displayInstructions()` - Show game rules and controls
- `displayWinMessage()` - Congratulate player on reaching 2048
- `displayGameOverMessage()` - Show game over message
- `clearScreen()` - Clear the terminal display
- `getTileDisplay()` - Get visual representation of a tile
- `displaySeparator()` - Helper for board display borders

### 3. Input Handling (`src/input.ts`)

**Keyboard Input:**
- `setupInput()` - Configure keyboard listeners
- `keyToDirection()` - Map keys (WASD/arrows) to directions
- `isSpecialCommand()` - Handle quit (Q) and restart (R) commands
- `enableRawMode()` / `disableRawMode()` - Terminal raw mode control
- `handleCtrlC()` - Detect Ctrl+C gracefully
- `parseEscapeSequence()` - Handle multi-character key sequences

### 4. Game Controller (`src/index.ts`)

**Game Flow:**
- `start()` - Initialize and start the game loop
- `handleMove()` - Process player moves and update display
- `handleRestart()` - Reset game state
- `handleQuit()` - Clean exit with proper cleanup
- `updateDisplay()` - Refresh the game display
- `shouldContinue()` - Check if game should keep running
- `showInitialState()` - Display instructions and initial board

### 5. Comprehensive Tests (`src/__tests__/`)

Write tests for all core functionality:
- Game logic (board creation, moves, merging)
- Win/lose conditions
- Input validation
- Display functions
- Edge cases and error handling

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

### Start Small
1. Begin with `createEmptyBoard()` and `displayBoard()`
2. Get basic board display working first
3. Implement `addRandomTile()` and test tile placement
4. Build the move logic incrementally

### Core Algorithm Strategy
The sliding/merging algorithm is the heart of 2048:

```typescript
// For each row/column:
// 1. Remove zeros (slide tiles together)
// 2. Merge adjacent identical tiles (left to right)
// 3. Remove zeros again
// 4. Pad with zeros to maintain row length

// Example: [2, 0, 2, 4] → [2, 2, 4, 0] → [4, 4, 0, 0] → [8, 0, 0, 0]
```

### Testing Strategy
- Test with known board states
- Verify moves don't change immovable boards
- Test edge cases (full board, single tile, etc.)
- Mock `Math.random()` for predictable tile placement

### Common Pitfalls

**Move Logic:**
- Forgetting to handle multiple merges in one move
- Not preventing double-merging (a tile can only merge once per move)
- Incorrect handling of empty spaces during sliding

**Game State:**
- Not checking for available moves correctly
- Missing win condition checks
- Forgetting to add new tiles after valid moves

**Input Handling:**
- Not properly cleaning up input listeners
- Handling terminal raw mode incorrectly
- Missing edge cases in key mapping

**Board Management:**
- Mutating the original board instead of creating copies
- Index out of bounds errors
- Not handling empty board edge cases

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