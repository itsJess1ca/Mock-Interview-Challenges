export interface Position {
  x: number;
  y: number;
}

export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}

export enum GameState {
  Playing = 'playing',
  Paused = 'paused',
  GameOver = 'game-over',
  Victory = 'victory'
}

export interface GameConfig {
  boardWidth: number;
  boardHeight: number;
  initialSpeed: number;
  speedIncrement: number;
  maxSpeed: number;
  pointsPerFood: number;
  pointsPerSpeedBonus: number;
}

export interface Food {
  position: Position;
  points: number;
  isSpecial?: boolean;
}

export interface GameStats {
  score: number;
  level: number;
  speed: number;
  foodEaten: number;
  gameTime: number;
  highScore: number;
}

export interface MoveResult {
  success: boolean;
  gameState: GameState;
  scoreChange: number;
  message?: string;
}

export enum CellType {
  Empty = 'empty',
  Snake = 'snake',
  SnakeHead = 'snake-head',
  Food = 'food',
  SpecialFood = 'special-food',
  Wall = 'wall'
}

export interface GameSettings {
  difficulty: 'easy' | 'medium' | 'hard' | 'insane';
  boardSize: 'small' | 'medium' | 'large';
  wallsEnabled: boolean;
  specialFoodEnabled: boolean;
}