# Challenge 9: Battleship Game

**Difficulty:** Medium
**Estimated Time:** 90-120 minutes
**Skills:** Coordinate systems, game state management, validation logic, turn-based systems

## Overview

Implement a terminal-based two-player Battleship game. This challenge tests your ability to:
- Implement coordinate systems and ship placement validation
- Handle complex game state management with multiple boards
- Design turn-based game logic and state transitions
- Work with 2D arrays and position calculations
- Create robust validation and error handling
- Manage alternating player turns and game flow

## Getting Started

```bash
cd challenges/09-battleship
npm install
npm run dev
```

## What You Need to Implement

### Core Requirements (Essential)

### 1. Ship Management (`src/ship.ts`)
- `place()` - Position ship on board with orientation
- `hit()` - Register hits and check for sinking
- `occupiesPosition()` - Check if ship is at given position
- Position calculation for horizontal/vertical orientations

### 2. Board Logic (`src/board.ts`)
- `placeShip()` - Validate and place ships with adjacency rules
- `attack()` - Process attacks and update cell states
- `validateShipPlacement()` - Check bounds, overlaps, adjacency
- Ship finding and game state tracking

### 3. Game Controller (`src/game.ts`)
- `startGame()` - Initialize boards for both players
- `placePlayerShip()` - Handle ship placement for each player
- `playerAttack()` - Process attacks between players
- Turn management and player switching
- Win/lose condition checking

### 4. Display System (`src/display.ts`)
- `displayBoards()` - Show both player boards (own ships visible, opponent's hidden)
- `displaySetupPhase()` - Ship placement interface for each player
- `displayAttackResult()` - Hit/miss/sunk feedback
- Color-coded cell states and ship visualization
- Clear turn indicators

### 5. Input Handling (`src/input.ts`)
- `parsePosition()` - Convert "A1", "J10" to coordinates
- `parseOrientation()` - Handle "horizontal"/"vertical" input
- Command parsing for placement and attacks
- Player identification and turn validation

### 6. Tests (`src/__tests__/`)
- Ship placement and hit detection
- Board validation and attack processing
- Two-player game flow and state management
- Turn switching and win conditions

## Game Rules

### Setup Phase
- Each player places 5 ships on their 10x10 board:
  - Carrier (5 spaces)
  - Battleship (4 spaces)
  - Cruiser (3 spaces)
  - Submarine (3 spaces)
  - Destroyer (2 spaces)
- Ships cannot overlap or touch (configurable)
- Ships can be placed horizontally or vertically

### Gameplay Phase
- Players alternate turns attacking opponent's board
- Call out coordinates (e.g., "A1", "J10")
- Response: "Hit", "Miss", or "Hit and Sunk"
- Players can only see their own ships, opponent's ships remain hidden
- First player to sink all opponent ships wins

### Turn Management
- Player 1 places all ships, then Player 2 places all ships
- Player 1 attacks first, then players alternate
- Clear indicators show whose turn it is
- Game prevents players from seeing opponent's ship placement

### Controls
```
Setup Phase (for each player):
  place <ship> <position> <orientation>  - Place ship (e.g., "place carrier A1 horizontal")
  remove <ship>                          - Remove placed ship
  auto                                   - Auto-place remaining ships
  ready                                  - Confirm setup and switch to next player/start game

Gameplay:
  attack <position>                      - Attack opponent position (e.g., "attack B5")
  board                                  - Show current board state
  stats                                  - Show game statistics

General:
  help                                   - Show help
  quit                                   - Exit game
```

## Key Algorithms to Implement

### 1. Ship Placement Validation
```typescript
// Check placement validity:
// 1. Ship fits within board boundaries
// 2. No overlap with existing ships
// 3. Adjacency rules (if enabled)
// 4. Calculate all positions ship will occupy
```

### 2. Turn Management System
```typescript
// Track current player and game phase
// Handle transitions between setup and gameplay
// Ensure players can't see opponent's ships
// Validate that only current player can make moves
```

### 3. Board Display Logic
```typescript
// Show own board with ships visible
// Show opponent's board with only hits/misses visible
// Use different symbols for different states
// Clear separation between player views
```

### 4. Attack Processing
```typescript
// 1. Validate attack position
// 2. Check if position contains ship
// 3. If hit: mark ship segment, check if sunk
// 4. Update board display state
// 5. Check win condition
```

## Tips for Success

### Start Simple
1. Implement basic ship placement and hit detection
2. Add simple AI (random attacks) first
3. Build board display and input parsing
4. Add advanced AI strategies last

### Architecture Strategy
- **Strategy Pattern:** Different AI difficulties as interchangeable strategies
- **State Management:** Clear separation between setup and gameplay phases
- **Coordinate System:** Consistent position handling throughout
- **Validation:** Centralized rules for ship placement and attacks

### Common Pitfalls
- **Coordinate confusion:** Mix-up between 0-based arrays and 1-based display
- **Ship orientation:** Incorrect position calculation for vertical ships
- **AI state:** Not tracking hit positions between turns
- **Adjacency rules:** Forgetting to check diagonal neighbors
- **Double attacks:** Not preventing attacks on same position
- **Win detection:** Checking after each attack, not just ship sinks

## Advanced Features (Optional - If Time Permits)

If you finish the core two-player functionality early, consider implementing:

### Priority 1: Enhanced User Experience
- **Ship placement hints** (highlight valid positions)
- **Board coordinates** (row/column headers for easier targeting)
- **Game statistics** (hit percentage, shots fired, time elapsed)
- **Input validation feedback** (clear error messages)

### Priority 2: Additional Features
- **Custom board sizes** (8x8, 12x12)
- **Different ship configurations** (more/fewer ships, different sizes)
- **Undo last ship placement** (during setup phase)
- **Game replay** (show history of all moves)

### Priority 3: Quality of Life
- **Save/load game state** (pause and resume later)
- **Multiple game rounds** (best of 3, tournament mode)
- **Enhanced display** (better ASCII art, colors)

**Focus:** Most candidates should concentrate on delivering a solid two-player experience with robust validation and clear game flow.

## Testing Strategies

### Unit Tests
- Ship placement and hit detection accuracy
- Board validation logic with edge cases
- AI strategy behavior consistency
- Coordinate conversion correctness

### Integration Tests
- Complete two-player game flow from setup to victory
- Player turn alternation and state management
- Error handling for invalid inputs
- Game state transitions between phases

### User Experience Testing
- Clear separation of player views
- Intuitive command interface
- Helpful error messages and feedback
- Game flow feels natural and engaging

## Assessment Criteria

- **Algorithm implementation:** Correct ship placement validation and coordinate systems
- **State management:** Clean handling of game phases, turn progression, and player separation
- **Code organization:** Good use of design patterns and separation of concerns
- **Two-player logic:** Proper turn alternation and information hiding
- **User experience:** Intuitive interface, clear feedback, and helpful error messages
- **Edge case handling:** Robust error handling and input validation
- **Testing coverage:** Comprehensive tests for game mechanics and user flows

This challenge demonstrates your ability to implement complex turn-based game logic with proper state management - skills valuable for game development, interactive applications, and systems requiring careful state coordination!