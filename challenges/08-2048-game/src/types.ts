export type CellValue = 0 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
export type Board = CellValue[][];
export type Direction = 'up' | 'down' | 'left' | 'right';

export interface GameState {
  board: Board;
  score: number;
  isGameOver: boolean;
  hasWon: boolean;
  canMove: boolean;
}

export interface Position {
  row: number;
  col: number;
}

export interface MoveResult {
  board: Board;
  score: number;
  moved: boolean;
  hasWon: boolean;
}

export const BOARD_SIZE = 4;
export const WIN_TILE = 2048;
export const EMPTY_CELL = 0;