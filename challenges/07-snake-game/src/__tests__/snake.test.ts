import { Snake } from '../snake';
import { Direction, Position } from '../types';

describe('Snake', () => {
  let snake: Snake;
  const startPos: Position = { x: 5, y: 5 };

  beforeEach(() => {
    snake = new Snake(startPos, Direction.Right);
  });

  describe('Initialization', () => {
    it('should create snake with initial position and direction', () => {
      expect(snake.getHead()).toEqual(startPos);
      expect(snake.getDirection()).toBe(Direction.Right);
      expect(snake.getLength()).toBe(1);
    });

    it('should have body with single segment initially', () => {
      const body = snake.getBody();
      expect(body).toHaveLength(1);
      expect(body[0]).toEqual(startPos);
    });
  });

  describe('Direction Changes', () => {
    it('should allow valid direction changes', () => {
      expect(snake.setDirection(Direction.Up)).toBe(true);
      expect(snake.setDirection(Direction.Down)).toBe(true);
    });

    it('should prevent opposite direction changes', () => {
      expect(snake.setDirection(Direction.Left)).toBe(false);
      snake.setDirection(Direction.Up);
      expect(snake.setDirection(Direction.Down)).toBe(false);
    });

    it('should allow same direction', () => {
      expect(snake.setDirection(Direction.Right)).toBe(true);
    });
  });

  describe('Movement', () => {
    it('should move in current direction', () => {
      const initialHead = snake.getHead();
      snake.move();

      const newHead = snake.getHead();
      expect(newHead.x).toBe(initialHead.x + 1);
      expect(newHead.y).toBe(initialHead.y);
    });

    it('should move correctly in all directions', () => {
      // Test each direction
      const directions = [
        { dir: Direction.Right, expectedX: 6, expectedY: 5 },
        { dir: Direction.Down, expectedX: 6, expectedY: 6 },
        { dir: Direction.Left, expectedX: 5, expectedY: 6 },
        { dir: Direction.Up, expectedX: 5, expectedY: 5 }
      ];

      directions.forEach(({ dir, expectedX, expectedY }) => {
        const testSnake = new Snake({ x: 5, y: 5 }, dir);
        testSnake.move();

        const head = testSnake.getHead();
        expect(head.x).toBe(expectedX);
        expect(head.y).toBe(expectedY);
      });
    });

    it('should maintain body length when not growing', () => {
      const initialLength = snake.getLength();
      snake.move();
      expect(snake.getLength()).toBe(initialLength);
    });

    it('should return tail position when not growing', () => {
      const removedTail = snake.move();
      expect(removedTail).toEqual(startPos);
    });
  });

  describe('Growth', () => {
    it('should grow by specified number of segments', () => {
      const initialLength = snake.getLength();
      snake.grow(2);

      snake.move();
      expect(snake.getLength()).toBe(initialLength + 1);

      snake.move();
      expect(snake.getLength()).toBe(initialLength + 2);

      snake.move();
      expect(snake.getLength()).toBe(initialLength + 2);
    });

    it('should return null when growing (no tail removed)', () => {
      snake.grow(1);
      const removedTail = snake.move();
      expect(removedTail).toBeNull();
    });

    it('should default to growing by 1 segment', () => {
      const initialLength = snake.getLength();
      snake.grow();

      snake.move();
      expect(snake.getLength()).toBe(initialLength + 1);
    });
  });

  describe('Collision Detection', () => {
    beforeEach(() => {
      // Create a longer snake for collision tests
      snake.grow(3);
      snake.move(); // Move to create body
      snake.setDirection(Direction.Down);
      snake.move();
      snake.setDirection(Direction.Left);
      snake.move();
    });

    it('should detect self collision', () => {
      // Move snake to create collision with body
      snake.setDirection(Direction.Up);
      snake.move();

      expect(snake.checkSelfCollision()).toBe(true);
    });

    it('should not detect collision when no collision exists', () => {
      expect(snake.checkSelfCollision()).toBe(false);
    });

    it('should check if snake occupies position', () => {
      const body = snake.getBody();

      body.forEach(segment => {
        expect(snake.occupiesPosition(segment)).toBe(true);
      });

      expect(snake.occupiesPosition({ x: 0, y: 0 })).toBe(false);
    });
  });

  describe('Body Parts', () => {
    beforeEach(() => {
      snake.grow(2);
      snake.move();
      snake.move();
    });

    it('should correctly identify head, body, and tail', () => {
      const parts = snake.getBodySegments();

      expect(parts.head).toEqual(snake.getHead());
      expect(parts.tail).toEqual(snake.getTail());
      expect(parts.body.length).toBeGreaterThan(0);
    });

    it('should return correct tail position', () => {
      const body = snake.getBody();
      const tail = snake.getTail();

      expect(tail).toEqual(body[body.length - 1]);
    });
  });

  describe('Reset', () => {
    it('should reset to initial state', () => {
      // Modify snake state
      snake.grow(3);
      snake.move();
      snake.setDirection(Direction.Up);
      snake.move();

      // Reset
      const newStartPos = { x: 10, y: 10 };
      snake.reset(newStartPos, Direction.Left);

      expect(snake.getHead()).toEqual(newStartPos);
      expect(snake.getDirection()).toBe(Direction.Left);
      expect(snake.getLength()).toBe(1);
    });

    it('should use default direction when not specified', () => {
      const newStartPos = { x: 10, y: 10 };
      snake.reset(newStartPos);

      expect(snake.getDirection()).toBe(Direction.Right);
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple direction changes in one frame', () => {
      snake.setDirection(Direction.Up);
      snake.setDirection(Direction.Left);

      // Should use the last valid direction change
      snake.move();
      const head = snake.getHead();
      expect(head.x).toBe(startPos.x - 1);
      expect(head.y).toBe(startPos.y);
    });

    it('should handle growth of zero segments', () => {
      const initialLength = snake.getLength();
      snake.grow(0);
      snake.move();

      expect(snake.getLength()).toBe(initialLength);
    });
  });
});