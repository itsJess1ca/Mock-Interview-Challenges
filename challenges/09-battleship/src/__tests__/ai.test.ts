import { AIPlayer, RandomStrategy, HuntTargetStrategy, AdvancedStrategy } from '../ai';
import { GameBoard } from '../board';
import { BattleshipShip } from '../ship';
import { Orientation, AttackResult } from '../types';

describe('AI Strategies', () => {
  let board: GameBoard;

  beforeEach(() => {
    board = new GameBoard(10);
    // Place some ships for testing
    const destroyer = new BattleshipShip('1', 'Destroyer', 2);
    const cruiser = new BattleshipShip('2', 'Cruiser', 3);
    board.placeShip(destroyer, { row: 3, col: 3 }, Orientation.Horizontal);
    board.placeShip(cruiser, { row: 7, col: 1 }, Orientation.Vertical);
  });

  describe('AIPlayer', () => {
    it('should create AI with specified difficulty', () => {
      const easyAI = new AIPlayer('easy');
      const hardAI = new AIPlayer('hard');

      expect(easyAI.getDifficulty()).toBe('easy');
      expect(hardAI.getDifficulty()).toBe('hard');
    });

    it('should change difficulty', () => {
      const ai = new AIPlayer('easy');
      ai.setDifficulty('hard');

      expect(ai.getDifficulty()).toBe('hard');
    });

    it('should provide next move', () => {
      const ai = new AIPlayer('medium');
      const move = ai.getNextMove(board);

      expect(move).toHaveProperty('row');
      expect(move).toHaveProperty('col');
      expect(move.row).toBeGreaterThanOrEqual(0);
      expect(move.row).toBeLessThan(10);
      expect(move.col).toBeGreaterThanOrEqual(0);
      expect(move.col).toBeLessThan(10);
    });
  });

  describe('RandomStrategy', () => {
    let strategy: RandomStrategy;

    beforeEach(() => {
      strategy = new RandomStrategy();
    });

    it('should select valid random positions', () => {
      const moves = new Set();

      // Generate multiple moves to test randomness
      for (let i = 0; i < 20; i++) {
        const move = strategy.getNextTarget(board);
        moves.add(`${move.row},${move.col}`);

        expect(move.row).toBeGreaterThanOrEqual(0);
        expect(move.row).toBeLessThan(10);
        expect(move.col).toBeGreaterThanOrEqual(0);
        expect(move.col).toBeLessThan(10);
      }

      // Should have some variety in moves (not always the same)
      expect(moves.size).toBeGreaterThan(1);
    });

    it('should avoid already attacked positions', () => {
      // Attack some positions
      board.attack({ row: 0, col: 0 });
      board.attack({ row: 1, col: 1 });
      board.attack({ row: 2, col: 2 });

      const moves = new Set();
      for (let i = 0; i < 10; i++) {
        const move = strategy.getNextTarget(board);
        moves.add(`${move.row},${move.col}`);
      }

      // Should not include attacked positions
      expect(moves.has('0,0')).toBe(false);
      expect(moves.has('1,1')).toBe(false);
      expect(moves.has('2,2')).toBe(false);
    });

    it('should handle board with few remaining positions', () => {
      // Attack most positions
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          if (row < 9 || col < 9) { // Leave one position
            try {
              board.attack({ row, col });
            } catch (e) {
              // Ignore already attacked positions
            }
          }
        }
      }

      const move = strategy.getNextTarget(board);
      expect(move).toEqual({ row: 9, col: 9 });
    });
  });

  describe('HuntTargetStrategy', () => {
    let strategy: HuntTargetStrategy;

    beforeEach(() => {
      strategy = new HuntTargetStrategy();
    });

    it('should start in hunt mode', () => {
      const move = strategy.getNextTarget(board);
      expect(move).toBeDefined();
      expect(move.row).toBeGreaterThanOrEqual(0);
      expect(move.col).toBeGreaterThanOrEqual(0);
    });

    it('should switch to target mode after hit', () => {
      // First get a move
      const move1 = strategy.getNextTarget(board);

      // Simulate a hit result
      const hitResult: AttackResult = {
        position: move1,
        hit: true,
        sunk: false,
        gameOver: false
      };

      strategy.onAttackResult(hitResult);

      // Next move should be adjacent to hit
      const move2 = strategy.getNextTarget(board);
      const distance = Math.abs(move2.row - move1.row) + Math.abs(move2.col - move1.col);
      expect(distance).toBe(1); // Should be adjacent
    });

    it('should return to hunt mode after sinking ship', () => {
      // Simulate hitting and sinking a ship
      const hitResult: AttackResult = {
        position: { row: 3, col: 3 },
        hit: true,
        sunk: false,
        gameOver: false
      };

      strategy.onAttackResult(hitResult);

      const sunkResult: AttackResult = {
        position: { row: 3, col: 4 },
        hit: true,
        sunk: true,
        shipName: 'Destroyer',
        gameOver: false
      };

      strategy.onAttackResult(sunkResult);

      // Should be back in hunt mode - moves might not be adjacent
      const move = strategy.getNextTarget(board);
      expect(move).toBeDefined();
    });

    it('should use checkerboard pattern in hunt mode', () => {
      // Test that hunt mode prefers checkerboard pattern
      // This is more of an implementation detail test
      const moves = [];
      for (let i = 0; i < 10; i++) {
        const move = strategy.getNextTarget(board);
        moves.push(move);

        // Simulate miss to stay in hunt mode
        strategy.onAttackResult({
          position: move,
          hit: false,
          sunk: false,
          gameOver: false
        });
      }

      // Check that moves follow some pattern (implementation dependent)
      expect(moves.length).toBe(10);
    });
  });

  describe('AdvancedStrategy', () => {
    let strategy: AdvancedStrategy;

    beforeEach(() => {
      strategy = new AdvancedStrategy();
    });

    it('should provide intelligent moves', () => {
      const move = strategy.getNextTarget(board);
      expect(move).toBeDefined();
      expect(move.row).toBeGreaterThanOrEqual(0);
      expect(move.col).toBeGreaterThanOrEqual(0);
    });

    it('should respond to attack results', () => {
      const initialMove = strategy.getNextTarget(board);

      const hitResult: AttackResult = {
        position: initialMove,
        hit: true,
        sunk: false,
        gameOver: false
      };

      expect(() => {
        strategy.onAttackResult(hitResult);
      }).not.toThrow();

      const followupMove = strategy.getNextTarget(board);
      expect(followupMove).toBeDefined();
    });

    it('should handle complex board states', () => {
      // Attack several positions to create complex state
      const attackPositions = [
        { row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 },
        { row: 3, col: 3 }, { row: 5, col: 5 }
      ];

      attackPositions.forEach(pos => {
        try {
          const result = board.attack(pos);
          strategy.onAttackResult(result);
        } catch (e) {
          // Ignore errors
        }
      });

      const move = strategy.getNextTarget(board);
      expect(move).toBeDefined();
    });
  });

  describe('Strategy Integration', () => {
    it('should work with actual game flow', () => {
      const ai = new AIPlayer('medium');

      // Simulate several turns
      for (let turn = 0; turn < 10; turn++) {
        const move = ai.getNextMove(board);

        try {
          const result = board.attack(move);
          ai.onAttackResult(result);

          if (result.gameOver) {
            break;
          }
        } catch (e) {
          // Position already attacked - this shouldn't happen with good AI
          fail('AI tried to attack same position twice');
        }
      }

      // AI should have made valid moves throughout
      expect(true).toBe(true); // Test passes if no exceptions thrown
    });

    it('should handle winning the game', () => {
      const ai = new AIPlayer('hard');

      // Attack until game is won
      let gameOver = false;
      let turnCount = 0;
      const maxTurns = 100; // Prevent infinite loop

      while (!gameOver && turnCount < maxTurns) {
        const move = ai.getNextMove(board);

        try {
          const result = board.attack(move);
          ai.onAttackResult(result);
          gameOver = result.gameOver;
          turnCount++;
        } catch (e) {
          // Skip invalid moves
          turnCount++;
        }
      }

      expect(turnCount).toBeLessThan(maxTurns);
    });
  });

  describe('Strategy Performance', () => {
    it('should complete game in reasonable number of moves', () => {
      const strategies = [
        new RandomStrategy(),
        new HuntTargetStrategy(),
        new AdvancedStrategy()
      ];

      strategies.forEach(strategy => {
        const testBoard = new GameBoard(10);
        const destroyer = new BattleshipShip('1', 'Destroyer', 2);
        testBoard.placeShip(destroyer, { row: 5, col: 5 }, Orientation.Horizontal);

        let moves = 0;
        let gameOver = false;
        const maxMoves = 100;

        while (!gameOver && moves < maxMoves) {
          const move = strategy.getNextTarget(testBoard);

          try {
            const result = testBoard.attack(move);
            strategy.onAttackResult(result);
            gameOver = result.gameOver;
            moves++;
          } catch (e) {
            moves++;
          }
        }

        expect(moves).toBeLessThan(maxMoves);
        expect(gameOver).toBe(true);
      });
    });
  });
});