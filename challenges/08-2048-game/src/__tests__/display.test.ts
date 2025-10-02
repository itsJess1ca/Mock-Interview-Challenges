import { displayBoard, displayGameState, formatCellValue } from '../display';
import { GameState, EMPTY_CELL, Board } from '../types';

// Mock console.log for testing
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

describe('Display Functions', () => {
  beforeEach(() => {
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  describe('formatCellValue', () => {
    it('should format empty cells correctly', () => {
      const result = formatCellValue(EMPTY_CELL);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0); // Should return some string representation
    });

    it('should format number cells with proper padding', () => {
      expect(formatCellValue(2)).toMatch(/^\s*2\s*$/);
      expect(formatCellValue(2048)).toMatch(/^\s*2048\s*$/);
    });

    it('should handle all valid cell values', () => {
      const validValues = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];

      validValues.forEach(value => {
        expect(() => formatCellValue(value as any)).not.toThrow();
      });
    });
  });

  describe('displayBoard', () => {
    it('should display a board without throwing errors', () => {
      const board: Board = [
        [2, 4, 0, 0],
        [0, 8, 16, 0],
        [0, 0, 32, 64],
        [0, 0, 0, 128]
      ];

      expect(() => displayBoard(board)).not.toThrow();
      expect(mockConsoleLog).toHaveBeenCalled();
    });

    it('should display an empty board', () => {
      const emptyBoard: Board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];

      expect(() => displayBoard(emptyBoard)).not.toThrow();
    });

    it('should display a full board', () => {
      const fullBoard: Board = [
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [512, 1024, 2048, 4096],
        [2, 4, 8, 16]
      ];

      expect(() => displayBoard(fullBoard)).not.toThrow();
    });
  });

  describe('displayGameState', () => {
    it('should display game state without throwing errors', () => {
      const gameState: GameState = {
        board: [
          [2, 4, 0, 0],
          [0, 8, 16, 0],
          [0, 0, 32, 64],
          [0, 0, 0, 128]
        ],
        score: 1234,
        isGameOver: false,
        hasWon: false,
        canMove: true
      };

      expect(() => displayGameState(gameState)).not.toThrow();
      expect(mockConsoleLog).toHaveBeenCalled();
    });

    it('should display win state correctly', () => {
      const winState: GameState = {
        board: [
          [2, 4, 0, 0],
          [0, 8, 16, 0],
          [0, 0, 2048, 64],
          [0, 0, 0, 128]
        ],
        score: 5000,
        isGameOver: false,
        hasWon: true,
        canMove: true
      };

      expect(() => displayGameState(winState)).not.toThrow();
    });

    it('should display game over state correctly', () => {
      const gameOverState: GameState = {
        board: [
          [2, 4, 2, 4],
          [4, 2, 4, 2],
          [2, 4, 2, 4],
          [4, 2, 4, 2]
        ],
        score: 1000,
        isGameOver: true,
        hasWon: false,
        canMove: false
      };

      expect(() => displayGameState(gameOverState)).not.toThrow();
    });
  });
});
