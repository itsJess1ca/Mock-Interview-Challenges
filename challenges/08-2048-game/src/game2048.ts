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
    // 1. Create a copy of the current board and apply move logic
    const { board, score, moved } = this.moveTiles(direction);

    // 3. Check if the board changed
    if (!moved) {
      // No change, return current state
      return {
        board: this.getBoard(),
        hasWon: this.hasWon,
        score: this.score,
        moved: false
      };
    }

    // 4. If it changed, add a random tile
    this.addRandomTile();

    // 5. Check for win condition
    if (!this.hasWon && this.checkWin()) {
      this.hasWon = true;
    }

    // 6. Return MoveResult
    return {
      board: this.getBoard(),
      hasWon: this.hasWon,
      score: this.score,
      moved: true
    };
  }

  /**
   * Move and merge tiles in the specified direction
   */
  private moveTiles(direction: Direction): { board: Board; score: number; moved: boolean } {
    const newBoard: Board = this.board.map(row => [...row]);
    let totalScoreGain = 0;

    if (direction === 'left') {
      // Process each row from left to right
      for (let i = 0; i < BOARD_SIZE; i++) {
        const { newRow, scoreGain } = this.moveAndMergeRow(newBoard[i]);
        newBoard[i] = newRow;
        totalScoreGain += scoreGain;
      }
    } else if (direction === 'right') {
      // Process each row from right to left (reverse, process, reverse back)
      for (let i = 0; i < BOARD_SIZE; i++) {
        const reversed = [...newBoard[i]].reverse();
        const { newRow, scoreGain } = this.moveAndMergeRow(reversed);
        newBoard[i] = newRow.reverse();
        totalScoreGain += scoreGain;
      }
    } else if (direction === 'up') {
      // Process each column from top to bottom (transpose, process, transpose back)
      for (let col = 0; col < BOARD_SIZE; col++) {
        const column = newBoard.map(row => row[col]);
        const { newRow, scoreGain } = this.moveAndMergeRow(column);
        for (let row = 0; row < BOARD_SIZE; row++) {
          newBoard[row][col] = newRow[row];
        }
        totalScoreGain += scoreGain;
      }
    } else if (direction === 'down') {
      // Process each column from bottom to top (reverse column, process, reverse back)
      for (let col = 0; col < BOARD_SIZE; col++) {
        const column = newBoard.map(row => row[col]).reverse();
        const { newRow, scoreGain } = this.moveAndMergeRow(column);
        const reversedResult = newRow.reverse();
        for (let row = 0; row < BOARD_SIZE; row++) {
          newBoard[row][col] = reversedResult[row];
        }
        totalScoreGain += scoreGain;
      }
    }

    // Check if board changed
    const moved = JSON.stringify(this.board) !== JSON.stringify(newBoard);

    if (moved) {
      this.board = newBoard;
      this.score += totalScoreGain;
    }

    return { board: newBoard, score: this.score, moved };
  }

  /**
   * Move a single row/column and merge tiles
   * Used by moveTiles for each row/column
   */
  private moveAndMergeRow(row: CellValue[]): { newRow: CellValue[]; scoreGain: number } {
    // 1. Remove zeros (slide tiles)
    const nonZero = row.filter(cell => cell !== EMPTY_CELL);

    // 2. Merge adjacent identical tiles
    const merged: CellValue[] = [];
    let scoreGain = 0;
    let i = 0;

    while (i < nonZero.length) {
      if (i + 1 < nonZero.length && nonZero[i] === nonZero[i + 1]) {
        // Merge the two tiles
        const mergedValue = nonZero[i] * 2;
        merged.push(mergedValue as CellValue);
        scoreGain += mergedValue;
        i += 2; // Skip the next tile as it's been merged
      } else {
        // No merge, just add the tile
        merged.push(nonZero[i]);
        i += 1;
      }
    }

    // 3. Add zeros back to fill the row
    while (merged.length < row.length) {
      merged.push(EMPTY_CELL);
    }

    // 4. Return new row and score gained
    return { newRow: merged, scoreGain };
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

    // 2. Check if any adjacent cells can be merged
    // Check horizontally
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE - 1; col++) {
        if (this.board[row][col] === this.board[row][col + 1]) {
          return true;
        }
      }
    }

    // Check vertically
    for (let row = 0; row < BOARD_SIZE - 1; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (this.board[row][col] === this.board[row + 1][col]) {
          return true;
        }
      }
    }

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
    for (const row of this.board) {
      for (const cell of row) {
        if (cell === WIN_TILE) {
          return true;
        }
      }
    }
    return false;
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
