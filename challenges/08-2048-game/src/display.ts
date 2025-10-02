import { Board, GameState, CellValue } from './types';

/**
 * DisplayManager class handles all terminal output for the game
 * Manages board rendering, messages, and screen clearing
 */
export class DisplayManager {
  /**
   * Display the current board state in a formatted way
   */
  public showBoard(board: Board): void {
    console.log('┌────┬────┬────┬────┐');
    let isFirst = true;
    for (const row of board) {
      if (!isFirst) console.log('├────┼────┼────┼────┤');
      let rowStr = '│';
      const cellValues: string[] = [];
      for (const cell of row) {
        cellValues.push(this.formatCell(cell));
      }

      rowStr += cellValues.join('│');
      rowStr += '│';
      console.log(rowStr);
      isFirst = false;
    }
    console.log('└────┴────┴────┴────┘');
  }

  /**
   * Display the game state including score and status
   */
  public showGameState(gameState: GameState): void {
    this.showBoard(gameState.board);
    console.log(`\nScore: ${gameState.score}`);

    if (gameState.hasWon) {
      this.showWinMessage();
      return;
    }

    if (gameState.isGameOver) {
      this.showGameOverMessage();
    }
  }

  /**
   * Display game instructions
   */
  public showInstructions(): void {
    console.log('🎮 Welcome to 2048!');
    console.log('');
    console.log('Instructions:');
    console.log('• Use arrow keys or WASD to move tiles');
    console.log('• When two tiles with the same number touch, they merge!');
    console.log('• Try to reach the 2048 tile to win!');
    console.log('• Game ends when you can\'t make any more moves');
    console.log('');
    console.log('Controls:');
    console.log('• W or ↑ : Move Up');
    console.log('• S or ↓ : Move Down');
    console.log('• A or ← : Move Left');
    console.log('• D or → : Move Right');
    console.log('• Q : Quit game');
    console.log('• R : Restart game');
    console.log('');
  }

  /**
   * Clear the console screen
   */
  public clear(): void {
    console.clear();
  }

  /**
   * Display win message
   */
  public showWinMessage(): void {
    console.log('🎉 Congratulations! You reached 2048! 🎉');
    console.log('You can continue playing to reach higher scores!');
  }

  /**
   * Display game over message
   */
  public showGameOverMessage(): void {
    console.log('💀 Game Over! No more moves available.');
    console.log('Press R to restart or Q to quit.');
  }

  /**
   * Format a cell value for display
   * @private
   */
  private formatCell(cell: CellValue): string {
    if (cell === 0) {
      return '    ';
    }
    const value = cell.toString();
    if (value.length === 4) {
      return value;
    }
    if (value.length === 3) {
      return ` ${value}`;
    }
    if (value.length === 2) {
      return ` ${value} `;
    }
    return ` ${value}  `;
  }
}
