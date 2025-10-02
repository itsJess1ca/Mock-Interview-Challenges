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
    // Return a 4x4 array filled with EMPTY_CELL (0)
    return [...new Array(BOARD_SIZE)]
      .map(r => [...new Array(BOARD_SIZE)].map(e => EMPTY_CELL))
  }

  /**
   * Add a random tile (2 or 4) to an empty cell on the board
   * 90% chance for 2, 10% chance for 4
   */
  addRandomTile(): boolean {
    const emptyCells: Position[] = [];
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        const cell = this.board[row][col];
        if (cell === EMPTY_CELL) {
          emptyCells.push({ row, col })
        }
      }
    }
    if (emptyCells.length === 0) return false;
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cellValue = Math.random() > 0.9 ? 4 : 2;  // 90% chance for 2, 10% chance for 4
    const position = emptyCells[randomIndex];
    this.board[position.row][position.col] = cellValue;
    return true;
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
    // 1. Check if there are empty cells
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (this.board[row][col] === EMPTY_CELL) {
          return true;
        }
      }
    }

    // TODO: 2. Check if any adjacent cells can be merged
    // Check horizontally and vertically for matching adjacent tiles
    return false;
  }

  /**
   * Check if the game is over (no moves available)
   */
  isGameOver(): boolean {
    return !this.canMove();
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
    return {
      board: this.board.map(row => [...row]),
      score: this.score,
      isGameOver: this.isGameOver(),
      hasWon: this.hasWon,
      canMove: this.canMove()
    };
  }

  /**
   * Reset the game to initial state
   */
  reset(): void {
    this.board = this.createEmptyBoard();
    this.score = 0;
    this.hasWon = false;
    this.addRandomTile();
    this.addRandomTile();
  }

  /**
   * Get the current score
   */
  getScore(): number {
    return this.score;
  }

  /**
   * Get a copy of the current board
   */
  getBoard(): Board {
    return this.board.map(row => [...row]);
  }

  /**
   * Set the board state (useful for testing)
   */
  setBoardForTesting(board: Board): void {
    this.board = board.map(row => [...row]);
  }
}
