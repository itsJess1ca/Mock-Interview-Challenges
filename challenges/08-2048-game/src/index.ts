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
    // 1. Show instructions
    // 2. Set up input handling
    // 3. Start the game loop
    // 4. Handle cleanup on exit
    this.showInitialState();
    this.input.setup(
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
    this.display.clear();
    this.input.teardown();
    this.game = new Game2048();
    this.isRunning = false;
    this.start();
  }

  private handleQuit(): void {
    this.input.teardown();
    this.display.showGameOverMessage();
    process.exit();
  }

  /**
   * Update the game display
   */
  private updateDisplay(): void {
    // Clear screen and show current game state
    this.display.clear();
    this.display.showGameState(this.game.getGameState());
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
    this.display.showInstructions();
    this.display.showGameState(this.game.getGameState());
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
