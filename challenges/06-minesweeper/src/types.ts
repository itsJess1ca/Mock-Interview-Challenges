export interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMineCount: number;
  row: number;
  col: number;
}

export interface Position {
  row: number;
  col: number;
}

export enum GameState {
  Playing = 'playing',
  Won = 'won',
  Lost = 'lost'
}

export enum Difficulty {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Expert = 'expert'
}

export interface GameConfig {
  rows: number;
  cols: number;
  mineCount: number;
}

export interface GameStats {
  gameState: GameState;
  revealedCells: number;
  flaggedCells: number;
  remainingMines: number;
  elapsedTime: number;
  totalCells: number;
}

export interface MoveResult {
  success: boolean;
  gameState: GameState;
  revealedCells: Position[];
  message?: string;
}