import { Position, Board, AttackResult, AIStrategy, CellState } from './types';

export class AIPlayer {
  private strategy: AIStrategy;
  private difficulty: 'easy' | 'medium' | 'hard';

  constructor(difficulty: 'easy' | 'medium' | 'hard' = 'medium') {
    this.difficulty = difficulty;
    this.strategy = this.createStrategy(difficulty);
  }

  private createStrategy(difficulty: 'easy' | 'medium' | 'hard'): AIStrategy {
    switch (difficulty) {
      case 'easy':
        return new RandomStrategy();
      case 'medium':
        return new HuntTargetStrategy();
      case 'hard':
        return new AdvancedStrategy();
      default:
        return new HuntTargetStrategy();
    }
  }

  public getNextMove(board: Board, lastResult?: AttackResult): Position {
    return this.strategy.getNextTarget(board, lastResult);
  }

  public onAttackResult(result: AttackResult): void {
    this.strategy.onAttackResult(result);
  }

  public getDifficulty(): string {
    return this.difficulty;
  }

  public setDifficulty(difficulty: 'easy' | 'medium' | 'hard'): void {
    this.difficulty = difficulty;
    this.strategy = this.createStrategy(difficulty);
  }
}

class RandomStrategy implements AIStrategy {
  public name = 'Random';

  public getNextTarget(board: Board): Position {
    // TODO: Implement random target selection
    // 1. Get all valid (unattacked) positions
    // 2. Choose random position from available options
    // 3. Return chosen position
    throw new Error('Method not implemented');
  }

  public onAttackResult(result: AttackResult): void {
    // Random strategy doesn't learn from results
  }

  private getValidPositions(board: Board): Position[] {
    // TODO: Get all positions that haven't been attacked
    throw new Error('Method not implemented');
  }
}

class HuntTargetStrategy implements AIStrategy {
  public name = 'Hunt & Target';
  private mode: 'hunt' | 'target' = 'hunt';
  private targetQueue: Position[] = [];
  private lastHit: Position | null = null;

  public getNextTarget(board: Board, lastResult?: AttackResult): Position {
    // TODO: Implement hunt and target strategy
    // Hunt mode: Look for ships using checkerboard pattern
    // Target mode: After hitting a ship, try adjacent positions to sink it
    throw new Error('Method not implemented');
  }

  private huntMode(board: Board): Position {
    // TODO: Implement hunt mode
    // Use checkerboard pattern to efficiently find ships
    // Prefer positions that can contain the largest remaining ship
    throw new Error('Method not implemented');
  }

  private targetMode(board: Board): Position {
    // TODO: Implement target mode
    // Process positions from target queue (adjacent to hits)
    // Add smart logic to determine ship orientation
    throw new Error('Method not implemented');
  }

  public onAttackResult(result: AttackResult): void {
    // TODO: Update strategy state based on attack result
    // 1. If hit, switch to target mode and add adjacent positions to queue
    // 2. If sunk, switch back to hunt mode and clear target queue
    // 3. If miss in target mode, remove position from queue
    throw new Error('Method not implemented');
  }

  private addAdjacentPositions(position: Position, board: Board): void {
    // TODO: Add valid adjacent positions to target queue
    // Only add positions that haven't been attacked
    throw new Error('Method not implemented');
  }

  private getAdjacentPositions(position: Position): Position[] {
    // TODO: Get 4-directional adjacent positions (no diagonals)
    // Used for targeting after a hit
    throw new Error('Method not implemented');
  }

  private isValidTarget(position: Position, board: Board): boolean {
    // TODO: Check if position is valid for targeting
    // Must be within bounds and not previously attacked
    throw new Error('Method not implemented');
  }
}

class AdvancedStrategy implements AIStrategy {
  public name = 'Advanced';
  private huntTargetStrategy: HuntTargetStrategy;
  private probabilityMap: number[][];
  private boardSize: number;

  constructor() {
    this.huntTargetStrategy = new HuntTargetStrategy();
    this.probabilityMap = [];
    this.boardSize = 10;
  }

  public getNextTarget(board: Board, lastResult?: AttackResult): Position {
    // TODO: Implement advanced strategy
    // 1. Calculate probability map based on possible ship placements
    // 2. Use hunt & target as fallback
    // 3. Choose position with highest probability
    throw new Error('Method not implemented');
  }

  private calculateProbabilityMap(board: Board): void {
    // TODO: Calculate probability map
    // For each unattacked position, calculate probability of containing a ship
    // Based on remaining ships and possible placements
    throw new Error('Method not implemented');
  }

  private getBestProbabilityPosition(): Position {
    // TODO: Find position with highest probability
    // Return position with maximum value in probability map
    throw new Error('Method not implemented');
  }

  public onAttackResult(result: AttackResult): void {
    this.huntTargetStrategy.onAttackResult(result);
  }

  private getRemainingShipLengths(board: Board): number[] {
    // TODO: Get lengths of ships that haven't been sunk yet
    // Used for probability calculations
    throw new Error('Method not implemented');
  }

  private canPlaceShip(board: Board, position: Position, length: number, horizontal: boolean): boolean {
    // TODO: Check if a ship of given length can be placed at position
    // Used in probability calculations
    throw new Error('Method not implemented');
  }
}

export { RandomStrategy, HuntTargetStrategy, AdvancedStrategy };