import { MinesweeperGame } from './minesweeper';
import { Cell, GameState, Difficulty } from './types';

export class GameDisplay {
  private static readonly SYMBOLS = {
    HIDDEN: '█',
    REVEALED_EMPTY: ' ',
    MINE: '*',
    FLAG: 'F',
    NUMBERS: ['', '1', '2', '3', '4', '5', '6', '7', '8']
  };

  public displayWelcome(): void {
    console.log('🎮 Welcome to Minesweeper! 🎮');
    console.log('');
    console.log('Commands:');
    console.log('  r <row> <col> - Reveal cell (e.g., "r 3 5")');
    console.log('  f <row> <col> - Toggle flag (e.g., "f 3 5")');
    console.log('  n - New game');
    console.log('  q - Quit');
    console.log('');
  }

  public displayBoard(game: MinesweeperGame, showMines: boolean = false): void {
    // TODO: Display the current board state
    // 1. Get board from game
    // 2. Display column headers (1, 2, 3, ...)
    // 3. For each row:
    //    - Display row number
    //    - For each cell, display appropriate symbol based on cell state
    // 4. Use SYMBOLS constant for consistent display
    // 5. If showMines is true (game over), reveal all mines
    throw new Error('Method not implemented');
  }

  private getCellDisplay(cell: Cell, showMines: boolean): string {
    // TODO: Return the appropriate display character for a cell
    // Consider all cell states: revealed/hidden, flagged, mine, neighbor count
    // Use the SYMBOLS constant
    throw new Error('Method not implemented');
  }

  public displayGameStats(game: MinesweeperGame): void {
    // TODO: Display current game statistics
    // Show remaining mines, revealed cells, elapsed time
    // Format nicely for user experience
    throw new Error('Method not implemented');
  }

  public displayGameOver(game: MinesweeperGame): void {
    // TODO: Display game over message
    // Show different messages for win vs loss
    // Display final board with all mines revealed
    // Show final statistics
    throw new Error('Method not implemented');
  }

  public displayDifficultyMenu(): void {
    console.log('Select difficulty:');
    console.log('1. Beginner (9x9, 10 mines)');
    console.log('2. Intermediate (16x16, 40 mines)');
    console.log('3. Expert (16x30, 99 mines)');
    console.log('Enter your choice (1-3): ');
  }

  public displayError(message: string): void {
    console.log(`❌ Error: ${message}`);
  }

  public displaySuccess(message: string): void {
    console.log(`✅ ${message}`);
  }

  public displayHelp(): void {
    console.log('');
    console.log('🎯 Minesweeper Rules:');
    console.log('- Click cells to reveal them');
    console.log('- Numbers show how many mines are adjacent');
    console.log('- Flag cells you think contain mines');
    console.log('- Reveal all non-mine cells to win');
    console.log('- Avoid clicking on mines!');
    console.log('');
    console.log('💡 Tips:');
    console.log('- Start with corners and edges');
    console.log('- Use the numbers to deduce mine locations');
    console.log('- Flag suspected mines to avoid accidents');
    console.log('');
  }
}