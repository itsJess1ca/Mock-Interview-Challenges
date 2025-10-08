import { GameBoard } from '../board';
import { BattleshipShip } from '../ship';
import { CellState, Orientation, Position } from '../types';

describe('GameBoard', () => {
  let board: GameBoard;

  beforeEach(() => {
    board = new GameBoard(10, false);
  });

  describe('Board Initialization', () => {
    it('should create board with correct size', () => {
      expect(board.size).toBe(10);
      expect(board.getBoard()).toHaveLength(10);
      expect(board.getBoard()[0]).toHaveLength(10);
    });

    it('should initialize all cells as empty', () => {
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          expect(board.getCellState({ row, col })).toBe(CellState.Empty);
        }
      }
    });

    it('should start with no ships', () => {
      expect(board.getShips()).toHaveLength(0);
      expect(board.getAliveShips()).toHaveLength(0);
      expect(board.getSunkShips()).toHaveLength(0);
    });
  });

  describe('Ship Placement', () => {
    let destroyer: BattleshipShip;

    beforeEach(() => {
      destroyer = new BattleshipShip('1', 'Destroyer', 2);
    });

    it('should place ship successfully in valid position', () => {
      const result = board.placeShip(destroyer, { row: 5, col: 3 }, Orientation.Horizontal);

      expect(result.success).toBe(true);
      expect(board.getShips()).toHaveLength(1);
      expect(board.getCellState({ row: 5, col: 3 })).toBe(CellState.Ship);
      expect(board.getCellState({ row: 5, col: 4 })).toBe(CellState.Ship);
    });

    it('should reject placement outside board boundaries', () => {
      const result = board.placeShip(destroyer, { row: 9, col: 9 }, Orientation.Horizontal);
      expect(result.success).toBe(false);
    });

    it('should reject overlapping ship placement', () => {
      board.placeShip(destroyer, { row: 2, col: 2 }, Orientation.Horizontal);

      const destroyer2 = new BattleshipShip('2', 'Destroyer2', 2);
      const result = board.placeShip(destroyer2, { row: 2, col: 3 }, Orientation.Vertical);

      expect(result.success).toBe(false);
      expect(board.getShips()).toHaveLength(1);
    });

    it('should handle vertical placement', () => {
      const carrier = new BattleshipShip('carrier', 'Carrier', 5);
      const result = board.placeShip(carrier, { row: 0, col: 0 }, Orientation.Vertical);

      expect(result.success).toBe(true);
      for (let row = 0; row < 5; row++) {
        expect(board.getCellState({ row, col: 0 })).toBe(CellState.Ship);
      }
    });
  });

  describe('Adjacency Rules', () => {
    let strictBoard: GameBoard;

    beforeEach(() => {
      strictBoard = new GameBoard(10, false); // No adjacent ships allowed
    });

    it('should prevent adjacent ship placement when disabled', () => {
      const ship1 = new BattleshipShip('1', 'Ship1', 2);
      const ship2 = new BattleshipShip('2', 'Ship2', 2);

      strictBoard.placeShip(ship1, { row: 2, col: 2 }, Orientation.Horizontal);
      const result = strictBoard.placeShip(ship2, { row: 1, col: 2 }, Orientation.Horizontal);

      expect(result.success).toBe(false);
    });

    it('should allow adjacent ship placement when enabled', () => {
      const permissiveBoard = new GameBoard(10, true);
      const ship1 = new BattleshipShip('1', 'Ship1', 2);
      const ship2 = new BattleshipShip('2', 'Ship2', 2);

      permissiveBoard.placeShip(ship1, { row: 2, col: 2 }, Orientation.Horizontal);
      const result = permissiveBoard.placeShip(ship2, { row: 1, col: 2 }, Orientation.Horizontal);

      expect(result.success).toBe(true);
    });

    it('should check all 8 directions for adjacency', () => {
      const ship1 = new BattleshipShip('1', 'Ship1', 1);
      const ship2 = new BattleshipShip('2', 'Ship2', 1);

      strictBoard.placeShip(ship1, { row: 5, col: 5 }, Orientation.Horizontal);

      // Test all 8 adjacent positions
      const adjacentPositions = [
        { row: 4, col: 4 }, { row: 4, col: 5 }, { row: 4, col: 6 },
        { row: 5, col: 4 }, /* ship at 5,5 */ { row: 5, col: 6 },
        { row: 6, col: 4 }, { row: 6, col: 5 }, { row: 6, col: 6 }
      ];

      adjacentPositions.forEach((pos, index) => {
        const testShip = new BattleshipShip(`test${index}`, 'Test', 1);
        const result = strictBoard.placeShip(testShip, pos, Orientation.Horizontal);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Attack Processing', () => {
    let destroyer: BattleshipShip;

    beforeEach(() => {
      destroyer = new BattleshipShip('1', 'Destroyer', 2);
      board.placeShip(destroyer, { row: 3, col: 3 }, Orientation.Horizontal);
    });

    it('should register hit on ship', () => {
      const result = board.attack({ row: 3, col: 3 });

      expect(result.hit).toBe(true);
      expect(result.sunk).toBe(false);
      expect(result.gameOver).toBe(false);
      expect(board.getCellState({ row: 3, col: 3 })).toBe(CellState.Hit);
    });

    it('should register miss on empty cell', () => {
      const result = board.attack({ row: 0, col: 0 });

      expect(result.hit).toBe(false);
      expect(result.sunk).toBe(false);
      expect(result.gameOver).toBe(false);
      expect(board.getCellState({ row: 0, col: 0 })).toBe(CellState.Miss);
    });

    it('should detect ship sinking', () => {
      board.attack({ row: 3, col: 3 });
      const result = board.attack({ row: 3, col: 4 });

      expect(result.hit).toBe(true);
      expect(result.sunk).toBe(true);
      expect(result.shipName).toBe('Destroyer');
      expect(board.getCellState({ row: 3, col: 3 })).toBe(CellState.Sunk);
      expect(board.getCellState({ row: 3, col: 4 })).toBe(CellState.Sunk);
    });

    it('should detect game over when all ships sunk', () => {
      board.attack({ row: 3, col: 3 });
      const result = board.attack({ row: 3, col: 4 });

      expect(result.gameOver).toBe(true);
      expect(board.getSunkShips()).toHaveLength(1);
      expect(board.getAliveShips()).toHaveLength(0);
    });

    it('should reject attack on already attacked position', () => {
      board.attack({ row: 3, col: 3 });

      expect(() => {
        board.attack({ row: 3, col: 3 });
      }).toThrow();
    });

    it('should reject attack outside board boundaries', () => {
      expect(() => {
        board.attack({ row: -1, col: 0 });
      }).toThrow();

      expect(() => {
        board.attack({ row: 10, col: 0 });
      }).toThrow();
    });
  });

  describe('Board Queries', () => {
    beforeEach(() => {
      const destroyer = new BattleshipShip('1', 'Destroyer', 2);
      const cruiser = new BattleshipShip('2', 'Cruiser', 3);

      board.placeShip(destroyer, { row: 1, col: 1 }, Orientation.Horizontal);
      board.placeShip(cruiser, { row: 5, col: 2 }, Orientation.Vertical);

      // Some attacks
      board.attack({ row: 1, col: 1 }); // Hit destroyer
      board.attack({ row: 0, col: 0 }); // Miss
      board.attack({ row: 5, col: 2 }); // Hit cruiser
    });

    it('should return valid targets', () => {
      const validTargets = board.getValidTargets();

      expect(validTargets.length).toBeLessThan(100); // Some positions attacked
      expect(validTargets).not.toContainEqual({ row: 1, col: 1 }); // Hit position
      expect(validTargets).not.toContainEqual({ row: 0, col: 0 }); // Miss position
      expect(validTargets).toContainEqual({ row: 9, col: 9 }); // Unattacked position
    });

    it('should return hit positions', () => {
      const hitPositions = board.getHitPositions();

      expect(hitPositions).toContainEqual({ row: 1, col: 1 });
      expect(hitPositions).toContainEqual({ row: 5, col: 2 });
      expect(hitPositions).toHaveLength(2);
    });

    it('should return miss positions', () => {
      const missPositions = board.getMissPositions();

      expect(missPositions).toContainEqual({ row: 0, col: 0 });
      expect(missPositions).toHaveLength(1);
    });

    it('should check if position is attacked', () => {
      expect(board.isPositionAttacked({ row: 1, col: 1 })).toBe(true);
      expect(board.isPositionAttacked({ row: 0, col: 0 })).toBe(true);
      expect(board.isPositionAttacked({ row: 9, col: 9 })).toBe(false);
    });

    it('should find ship by position', () => {
      const ship = board.getShipByPosition({ row: 1, col: 2 });
      expect(ship?.getName()).toBe('Destroyer');

      const noShip = board.getShipByPosition({ row: 0, col: 0 });
      expect(noShip).toBeNull();
    });
  });

  describe('Ship Management', () => {
    it('should remove ship correctly', () => {
      const destroyer = new BattleshipShip('destroyer', 'Destroyer', 2);
      board.placeShip(destroyer, { row: 2, col: 2 }, Orientation.Horizontal);

      const removed = board.removeShip('destroyer');

      expect(removed).toBe(true);
      expect(board.getShips()).toHaveLength(0);
      expect(board.getCellState({ row: 2, col: 2 })).toBe(CellState.Empty);
      expect(board.getCellState({ row: 2, col: 3 })).toBe(CellState.Empty);
    });

    it('should return false when removing non-existent ship', () => {
      const removed = board.removeShip('nonexistent');
      expect(removed).toBe(false);
    });

    it('should check if ship can be placed', () => {
      const destroyer = new BattleshipShip('1', 'Destroyer', 2);

      expect(board.canPlaceShip(destroyer, { row: 0, col: 0 }, Orientation.Horizontal)).toBe(true);
      expect(board.canPlaceShip(destroyer, { row: 0, col: 9 }, Orientation.Horizontal)).toBe(false);
    });
  });

  describe('Board Statistics', () => {
    it('should provide ship statistics', () => {
      const destroyer = new BattleshipShip('1', 'Destroyer', 2);
      const cruiser = new BattleshipShip('2', 'Cruiser', 3);

      board.placeShip(destroyer, { row: 1, col: 1 }, Orientation.Horizontal);
      board.placeShip(cruiser, { row: 5, col: 2 }, Orientation.Vertical);

      // Sink destroyer
      board.attack({ row: 1, col: 1 });
      board.attack({ row: 1, col: 2 });

      const stats = board.getShipStats();
      expect(stats.total).toBe(2);
      expect(stats.alive).toBe(1);
      expect(stats.sunk).toBe(1);
    });
  });

  describe('Board Reset and Cloning', () => {
    it('should reset board to initial state', () => {
      const destroyer = new BattleshipShip('1', 'Destroyer', 2);
      board.placeShip(destroyer, { row: 2, col: 2 }, Orientation.Horizontal);
      board.attack({ row: 0, col: 0 });

      board.reset();

      expect(board.getShips()).toHaveLength(0);
      expect(board.getCellState({ row: 2, col: 2 })).toBe(CellState.Empty);
      expect(board.getCellState({ row: 0, col: 0 })).toBe(CellState.Empty);
    });

    it('should create independent clone', () => {
      const destroyer = new BattleshipShip('1', 'Destroyer', 2);
      board.placeShip(destroyer, { row: 2, col: 2 }, Orientation.Horizontal);

      const clone = board.clone();

      expect(clone.getShips()).toHaveLength(1);

      // Modify original
      board.attack({ row: 2, col: 2 });

      // Clone should be unaffected
      expect(clone.getCellState({ row: 2, col: 2 })).toBe(CellState.Ship);
      expect(board.getCellState({ row: 2, col: 2 })).toBe(CellState.Hit);
    });
  });

  describe('Different Board Sizes', () => {
    it('should handle smaller boards', () => {
      const smallBoard = new GameBoard(5);
      expect(smallBoard.size).toBe(5);
      expect(smallBoard.getBoard()).toHaveLength(5);

      const destroyer = new BattleshipShip('1', 'Destroyer', 2);
      const result = smallBoard.placeShip(destroyer, { row: 3, col: 3 }, Orientation.Horizontal);
      expect(result.success).toBe(true);

      // Should reject placement that goes outside
      const cruiser = new BattleshipShip('2', 'Cruiser', 3);
      const badResult = smallBoard.placeShip(cruiser, { row: 4, col: 3 }, Orientation.Horizontal);
      expect(badResult.success).toBe(false);
    });
  });
});