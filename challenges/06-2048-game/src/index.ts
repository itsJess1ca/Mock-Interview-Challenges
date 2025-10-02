import { Game2048 } from './game2048';
import { displayGameState, displayInstructions, clearScreen, displayWinMessage, displayGameOverMessage } from './display';
import { setupInput, enableRawMode, disableRawMode, keyToDirection, isSpecialCommand } from './input';
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
    // 1. Show instructions
    // 2. Set up input handling
    // 3. Start the game loop
    // 4. Handle cleanup on exit
    displayInstructions()
    setupInput(
      this.handleMove,
      this.handleQuit,
      this.handleRestart
    );
  }

  /**
   * Handle player move
   */
  private handleMove(direction: Direction): void {
    // TODO: Implement this function
    // 1. Make the move
    // 2. Update display
    // 3. Check for win/game over conditions
    throw new Error('Not implemented');
  }

  /**
   * Handle game restart
   */
  private handleRestart(): void {
    // TODO: Implement this function
    // Reset the game and update display
    this.game = new Game2048();
    this.isRunning = false;
    this.start();
  }

  /**
   * Handle game quit
   */
  private handleQuit(): void {
    // TODO: Implement this function
    // Clean up and exit
    displayGameOverMessage();
    process.exit();
  }

  /**
   * Update the game display
   */
  private updateDisplay(): void {
    // TODO: Implement this function
    // Clear screen and show current game state
    throw new Error('Not implemented');
  }

  /**
   * Handle key input
   */
  private handleInput(key: string): void {
    // TODO: Implement this function
    // Process keyboard input and call appropriate handlers
    // 1. Check for special commands (quit/restart)
    // 2. Convert key to direction
    // 3. Handle move if valid direction
    throw new Error('Not implemented');
  }

  /**
   * Check if the game should continue running
   */
  private shouldContinue(): boolean {
    return this.isRunning;
  }

  /**
   * Display initial game state
   */
  private showInitialState(): void {
    // TODO: Implement this function
    // Show instructions and initial board
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
  disableRawMode();
  console.log('\n👋 Thanks for playing 2048!');
  process.exit(0);
});

process.on('SIGTERM', () => {
  disableRawMode();
  process.exit(0);
});

// Start the game if this file is run directly
if (require.main === module) {
  main();
}
