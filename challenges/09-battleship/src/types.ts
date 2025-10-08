export interface Position {
  row: number;
  col: number;
}

export enum CellState {
  Empty = 'empty',
  Ship = 'ship',
  Hit = 'hit',
  Miss = 'miss',
  Sunk = 'sunk'
}

export enum Orientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

export enum GameState {
  Setup = 'setup',
  PlayerTurn = 'player-turn',
  AITurn = 'ai-turn',
  PlayerWon = 'player-won',
  AIWon = 'ai-won',
  Paused = 'paused'
}

export interface Ship {
  id: string;
  name: string;
  length: number;
  positions: Position[];
  hits: boolean[];
  orientation: Orientation;
  isSunk: boolean;
}

export interface AttackResult {
  position: Position;
  hit: boolean;
  sunk: boolean;
  shipName?: string;
  gameOver: boolean;
  winner?: 'player' | 'ai';
}

export interface Board {
  grid: CellState[][];
  ships: Ship[];
  size: number;
}

export interface GameConfig {
  boardSize: number;
  ships: ShipConfig[];
  aiDifficulty: 'easy' | 'medium' | 'hard';
  allowAdjacent: boolean;
}

export interface ShipConfig {
  name: string;
  length: number;
  count: number;
}

export interface AIStrategy {
  name: string;
  getNextTarget(board: Board, lastResult?: AttackResult): Position;
  onAttackResult(result: AttackResult): void;
}

export interface GameStats {
  playerHits: number;
  playerMisses: number;
  playerShipsSunk: number;
  aiHits: number;
  aiMisses: number;
  aiShipsSunk: number;
  turnCount: number;
  gameTime: number;
}

export interface PlacementResult {
  success: boolean;
  ship?: Ship;
  message?: string;
}

export interface ValidationResult {
  valid: boolean;
  message?: string;
}