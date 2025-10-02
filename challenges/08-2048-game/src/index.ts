import { Game2048 } from './game2048';
import { DisplayManager } from './display';
import { InputHandler } from './input';
import { Direction } from './types';

class GameController {
  private game: Game2048;
  private display: DisplayManager;
  private input: InputHandler;
  private isRunning: boolean;

  constructor() {
    this.game = new Game2048();
    this.display = new DisplayManager();
    this.input = new InputHandler();
    this.isRunning = false;
  }

  /**
   * Start the game
   */
  start(): void {
    // TODO: Implement this function
    // 1. Show initial game state using showInitialState()
    // 2. Set up input handling: this.input.setup(callbacks...)
    //    - Pass handleMove, handleQuit, handleRestart as callbacks
    //    - Remember to bind them: this.handleMove.bind(this)
    throw new Error('Not implemented');
  }

  /**
   * Handle player move
   */
  private handleMove(direction: Direction): void {
    // TODO: Implement this function
    // 1. Call this.game.makeMove(direction)
    // 2. Call this.updateDisplay() to refresh the screen
    throw new Error('Not implemented');
  }

  private handleRestart(): void {
    // TODO: Implement this function
    // 1. Call this.display.clear()
    // 2. Call this.input.teardown()
    // 3. Create new Game2048 instance: this.game = new Game2048()
    // 4. Set this.isRunning = false
    // 5. Call this.start() to restart
    throw new Error('Not implemented');
  }

  private handleQuit(): void {
    // TODO: Implement this function
    // 1. Call this.input.teardown()
    // 2. Call this.display.showGameOverMessage()
    // 3. Call process.exit()
    throw new Error('Not implemented');
  }

  /**
   * Update the game display
   */
  private updateDisplay(): void {
    // TODO: Implement this function
    // 1. Call this.display.clear()
    // 2. Get game state: this.game.getGameState()
    // 3. Call this.display.showGameState(gameState)
    throw new Error('Not implemented');
  }

  /**
   * Check if the game should continue running
   */
  private shouldContinue(): boolean {
    // TODO: Implement this function
    // Return this.isRunning
    throw new Error('Not implemented');
  }

  /**
   * Display initial game state
   */
  private showInitialState(): void {
    // TODO: Implement this function
    // 1. Call this.display.showInstructions()
    // 2. Get game state and call this.display.showGameState(...)
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
const input = new InputHandler();
process.on('SIGINT', () => {
  input.teardown();
  console.log('\n👋 Thanks for playing 2048!');
  process.exit(0);
});

process.on('SIGTERM', () => {
  input.teardown();
  process.exit(0);
});

// Start the game if this file is run directly
if (require.main === module) {
  main();
}
