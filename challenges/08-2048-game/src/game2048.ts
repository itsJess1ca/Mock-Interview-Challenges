import { Board, CellValue, Direction, GameState, MoveResult, Position, BOARD_SIZE, WIN_TILE, EMPTY_CELL } from './types';

export class Game2048 {
  private board: Board;
  private score: number;
  private hasWon: boolean;

  constructor() {
    this.board = this.createEmptyBoard();
    this.score = 0;
    this.hasWon = false;
    this.addRandomTile();
    this.addRandomTile();
  }

  /**
   * Create a 4x4 board filled with empty cells (0)
   */
  private createEmptyBoard(): Board {
    // TODO: Implement this function
    // Return a 4x4 array filled with EMPTY_CELL (0)
    throw new Error('Not implemented');
  }

  /**
   * Add a random tile (2 or 4) to an empty cell on the board
   * 90% chance for 2, 10% chance for 4
   */
  addRandomTile(): boolean {
    // TODO: Implement this function
    // 1. Find all empty cells on the board
    // 2. If no empty cells, return false
    // 3. Pick a random empty cell
    // 4. Place a tile with value 2 (90% chance) or 4 (10% chance)
    // 5. Return true
    throw new Error('Not implemented');
  }

  /**
   * Make a move in the specified direction
   * Returns the result of the move including new board state and score
   */
  makeMove(direction: Direction): MoveResult {
    // TODO: Implement this function
    // 1. Create a copy of the current board and apply move logic
    // 2. Check if the board changed
    // 3. If it changed, add a random tile and update score
    // 4. Check for win condition
    // 5. Return MoveResult with updated board, score, hasWon, and moved flag
    throw new Error('Not implemented');
  }

  /**
   * Move and merge tiles in the specified direction
   */
  private moveTiles(direction: Direction): { board: Board; score: number; moved: boolean } {
    // TODO: Implement this function
    // This is the core game logic for sliding and merging tiles
    // 1. Create a copy of the board
    // 2. Based on direction (left/right/up/down), process each row or column
    // 3. Use moveAndMergeRow to handle the sliding and merging logic
    // 4. Track total score gained from merges
    // 5. Check if the board changed
    // 6. Update the board and score if moved
    // 7. Return the new board, score, and moved flag
    throw new Error('Not implemented');
  }

  /**
   * Move a single row/column and merge tiles
   * Used by moveTiles for each row/column
   */
  private moveAndMergeRow(row: CellValue[]): { newRow: CellValue[]; scoreGain: number } {
    // TODO: Implement this function
    // 1. Remove zeros (slide tiles together)
    // 2. Merge adjacent identical tiles from left to right
    //    - Only merge once per tile (e.g., [2,2,2,2] becomes [4,4,0,0], not [8,0,0,0])
    //    - Track score gained (sum of merged values)
    // 3. Add zeros back at the end to maintain row length
    // 4. Return new row and score gained
    throw new Error('Not implemented');
  }

  /**
   * Check if there are any valid moves available
   */
  canMove(): boolean {
    // TODO: Implement this function
    // 1. Check if there are empty cells
    // 2. Check if any adjacent cells can be merged (horizontally and vertically)
    throw new Error('Not implemented');
  }

  /**
   * Check if the game is over (no moves available)
   */
  isGameOver(): boolean {
    // TODO: Implement this function
    // Return true if no moves are available
    throw new Error('Not implemented');
  }

  /**
   * Check if the player has won (reached 2048)
   */
  checkWin(): boolean {
    // TODO: Implement this function
    // Check if any cell contains WIN_TILE (2048)
    throw new Error('Not implemented');
  }

  /**
   * Get the current game state
   */
  getGameState(): GameState {
    // TODO: Implement this function
    // Return an object with: board (copy), score, isGameOver, hasWon, canMove
    throw new Error('Not implemented');
  }

  /**
   * Reset the game to initial state
   */
  reset(): void {
    // TODO: Implement this function
    // Reset board, score, hasWon, and add two random tiles
    throw new Error('Not implemented');
  }

  /**
   * Get the current score
   */
  getScore(): number {
    // TODO: Implement this function
    // Return the current score
    throw new Error('Not implemented');
  }

  /**
   * Get a copy of the current board
   */
  getBoard(): Board {
    // TODO: Implement this function
    // Return a deep copy of the board (not the original reference)
    throw new Error('Not implemented');
  }

  /**
   * Set the board state (useful for testing)
   */
  setBoardForTesting(board: Board): void {
    this.board = board.map(row => [...row]);
  }
}
