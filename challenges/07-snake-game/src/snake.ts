import { Position, Direction } from './types';

export class Snake {
  private body: Position[];
  private direction: Direction;
  private nextDirection: Direction;
  private growthPending: number;

  constructor(startPosition: Position, initialDirection: Direction = Direction.Right) {
    this.body = [{ ...startPosition }];
    this.direction = initialDirection;
    this.nextDirection = initialDirection;
    this.growthPending = 0;
  }

  public getBody(): Position[] {
    // TODO: Return a copy of the snake body to prevent external modification
    throw new Error('Method not implemented');
  }

  public getHead(): Position {
    // TODO: Return the position of the snake's head (first element in body array)
    throw new Error('Method not implemented');
  }

  public getTail(): Position {
    // TODO: Return the position of the snake's tail (last element in body array)
    throw new Error('Method not implemented');
  }

  public getDirection(): Direction {
    return this.direction;
  }

  public setDirection(newDirection: Direction): boolean {
    // TODO: Set the next direction for the snake
    // Validate that the new direction is not opposite to current direction
    // (snake can't immediately reverse into itself)
    // Return true if direction change is valid, false otherwise
    throw new Error('Method not implemented');
  }

  private isOppositeDirection(dir1: Direction, dir2: Direction): boolean {
    // TODO: Check if two directions are opposite
    // Up/Down and Left/Right are opposite pairs
    throw new Error('Method not implemented');
  }

  public move(): Position | null {
    // TODO: Move the snake one step in the current direction
    // 1. Update current direction to nextDirection
    // 2. Calculate new head position based on current direction
    // 3. Add new head to front of body
    // 4. If growth is pending, keep tail; otherwise remove tail
    // 5. Return the removed tail position (or null if snake grew)
    throw new Error('Method not implemented');
  }

  private getNextPosition(currentPos: Position, direction: Direction): Position {
    // TODO: Calculate the next position based on current position and direction
    // Return new position coordinates
    throw new Error('Method not implemented');
  }

  public grow(segments: number = 1): void {
    // TODO: Add segments to growth queue
    // The snake will grow by this many segments over the next moves
    throw new Error('Method not implemented');
  }

  public getLength(): number {
    return this.body.length;
  }

  public checkSelfCollision(): boolean {
    // TODO: Check if the snake's head collides with its body
    // Compare head position with all body positions (excluding head itself)
    throw new Error('Method not implemented');
  }

  public occupiesPosition(position: Position): boolean {
    // TODO: Check if the snake occupies a given position
    // Return true if any part of the snake is at this position
    throw new Error('Method not implemented');
  }

  public reset(startPosition: Position, initialDirection: Direction = Direction.Right): void {
    // TODO: Reset the snake to initial state
    // Set body to single segment at start position
    // Reset direction and growth
    throw new Error('Method not implemented');
  }

  public getBodySegments(): { head: Position; body: Position[]; tail: Position } {
    // TODO: Return snake parts for rendering
    // Useful for display logic that needs to differentiate head, body, and tail
    throw new Error('Method not implemented');
  }
}