export type Player = 1 | 2;
export type Cell = Player | null;
export type Board = Cell[][];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isGameOver: boolean;
}

export interface Position {
  row: number;
  col: number;
}

// Visual representation for players in the game
export const CounterIcons = [
  ' ',     // Index 0: Empty space
  '👽',   // Index 1: Player 1
  '😺'    // Index 2: Player 2
] as const;