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
    // TODO: Implement this function
    // Display the board in a nice ASCII format with box drawing characters
    // Example output:
    // ┌────┬────┬────┬────┐
    // │ 2  │ 4  │    │ 2  │
    // ├────┼────┼────┼────┤
    // │    │ 8  │ 16 │ 4  │
    // ├────┼────┼────┼────┤
    // │ 2  │    │ 2  │ 8  │
    // ├────┼────┼────┼────┤
    // │ 4  │ 2  │ 4  │ 2  │
    // └────┴────┴────┴────┘
    throw new Error('Not implemented');
  }

  /**
   * Display the game state including score and status
   */
  public showGameState(gameState: GameState): void {
    // TODO: Implement this function
    // 1. Show the board using showBoard()
    // 2. Display the score
    // 3. Check for win/game over and show appropriate messages
    throw new Error('Not implemented');
  }

  /**
   * Display game instructions
   */
  public showInstructions(): void {
    // TODO: Implement this function
    // Show welcome message and controls
    // Include: movement keys (WASD/arrows), quit (Q), restart (R)
    throw new Error('Not implemented');
  }

  /**
   * Clear the console screen
   */
  public clear(): void {
    // TODO: Implement this function
    // Use console.clear() to clear the terminal
    throw new Error('Not implemented');
  }

  /**
   * Display win message
   */
  public showWinMessage(): void {
    // TODO: Implement this function
    // Show congratulations message for reaching 2048
    throw new Error('Not implemented');
  }

  /**
   * Display game over message
   */
  public showGameOverMessage(): void {
    // TODO: Implement this function
    // Show game over message with instructions to restart or quit
    throw new Error('Not implemented');
  }

  /**
   * Format a cell value for display
   * @private
   */
  private formatCell(cell: CellValue): string {
    // TODO: Implement this helper function
    // Format cell values to fit in a 4-character width
    // Empty cells (0) should display as spaces
    // Center align numbers within the cell
    throw new Error('Not implemented');
  }
}
