import { Connect4Game } from './connect4';
import { GameDisplay } from './display';
import { InputHandler } from './input';
import { CounterIcons } from './types';

class GameController {
  private game: Connect4Game;
  private display: GameDisplay;
  private input: InputHandler;

  constructor() {
    this.game = new Connect4Game();
    this.display = new GameDisplay();
    this.input = new InputHandler();
  }

  public async startGame(): Promise<void> {
    this.display.displayWelcome();

    let playAgain = true;
    while (playAgain) {
      await this.playRound();
      playAgain = await this.input.askPlayAgain();
      if (playAgain) {
        this.game.resetGame();
      }
    }

    this.input.close();
    console.log('Thanks for playing!');
  }

  private async playRound(): Promise<void> {
    // TODO: Implement the main game loop
    // 1. Display the board
    // 2. Show current player
    // 3. Get player input
    // 4. Make the move
    // 5. Check if game is over
    // 6. Repeat until game ends
    throw new Error('Method not implemented');
  }
}

// Start the game
const gameController = new GameController();
gameController.startGame().catch(console.error);