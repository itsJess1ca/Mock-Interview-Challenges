import { Player, Cell, Board, GameState, Position } from './types';

export class Connect4Game {
  private board: Board;
  private currentPlayer: Player;
  private winner: Player | null;
  private isGameOver: boolean;

  constructor() {
    this.board = this.createEmptyBoard();
    this.currentPlayer = 1;
    this.winner = null;
    this.isGameOver = false;
  }

  private createEmptyBoard(): Board {
    // TODO: Implement this method
    // Create a 6x7 board filled with null values
    throw new Error('Method not implemented');
  }

  public getGameState(): GameState {
    return {
      board: this.board,
      currentPlayer: this.currentPlayer,
      winner: this.winner,
      isGameOver: this.isGameOver,
    };
  }

  public makeMove(column: number): boolean {
    // TODO: Implement this method
    // 1. Validate the column number
    // 2. Find the lowest available row in that column
    // 3. Place the current player's piece
    // 4. Check for win condition
    // 5. Switch to the next player
    // Return true if move was successful, false otherwise
    throw new Error('Method not implemented');
  }

  private isValidColumn(column: number): boolean {
    // TODO: Implement column validation
    throw new Error('Method not implemented');
  }

  private findLowestAvailableRow(column: number): number | null {
    // TODO: Find the lowest available row in the given column
    // Return null if column is full
    throw new Error('Method not implemented');
  }

  private getColumnCells(column: number): Cell[] {
    // Helper method to get all cells in a column
    return this.board.reduce((col, row) => {
      col.push(row[column]);
      return col;
    }, []);
  }

  private checkWin(lastMove: Position): boolean {
    // TODO: Implement win checking logic
    // Check horizontal, vertical, and diagonal lines
    // Return true if current player has won
    throw new Error('Method not implemented');
  }

  private checkHorizontalWin(lastMove: Position): boolean {
    // TODO: Check for 4 in a row horizontally
    throw new Error('Method not implemented');
  }

  private checkVerticalWin(lastMove: Position): boolean {
    // TODO: Check for 4 in a row vertically
    throw new Error('Method not implemented');
  }

  private checkDiagonalWin(lastMove: Position): boolean {
    // TODO: Check for 4 in a row diagonally (both directions)
    throw new Error('Method not implemented');
  }

  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

  public resetGame(): void {
    this.board = this.createEmptyBoard();
    this.currentPlayer = 1;
    this.winner = null;
    this.isGameOver = false;
  }
}