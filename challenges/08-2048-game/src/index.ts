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
    // 1. Show instructions
    // 2. Set up input handling
    // 3. Start the game loop
    // 4. Handle cleanup on exit
    this.showInitialState()
    setupInput(
      this.handleMove.bind(this),
      this.handleQuit.bind(this),
      this.handleRestart.bind(this)
    );
  }

  /**
   * Handle player move
   */
  private handleMove(direction: Direction): void {
    this.game.makeMove(direction);
    this.updateDisplay();
  }

  private handleRestart(): void {
    clearScreen();
    teardownInput();
    this.game = new Game2048();
    this.isRunning = false;
    this.start();
  }

  private handleQuit(): void {
    teardownInput();
    displayGameOverMessage();
    process.exit();
  }

  /**
   * Update the game display
   */
  private updateDisplay(): void {
    // Clear screen and show current game state
    clearScreen();
    displayGameState(this.game.getGameState());
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
    displayInstructions();
    displayGameState(this.game.getGameState());
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
