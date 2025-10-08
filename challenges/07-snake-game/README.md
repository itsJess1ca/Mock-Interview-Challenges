# Challenge 7: Snake Game

**Difficulty:** Medium-Hard
**Estimated Time:** 75-105 minutes
**Skills:** Real-time game logic, collision detection, dynamic data structures, input handling

## Overview

Implement a terminal-based Snake game with real-time controls. This challenge tests your ability to:
- Handle real-time input and game loops
- Implement collision detection algorithms
- Manage dynamic data structures (growing snake)
- Design game state management systems
- Work with timers and frame-based updates

## Getting Started

```bash
cd challenges/07-snake-game
npm install
npm run dev
```

## What You Need to Implement

### 1. Snake Class (`src/snake.ts`)
- `move()` - Move snake one step in current direction
- `setDirection()` - Change direction with validation (no reversing)
- `grow()` - Add segments to snake body
- `checkSelfCollision()` - Detect if snake hits itself
- `occupiesPosition()` - Check if snake is at given position

### 2. Game Logic (`src/game.ts`)
- `update()` - Main game update loop for each frame
- `checkCollisions()` - Detect wall, self, and food collisions
- `spawnFood()` - Place food at random valid positions
- `handleFoodConsumption()` - Process when snake eats food
- `updateLevel()` - Level progression and speed increases

### 3. Display System (`src/display.ts`)
- `displayBoard()` - Render current game state in ASCII
- `createBoardMatrix()` - Build 2D representation of game
- `displayFrame()` - Complete frame rendering with stats
- `clearScreen()` - Cross-platform screen clearing

### 4. Input Handling (`src/input.ts`)
- `setupRawMode()` - Enable real-time keystroke capture
- `onDirectionChange()` - Handle arrow keys and WASD
- `mapKeyToDirection()` - Convert input to game directions
- `getGameSettings()` - Interactive settings configuration

### 5. Game Controller (`src/index.ts`)
- `runGameLoop()` - Main game loop with timing
- `startGameTimer()` - Frame-based update scheduling
- `handleDirectionChange()` - Process direction input
- `handlePause()` - Pause/resume functionality

### 6. Tests (`src/__tests__/`)
- Comprehensive test coverage for game mechanics

## Game Rules

### Basic Mechanics
- Control snake with arrow keys or WASD
- Eat food (♦) to grow and increase score
- Avoid hitting walls (if enabled) or your own tail
- Game speed increases as you progress

### Scoring System
- Normal food: Base points
- Special food (★): Bonus points
- Speed bonus: Extra points for higher levels
- High score persistence

### Difficulty Levels
- **Easy:** Slow speed, forgiving collision
- **Medium:** Normal speed and mechanics
- **Hard:** Fast speed, immediate collision
- **Insane:** Very fast, maximum challenge

### Board Sizes
- **Small:** 15x15 grid
- **Medium:** 20x20 grid
- **Large:** 30x20 grid

### Controls
- **Arrow Keys / WASD:** Move snake
- **P:** Pause/Resume
- **R:** Restart game
- **Q:** Quit
- **H:** Help

## Key Algorithms to Implement

### 1. Snake Movement Algorithm
```typescript
// Each frame:
// 1. Calculate new head position based on direction
// 2. Add new head to front of body array
// 3. If not growing, remove tail from back of array
// 4. Check for collisions with new head position
```

### 2. Collision Detection
```typescript
// Check multiple collision types:
// - Wall collision (boundaries or enabled walls)
// - Self collision (head touches body)
// - Food collision (head touches food position)
```

### 3. Food Spawning Algorithm
```typescript
// Find valid food position:
// 1. Generate random coordinates within board
// 2. Check if position is occupied by snake
// 3. Check if position conflicts with existing food
// 4. Retry until valid position found
```

### 4. Real-time Input Handling
```typescript
// Setup raw mode for immediate key capture
// Map physical keys to game actions
// Queue direction changes between updates
// Handle special keys (pause, quit, etc.)
```

## Tips for Success

### Start Simple
1. Implement basic snake movement first
2. Add simple collision detection (boundaries only)
3. Implement food spawning and consumption
4. Add real-time input handling last

### Game Loop Design
- Separate input handling from game updates
- Use consistent frame timing (e.g., 100-500ms per frame)
- Handle pause state properly in all systems
- Ensure smooth gameplay at different speeds

### Common Pitfalls
- **Input lag:** Process inputs immediately, apply on next update
- **Collision timing:** Check collisions before updating display
- **Direction reversal:** Prevent snake from reversing into itself
- **Food placement:** Ensure food never spawns on snake
- **Boundary handling:** Decide wrap-around vs wall collision behavior
- **Timer cleanup:** Always clear intervals on game end

## Advanced Features (Optional)

If you finish early, consider adding:
- **AI Snake:** Computer opponent with pathfinding
- **Power-ups:** Temporary speed boost, score multiplier, etc.
- **Obstacles:** Static walls or moving barriers
- **Multiplayer:** Two snakes on same board
- **Sound effects:** ASCII "sounds" or terminal bell
- **Replay system:** Save and replay best games

## Testing Strategies

### Unit Tests
- Snake movement in all directions
- Growth mechanics with multiple segments
- Collision detection accuracy
- Direction change validation

### Integration Tests
- Complete game flow from start to end
- Food consumption and scoring
- Level progression
- Game state transitions

### Manual Testing
- Play at different speeds and difficulties
- Test pause/resume functionality
- Verify score calculation accuracy
- Check edge cases (filling entire board)

## Assessment Criteria

- **Real-time handling:** Smooth gameplay without lag or stuttering
- **Collision accuracy:** Precise detection of all collision types
- **Code organization:** Clean separation between game logic and display
- **Input responsiveness:** Immediate response to user controls
- **Edge case handling:** Boundary conditions, invalid states
- **Game balance:** Appropriate difficulty progression
- **User experience:** Clear feedback, intuitive controls

This challenge demonstrates your ability to create interactive real-time applications with complex state management - skills essential for game development and responsive user interfaces!