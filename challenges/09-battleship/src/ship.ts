import { Position, Orientation, Ship } from './types';

export class BattleshipShip implements Ship {
  public id: string;
  public name: string;
  public length: number;
  public positions: Position[];
  public hits: boolean[];
  public orientation: Orientation;
  public isSunk: boolean;

  constructor(id: string, name: string, length: number) {
    this.id = id;
    this.name = name;
    this.length = length;
    this.positions = [];
    this.hits = new Array(length).fill(false);
    this.orientation = Orientation.Horizontal;
    this.isSunk = false;
  }

  public place(startPosition: Position, orientation: Orientation): void {
    // TODO: Place the ship at the specified position and orientation
    // 1. Set orientation
    // 2. Calculate all positions the ship will occupy
    // 3. Store positions array
    // 4. Reset hits array
    // 5. Reset sunk status
    throw new Error('Method not implemented');
  }

  private calculatePositions(startPosition: Position, orientation: Orientation): Position[] {
    // TODO: Calculate all positions this ship will occupy
    // Based on start position, orientation, and ship length
    // Return array of positions
    throw new Error('Method not implemented');
  }

  public hit(position: Position): boolean {
    // TODO: Register a hit at the specified position
    // 1. Find which segment of the ship was hit
    // 2. Mark that segment as hit
    // 3. Check if ship is now sunk
    // 4. Return true if hit was valid, false if position not on ship
    throw new Error('Method not implemented');
  }

  private checkIfSunk(): boolean {
    // TODO: Check if all segments of the ship have been hit
    // Return true if ship is completely destroyed
    throw new Error('Method not implemented');
  }

  public occupiesPosition(position: Position): boolean {
    // TODO: Check if this ship occupies the given position
    // Return true if position is part of this ship
    throw new Error('Method not implemented');
  }

  public getPositions(): Position[] {
    return [...this.positions];
  }

  public getHitPositions(): Position[] {
    // TODO: Return array of positions that have been hit
    // Filter positions array based on hits array
    throw new Error('Method not implemented');
  }

  public getUnhitPositions(): Position[] {
    // TODO: Return array of positions that haven't been hit yet
    // Filter positions array based on hits array
    throw new Error('Method not implemented');
  }

  public getOrientation(): Orientation {
    return this.orientation;
  }

  public getLength(): number {
    return this.length;
  }

  public getName(): string {
    return this.name;
  }

  public getId(): string {
    return this.id;
  }

  public isPlaced(): boolean {
    return this.positions.length > 0;
  }

  public getHitCount(): number {
    return this.hits.filter(hit => hit).length;
  }

  public getIntegrityPercentage(): number {
    // TODO: Calculate what percentage of the ship is still intact
    // Return value between 0 (sunk) and 100 (no hits)
    throw new Error('Method not implemented');
  }

  public reset(): void {
    // TODO: Reset ship to unplaced state
    // Clear positions, reset hits, reset sunk status
    throw new Error('Method not implemented');
  }

  public clone(): BattleshipShip {
    // TODO: Create a deep copy of this ship
    // Useful for AI simulation and game state backup
    throw new Error('Method not implemented');
  }
}