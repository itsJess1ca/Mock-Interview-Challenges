import { Board, CellState, Position, Ship, Orientation, PlacementResult, ValidationResult, AttackResult } from './types';
import { BattleshipShip } from './ship';

export class GameBoard implements Board {
  public grid: CellState[][];
  public ships: Ship[];
  public size: number;
  private allowAdjacentShips: boolean;

  constructor(size: number = 10, allowAdjacentShips: boolean = false) {
    this.size = size;
    this.ships = [];
    this.allowAdjacentShips = allowAdjacentShips;
    this.grid = this.createEmptyGrid();
  }

  private createEmptyGrid(): CellState[][] {
    // TODO: Create a size x size grid filled with Empty cells
    throw new Error('Method not implemented');
  }

  public placeShip(ship: Ship, startPosition: Position, orientation: Orientation): PlacementResult {
    // TODO: Attempt to place a ship on the board
    // 1. Validate the placement is legal
    // 2. If valid, place the ship and update grid
    // 3. Add ship to ships array
    // 4. Return result with success status
    throw new Error('Method not implemented');
  }

  private validateShipPlacement(ship: Ship, startPosition: Position, orientation: Orientation): ValidationResult {
    // TODO: Validate ship placement
    // 1. Check if ship fits within board boundaries
    // 2. Check if positions are empty
    // 3. Check if placement violates adjacency rules (if enabled)
    // 4. Return validation result
    throw new Error('Method not implemented');
  }

  private isPositionValid(position: Position): boolean {
    // TODO: Check if position is within board boundaries
    throw new Error('Method not implemented');
  }

  private isPositionEmpty(position: Position): boolean {
    // TODO: Check if position is empty (no ship)
    throw new Error('Method not implemented');
  }

  private checkAdjacencyRules(positions: Position[]): boolean {
    // TODO: Check if ship placement violates adjacency rules
    // If allowAdjacentShips is false, ensure no ships touch
    // Check all 8 directions around each position
    throw new Error('Method not implemented');
  }

  private getAdjacentPositions(position: Position): Position[] {
    // TODO: Get all 8 adjacent positions (including diagonals)
    // Filter out positions that are outside board boundaries
    throw new Error('Method not implemented');
  }

  public attack(position: Position): AttackResult {
    // TODO: Process an attack at the given position
    // 1. Validate position is within bounds and not already attacked
    // 2. Check if position contains a ship
    // 3. If hit, mark ship as hit and check if sunk
    // 4. Update grid state (hit/miss)
    // 5. Check if all ships are sunk (game over)
    // 6. Return attack result
    throw new Error('Method not implemented');
  }

  private findShipAtPosition(position: Position): Ship | null {
    // TODO: Find which ship (if any) occupies the given position
    throw new Error('Method not implemented');
  }

  private checkGameOver(): boolean {
    // TODO: Check if all ships on this board have been sunk
    return this.ships.every(ship => ship.isSunk);
  }

  public getCellState(position: Position): CellState {
    if (!this.isPositionValid(position)) {
      throw new Error('Position out of bounds');
    }
    return this.grid[position.row][position.col];
  }

  public getShips(): Ship[] {
    return [...this.ships];
  }

  public getAliveShips(): Ship[] {
    return this.ships.filter(ship => !ship.isSunk);
  }

  public getSunkShips(): Ship[] {
    return this.ships.filter(ship => ship.isSunk);
  }

  public isPositionAttacked(position: Position): boolean {
    // TODO: Check if position has been attacked (hit or miss)
    const state = this.getCellState(position);
    return state === CellState.Hit || state === CellState.Miss || state === CellState.Sunk;
  }

  public getValidTargets(): Position[] {
    // TODO: Get all positions that haven't been attacked yet
    // Return array of positions with Empty or Ship state
    throw new Error('Method not implemented');
  }

  public getHitPositions(): Position[] {
    // TODO: Get all positions that have been hit (but ship not sunk)
    throw new Error('Method not implemented');
  }

  public getMissPositions(): Position[] {
    // TODO: Get all positions that were missed
    throw new Error('Method not implemented');
  }

  public reset(): void {
    // TODO: Reset board to initial state
    // Clear grid, remove all ships
    this.grid = this.createEmptyGrid();
    this.ships = [];
  }

  public clone(): GameBoard {
    // TODO: Create a deep copy of this board
    // Useful for AI simulation
    throw new Error('Method not implemented');
  }

  public getShipByPosition(position: Position): Ship | null {
    return this.findShipAtPosition(position);
  }

  public removeShip(shipId: string): boolean {
    // TODO: Remove a ship from the board
    // 1. Find ship by ID
    // 2. Clear its positions from grid
    // 3. Remove from ships array
    // 4. Return true if removed, false if not found
    throw new Error('Method not implemented');
  }

  public canPlaceShip(ship: Ship, startPosition: Position, orientation: Orientation): boolean {
    const validation = this.validateShipPlacement(ship, startPosition, orientation);
    return validation.valid;
  }

  public getBoard(): CellState[][] {
    // TODO: Return a deep copy of the grid
    throw new Error('Method not implemented');
  }

  public getShipStats(): { total: number; alive: number; sunk: number } {
    return {
      total: this.ships.length,
      alive: this.getAliveShips().length,
      sunk: this.getSunkShips().length
    };
  }
}