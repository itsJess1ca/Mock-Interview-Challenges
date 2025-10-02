import { DisplayManager } from '../display';
import { GameState, Board } from '../types';

// Mock console.log for testing
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleClear = jest.spyOn(console, 'clear').mockImplementation();

describe('DisplayManager', () => {
  let display: DisplayManager;

  beforeEach(() => {
    display = new DisplayManager();
    mockConsoleLog.mockClear();
    mockConsoleClear.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockConsoleClear.mockRestore();
  });

  describe('showBoard', () => {
    it('should display a board without throwing errors', () => {
      const board: Board = [
        [2, 4, 0, 0],
        [0, 8, 16, 0],
        [0, 0, 32, 64],
        [0, 0, 0, 128]
      ];

      expect(() => display.showBoard(board)).not.toThrow();
      expect(mockConsoleLog).toHaveBeenCalled();
    });

    it('should display an empty board', () => {
      const emptyBoard: Board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];

      expect(() => display.showBoard(emptyBoard)).not.toThrow();
    });

    it('should display a full board', () => {
      const fullBoard: Board = [
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [512, 1024, 2048, 4096],
        [2, 4, 8, 16]
      ];

      expect(() => display.showBoard(fullBoard)).not.toThrow();
    });

    it('should include box drawing characters', () => {
      const board: Board = [
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];

      display.showBoard(board);

      // Check that box drawing characters are used
      const calls = mockConsoleLog.mock.calls.map(call => call[0]);
      expect(calls.some(call => call.includes('┌'))).toBe(true);
      expect(calls.some(call => call.includes('└'))).toBe(true);
    });
  });

  describe('showGameState', () => {
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

      expect(() => display.showGameState(gameState)).not.toThrow();
      expect(mockConsoleLog).toHaveBeenCalled();
    });

    it('should display score', () => {
      const gameState: GameState = {
        board: [
          [2, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        score: 1234,
        isGameOver: false,
        hasWon: false,
        canMove: true
      };

      display.showGameState(gameState);

      const calls = mockConsoleLog.mock.calls.map(call => call[0]);
      expect(calls.some(call => call.includes('1234'))).toBe(true);
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

      expect(() => display.showGameState(winState)).not.toThrow();
      const calls = mockConsoleLog.mock.calls.map(call => call[0]);
      expect(calls.some(call => call.includes('Congratulations'))).toBe(true);
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

      expect(() => display.showGameState(gameOverState)).not.toThrow();
      const calls = mockConsoleLog.mock.calls.map(call => call[0]);
      expect(calls.some(call => call.includes('Game Over'))).toBe(true);
    });
  });

  describe('showInstructions', () => {
    it('should display instructions without throwing errors', () => {
      expect(() => display.showInstructions()).not.toThrow();
      expect(mockConsoleLog).toHaveBeenCalled();
    });

    it('should include control information', () => {
      display.showInstructions();

      const calls = mockConsoleLog.mock.calls.map(call => call[0]);
      const allOutput = calls.join(' ');
      expect(allOutput).toMatch(/WASD|arrow/i);
      expect(allOutput).toMatch(/quit|Q/i);
      expect(allOutput).toMatch(/restart|R/i);
    });
  });

  describe('clear', () => {
    it('should call console.clear', () => {
      display.clear();
      expect(mockConsoleClear).toHaveBeenCalledTimes(1);
    });
  });

  describe('showWinMessage', () => {
    it('should display win message', () => {
      display.showWinMessage();

      const calls = mockConsoleLog.mock.calls.map(call => call[0]);
      const allOutput = calls.join(' ');
      expect(allOutput).toMatch(/congratulations|2048/i);
    });
  });

  describe('showGameOverMessage', () => {
    it('should display game over message', () => {
      display.showGameOverMessage();

      const calls = mockConsoleLog.mock.calls.map(call => call[0]);
      const allOutput = calls.join(' ');
      expect(allOutput).toMatch(/game over|no more moves/i);
    });
  });
});
