import { MinesweeperGame } from './minesweeper';
import { GameDisplay } from './display';
import { InputHandler } from './input';
import { GameState, Difficulty } from './types';

class GameController {
  private game: MinesweeperGame;
  private display: GameDisplay;
  private input: InputHandler;
  private firstMove: boolean;

  constructor() {
    this.game = new MinesweeperGame();
    this.display = new GameDisplay();
    this.input = new InputHandler();
    this.firstMove = true;
  }

  public async startGame(): Promise<void> {
    this.display.displayWelcome();
    this.display.displayHelp();

    let playAgain = true;
    while (playAgain) {
      await this.playGame();
      playAgain = await this.input.askPlayAgain();
      if (playAgain) {
        await this.setupNewGame();
      }
    }

    this.input.close();
    console.log('Thanks for playing Minesweeper! 💣');
  }

  private async setupNewGame(): Promise<void> {
    // TODO: Set up a new game
    // 1. Get difficulty preference from user
    // 2. Create new game instance with selected difficulty
    // 3. Reset firstMove flag
    throw new Error('Method not implemented');
  }

  private async playGame(): Promise<void> {
    // TODO: Main game loop
    // 1. Display board and stats
    // 2. Get user command
    // 3. Parse and execute command
    // 4. Check game state and continue or end
    // 5. Handle different command types (reveal, flag, new game, quit, help)
    throw new Error('Method not implemented');
  }

  private async handleRevealCommand(row: number, col: number): Promise<void> {
    // TODO: Handle reveal cell command
    // 1. If first move, initialize game with this position
    // 2. Call game.revealCell()
    // 3. Display result and update game state
    // 4. Handle game over conditions
    throw new Error('Method not implemented');
  }

  private async handleFlagCommand(row: number, col: number): Promise<void> {
    // TODO: Handle flag toggle command
    // 1. Call game.toggleFlag()
    // 2. Display result
    // 3. Show updated board
    throw new Error('Method not implemented');
  }

  private convertToZeroIndexed(row: number, col: number): { row: number; col: number } {
    // TODO: Convert 1-based user input to 0-based array indices
    // User inputs row 1, col 1 should become row 0, col 0
    throw new Error('Method not implemented');
  }

  private isGameOver(): boolean {
    const gameState = this.game.getGameState();
    return gameState === GameState.Won || gameState === GameState.Lost;
  }
}

// Start the game
const gameController = new GameController();
gameController.startGame().catch((error) => {
  console.error('Game crashed:', error);
  process.exit(1);
});