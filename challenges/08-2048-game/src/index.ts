import { Game2048 } from './game2048';
import {
  displayGameState,
  displayInstructions,
  clearScreen,
  displayWinMessage,
  displayGameOverMessage,
  displayBoard,
} from './display';
import { setupInput, teardownInput, enableRawMode, disableRawMode, keyToDirection, isSpecialCommand } from './input';
import { Direction } from './types';

class GameController {
  private game: Game2048;
  private isRunning: boolean;

  constructor() {
    this.game = new Game2048();
    this.isRunning = false;
  }

  /**
   * Start the game
   */
  start(): void {
    // TODO: Implement this function
    // 1. Show initial game state (instructions + board)
    // 2. Set up input handling with callbacks for move, quit, restart
    throw new Error('Not implemented');
  }

  /**
   * Handle player move
   */
  private handleMove(direction: Direction): void {
    // TODO: Implement this function
    // 1. Call game.makeMove with the direction
    // 2. Update the display to show new board state
    throw new Error('Not implemented');
  }

  private handleRestart(): void {
    // TODO: Implement this function
    // 1. Clear the screen
    // 2. Teardown input handling
    // 3. Create a new game instance
    // 4. Restart the game
    throw new Error('Not implemented');
  }

  private handleQuit(): void {
    // TODO: Implement this function
    // 1. Teardown input handling
    // 2. Display game over message
    // 3. Exit the process
    throw new Error('Not implemented');
  }

  /**
   * Update the game display
   */
  private updateDisplay(): void {
    // TODO: Implement this function
    // 1. Clear the screen
    // 2. Get current game state from game
    // 3. Display the game state
    throw new Error('Not implemented');
  }

  /**
   * Check if the game should continue running
   */
  private shouldContinue(): boolean {
    // TODO: Implement this function
    // Return whether the game should continue running
    throw new Error('Not implemented');
  }

  /**
   * Display initial game state
   */
  private showInitialState(): void {
    // TODO: Implement this function
    // 1. Display game instructions
    // 2. Display initial game state (board with 2 random tiles)
    throw new Error('Not implemented');
  }
}

/**
 * Main entry point
 */
function main(): void {
  const controller = new GameController();
  controller.start();
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  teardownInput();
  console.log('\n👋 Thanks for playing 2048!');
  process.exit(0);
});

process.on('SIGTERM', () => {
  teardownInput();
  process.exit(0);
});

// Start the game if this file is run directly
if (require.main === module) {
  main();
}
