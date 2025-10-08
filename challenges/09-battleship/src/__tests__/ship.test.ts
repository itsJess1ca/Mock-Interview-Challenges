import { BattleshipShip } from '../ship';
import { Orientation, Position } from '../types';

describe('BattleshipShip', () => {
  let ship: BattleshipShip;

  beforeEach(() => {
    ship = new BattleshipShip('1', 'Destroyer', 2);
  });

  describe('Ship Creation', () => {
    it('should create ship with correct properties', () => {
      expect(ship.getId()).toBe('1');
      expect(ship.getName()).toBe('Destroyer');
      expect(ship.getLength()).toBe(2);
      expect(ship.isPlaced()).toBe(false);
      expect(ship.isSunk).toBe(false);
    });

    it('should initialize with empty positions', () => {
      expect(ship.getPositions()).toHaveLength(0);
      expect(ship.hits).toEqual([false, false]);
    });
  });

  describe('Ship Placement', () => {
    it('should place ship horizontally', () => {
      const startPos: Position = { row: 5, col: 3 };
      ship.place(startPos, Orientation.Horizontal);

      expect(ship.isPlaced()).toBe(true);
      expect(ship.getOrientation()).toBe(Orientation.Horizontal);
      expect(ship.getPositions()).toHaveLength(2);
      expect(ship.getPositions()).toContainEqual({ row: 5, col: 3 });
      expect(ship.getPositions()).toContainEqual({ row: 5, col: 4 });
    });

    it('should place ship vertically', () => {
      const startPos: Position = { row: 2, col: 7 };
      ship.place(startPos, Orientation.Vertical);

      expect(ship.getOrientation()).toBe(Orientation.Vertical);
      expect(ship.getPositions()).toContainEqual({ row: 2, col: 7 });
      expect(ship.getPositions()).toContainEqual({ row: 3, col: 7 });
    });

    it('should reset hits when placed', () => {
      ship.hits[0] = true; // Simulate previous damage
      ship.place({ row: 0, col: 0 }, Orientation.Horizontal);

      expect(ship.hits).toEqual([false, false]);
      expect(ship.isSunk).toBe(false);
    });
  });

  describe('Position Checking', () => {
    beforeEach(() => {
      ship.place({ row: 3, col: 2 }, Orientation.Horizontal);
    });

    it('should correctly identify occupied positions', () => {
      expect(ship.occupiesPosition({ row: 3, col: 2 })).toBe(true);
      expect(ship.occupiesPosition({ row: 3, col: 3 })).toBe(true);
      expect(ship.occupiesPosition({ row: 3, col: 4 })).toBe(false);
      expect(ship.occupiesPosition({ row: 2, col: 2 })).toBe(false);
    });
  });

  describe('Hit Processing', () => {
    beforeEach(() => {
      ship.place({ row: 1, col: 1 }, Orientation.Vertical);
    });

    it('should register valid hits', () => {
      const hit1 = ship.hit({ row: 1, col: 1 });
      const hit2 = ship.hit({ row: 2, col: 1 });

      expect(hit1).toBe(true);
      expect(hit2).toBe(true);
      expect(ship.getHitCount()).toBe(2);
    });

    it('should reject invalid hits', () => {
      const hit = ship.hit({ row: 0, col: 0 });
      expect(hit).toBe(false);
      expect(ship.getHitCount()).toBe(0);
    });

    it('should track hit positions correctly', () => {
      ship.hit({ row: 1, col: 1 });

      const hitPositions = ship.getHitPositions();
      const unhitPositions = ship.getUnhitPositions();

      expect(hitPositions).toContainEqual({ row: 1, col: 1 });
      expect(hitPositions).toHaveLength(1);
      expect(unhitPositions).toContainEqual({ row: 2, col: 1 });
      expect(unhitPositions).toHaveLength(1);
    });

    it('should not register duplicate hits', () => {
      ship.hit({ row: 1, col: 1 });
      ship.hit({ row: 1, col: 1 }); // Same position again

      expect(ship.getHitCount()).toBe(1);
    });
  });

  describe('Sinking Logic', () => {
    beforeEach(() => {
      ship.place({ row: 0, col: 0 }, Orientation.Horizontal);
    });

    it('should not be sunk with partial damage', () => {
      ship.hit({ row: 0, col: 0 });

      expect(ship.isSunk).toBe(false);
      expect(ship.getIntegrityPercentage()).toBe(50);
    });

    it('should be sunk when all segments are hit', () => {
      ship.hit({ row: 0, col: 0 });
      ship.hit({ row: 0, col: 1 });

      expect(ship.isSunk).toBe(true);
      expect(ship.getIntegrityPercentage()).toBe(0);
    });

    it('should calculate integrity percentage correctly', () => {
      const largeShip = new BattleshipShip('2', 'Carrier', 5);
      largeShip.place({ row: 0, col: 0 }, Orientation.Horizontal);

      expect(largeShip.getIntegrityPercentage()).toBe(100);

      largeShip.hit({ row: 0, col: 0 });
      expect(largeShip.getIntegrityPercentage()).toBe(80);

      largeShip.hit({ row: 0, col: 1 });
      largeShip.hit({ row: 0, col: 2 });
      expect(largeShip.getIntegrityPercentage()).toBe(40);
    });
  });

  describe('Ship Reset', () => {
    it('should reset to initial state', () => {
      ship.place({ row: 5, col: 5 }, Orientation.Vertical);
      ship.hit({ row: 5, col: 5 });

      ship.reset();

      expect(ship.isPlaced()).toBe(false);
      expect(ship.getPositions()).toHaveLength(0);
      expect(ship.hits).toEqual([false, false]);
      expect(ship.isSunk).toBe(false);
      expect(ship.getHitCount()).toBe(0);
    });
  });

  describe('Ship Cloning', () => {
    it('should create independent copy', () => {
      ship.place({ row: 2, col: 3 }, Orientation.Horizontal);
      ship.hit({ row: 2, col: 3 });

      const clone = ship.clone();

      expect(clone.getId()).toBe(ship.getId());
      expect(clone.getName()).toBe(ship.getName());
      expect(clone.getLength()).toBe(ship.getLength());
      expect(clone.getPositions()).toEqual(ship.getPositions());
      expect(clone.getHitCount()).toBe(ship.getHitCount());

      // Verify independence
      clone.hit({ row: 2, col: 4 });
      expect(clone.getHitCount()).toBe(2);
      expect(ship.getHitCount()).toBe(1);
    });
  });

  describe('Large Ships', () => {
    it('should handle carrier placement and hits', () => {
      const carrier = new BattleshipShip('carrier', 'Carrier', 5);
      carrier.place({ row: 0, col: 0 }, Orientation.Horizontal);

      expect(carrier.getPositions()).toHaveLength(5);
      expect(carrier.getPositions()).toContainEqual({ row: 0, col: 0 });
      expect(carrier.getPositions()).toContainEqual({ row: 0, col: 4 });

      // Hit multiple times
      for (let i = 0; i < 4; i++) {
        carrier.hit({ row: 0, col: i });
      }

      expect(carrier.isSunk).toBe(false);
      expect(carrier.getIntegrityPercentage()).toBe(20);

      carrier.hit({ row: 0, col: 4 });
      expect(carrier.isSunk).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum ship size', () => {
      const miniShip = new BattleshipShip('mini', 'Mini', 1);
      miniShip.place({ row: 5, col: 5 }, Orientation.Horizontal);

      expect(miniShip.getPositions()).toHaveLength(1);
      expect(miniShip.occupiesPosition({ row: 5, col: 5 })).toBe(true);

      miniShip.hit({ row: 5, col: 5 });
      expect(miniShip.isSunk).toBe(true);
    });

    it('should handle hits on unplaced ship', () => {
      const hit = ship.hit({ row: 0, col: 0 });
      expect(hit).toBe(false);
    });

    it('should handle position check on unplaced ship', () => {
      const occupies = ship.occupiesPosition({ row: 0, col: 0 });
      expect(occupies).toBe(false);
    });
  });
});