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

- **Display System (`src/display.ts`)** - Complete terminal UI and board rendering
- **Input Handling (`src/input.ts`)** - Keyboard input with WASD/arrow key support
- **Game Controller (`src/index.ts`)** - Main game loop and coordination
- **Comprehensive Tests (`src/__tests__/`)** - 45 tests covering all game mechanics
- **Helper Methods** - Board getters, reset functionality, testing utilities

## What You Need to Implement 🎯

### Core Game Logic (`src/game2048.ts`)

You need to implement **5 key methods**:

#### 1. `moveAndMergeRow(row)` - The Heart of 2048
Slide and merge tiles in a single row/column:
```typescript
// Example: [2, 0, 2, 4] → [4, 4, 0, 0]
// Example: [2, 2, 2, 2] → [4, 4, 0, 0] (merge once per tile!)
```

#### 2. `moveTiles(direction)` - Apply Movement
Handle all four directions (left, right, up, down):
- Process each row/column using `moveAndMergeRow`
- Track score gains from merges
- Return new board state and whether anything moved

#### 3. `makeMove(direction)` - Complete Move Logic
Coordinate a full game move:
- Apply tile movement using `moveTiles`
- Add a new random tile if the board changed
- Check for win condition (2048 reached)
- Return complete move result

#### 4. `checkWin()` - Detect Victory
Check if any cell contains the WIN_TILE (2048)

#### 5. `canMove()` - Detect Game Over (Partial TODO)
Currently only checks for empty cells. You need to add:
- Check for horizontally adjacent mergeable tiles
- Check for vertically adjacent mergeable tiles

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
1. **Start with `moveAndMergeRow()`** - This is the core algorithm
   - Test it thoroughly with the provided tests
   - Handle edge cases: [2,2,2,2] should become [4,4,0,0]
2. **Implement `moveTiles()`** - Apply the row logic to all directions
   - Left/Right: Apply directly to rows
   - Up/Down: Extract columns, apply logic, put back
3. **Complete `makeMove()`** - Tie everything together
4. **Add `checkWin()`** - Simple board scan for 2048
5. **Finish `canMove()`** - Complete the adjacent tile checks

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