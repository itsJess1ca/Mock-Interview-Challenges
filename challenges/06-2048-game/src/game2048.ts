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
    // TODO: Implement this function
    const emptyCells: Position[] = [];
    for (let y = 0; y < this.board.length; y++) {
      for (let x = 0; x < this.board[y].length; x++) {
        const cell = this.board[y][x];
        if (cell === 0) {
          emptyCells.push({ row: x, col: y })
        }
      }
    }
    if (emptyCells.length === 0) return false;
    const randomIndex: number = Math.floor(Math.random()*[...emptyCells].length)
    const cellValue = Math.random() > 0.9 ? 2 : 4;
    const position = emptyCells[randomIndex]
    this.board[position.row][position.col] = cellValue;
    return true;
  }

  /**
   * Make a move in the specified direction
   * Returns the result of the move including new board state and score
   */
  makeMove(direction: Direction): MoveResult {
    // TODO: Implement this function
    // 1. Create a copy of the current board
    // 2. Apply the move logic based on direction
    // 3. Check if the board changed
    // 4. If it changed, add a random tile and update score
    // 5. Check for win condition
    // 6. Return MoveResult
    throw new Error('Not implemented');
  }

  /**
   * Move and merge tiles in the specified direction
   */
  private moveTiles(direction: Direction): { board: Board; score: number; moved: boolean } {
    // TODO: Implement this function
    // This is the core game logic for sliding and merging tiles
    throw new Error('Not implemented');
  }

  /**
   * Move a single row/column and merge tiles
   * Used by moveTiles for each row/column
   */
  private moveAndMergeRow(row: CellValue[]): { newRow: CellValue[]; scoreGain: number } {
    // TODO: Implement this function
    // 1. Remove zeros (slide tiles)
    // 2. Merge adjacent identical tiles
    // 3. Add zeros back to fill the row
    // 4. Return new row and score gained
    throw new Error('Not implemented');
  }

  /**
   * Check if there are any valid moves available
   */
  canMove(): boolean {
    // TODO: Implement this function
    // 1. Check if there are empty cells
    // 2. Check if any adjacent cells can be merged
    throw new Error('Not implemented');
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
   * Get empty cells on the board
   */
  private getEmptyCells(): Position[] {
    // TODO: Implement this function
    // Return array of positions where the cell value is EMPTY_CELL
    throw new Error('Not implemented');
  }

  /**
   * Check if two boards are equal
   */
  private boardsEqual(board1: Board, board2: Board): boolean {
    // TODO: Implement this function
    // Compare every cell in both boards
    throw new Error('Not implemented');
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
