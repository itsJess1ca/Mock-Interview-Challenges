import { SnakeGame } from './game';
import { GameDisplay } from './display';
import { InputHandler } from './input';
import { Direction, GameState } from './types';

class GameController {
  private game: SnakeGame;
  private display: GameDisplay;
  private input: InputHandler;
  private gameLoop: NodeJS.Timeout | null;
  private isRunning: boolean;

  constructor() {
    this.game = new SnakeGame();
    this.display = new GameDisplay();
    this.input = new InputHandler();
    this.gameLoop = null;
    this.isRunning = false;
  }

  public async startApplication(): Promise<void> {
    this.display.displayWelcome();
    this.display.displayHelp();

    let playAgain = true;
    while (playAgain) {
      await this.setupGame();
      await this.runGameLoop();
      playAgain = await this.askPlayAgain();
    }

    this.cleanup();
    console.log('Thanks for playing Snake! 🐍');
  }

  private async setupGame(): Promise<void> {
    // TODO: Setup a new game
    // 1. Get game settings from user
    // 2. Create new game instance with settings
    // 3. Setup input handlers
    // 4. Display initial game state
    throw new Error('Method not implemented');
  }

  private setupInputHandlers(): void {
    // TODO: Setup all input event handlers
    // 1. Direction change handlers
    // 2. Pause/resume handler
    // 3. Restart handler
    // 4. Quit handler
    // 5. Help handler
    throw new Error('Method not implemented');
  }

  private async runGameLoop(): Promise<void> {
    // TODO: Main game loop
    // 1. Start the game
    // 2. Enable real-time input
    // 3. Start game update timer
    // 4. Continue until game ends
    // 5. Handle game over
    throw new Error('Method not implemented');
  }

  private startGameTimer(): void {
    // TODO: Start the main game timer
    // 1. Calculate update interval based on game speed
    // 2. Set up interval that calls updateGame()
    // 3. Store timer reference for cleanup
    throw new Error('Method not implemented');
  }

  private updateGame(): void {
    // TODO: Update game state each frame
    // 1. Check if game is in playing state
    // 2. Call game.update()
    // 3. Handle update result
    // 4. Refresh display
    // 5. Check for game over conditions
    throw new Error('Method not implemented');
  }

  private handleGameOver(): void {
    // TODO: Handle game over state
    // 1. Stop game timer
    // 2. Display game over screen
    // 3. Show final statistics
    // 4. Disable real-time input
    throw new Error('Method not implemented');
  }

  private handleDirectionChange(direction: Direction): void {
    // TODO: Handle direction change input
    // 1. Validate game is in playing state
    // 2. Try to change snake direction
    // 3. Provide feedback if change fails
    throw new Error('Method not implemented');
  }

  private handlePause(): void {
    // TODO: Handle pause/resume toggle
    // 1. Check current game state
    // 2. Toggle between playing and paused
    // 3. Update display accordingly
    // 4. Pause/resume game timer
    throw new Error('Method not implemented');
  }

  private handleRestart(): void {
    // TODO: Handle restart game request
    // 1. Stop current game
    // 2. Reset game state
    // 3. Start new game
    throw new Error('Method not implemented');
  }

  private handleQuit(): void {
    // TODO: Handle quit game request
    // 1. Stop game timer
    // 2. Set running flag to false
    // 3. Clean up resources
    throw new Error('Method not implemented');
  }

  private stopGameTimer(): void {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
    }
  }

  private calculateUpdateInterval(): number {
    // TODO: Calculate update interval based on game speed
    // Higher speed = shorter interval between updates
    // Return interval in milliseconds
    throw new Error('Method not implemented');
  }

  private async askPlayAgain(): Promise<boolean> {
    // TODO: Ask user if they want to play again
    // Return boolean response
    throw new Error('Method not implemented');
  }

  private cleanup(): void {
    this.stopGameTimer();
    this.input.close();
    this.isRunning = false;
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\nGoodbye! 👋');
  process.exit(0);
});

// Start the application
const gameController = new GameController();
gameController.startApplication().catch((error) => {
  console.error('Game crashed:', error);
  process.exit(1);
});