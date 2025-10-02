import { Game2048 } from '../game2048';
import { Board, BOARD_SIZE, EMPTY_CELL, WIN_TILE } from '../types';

describe('Game2048', () => {
  let game: Game2048;

  beforeEach(() => {
    game = new Game2048();
  });

  describe('createEmptyBoard', () => {
    it('should create a 4x4 board filled with empty cells', () => {
      const board = game['createEmptyBoard'](); // Access private method for testing

      expect(board).toHaveLength(BOARD_SIZE);
      expect(board[0]).toHaveLength(BOARD_SIZE);

      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          expect(board[row][col]).toBe(EMPTY_CELL);
        }
      }
    });
  });

  describe('addRandomTile', () => {
    it('should add a tile to an empty board', () => {
      const emptyBoard = game['createEmptyBoard'](); // Access private method for testing
      game['board'] = emptyBoard;

      const result = game.addRandomTile();

      expect(result).toBe(true);

      // Count non-empty cells
      let tileCount = 0;
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          if (game['board'][row][col] !== EMPTY_CELL) {
            tileCount++;
          }
        }
      }

      expect(tileCount).toBe(1);
    });

    it('should add a tile with value 2 or 4', () => {
      const emptyBoard = game['createEmptyBoard']();
      game['board'] = emptyBoard;

      game.addRandomTile();

      let foundTile = false;
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          const cell = game['board'][row][col];
          if (cell !== EMPTY_CELL) {
            expect([2, 4]).toContain(cell);
            foundTile = true;
          }
        }
      }

      expect(foundTile).toBe(true);
    });

    it('should return false when board is full', () => {
      // Fill the board
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          game['board'][row][col] = 2;
        }
      }

      const result = game.addRandomTile();
      expect(result).toBe(false);
    });
  });

  describe('makeMove', () => {
    it('should return moved: false when no tiles can move', () => {
      // Create a board where no moves are possible
      game['board'] = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2]
      ];

      const result = game.makeMove('left');
      expect(result.moved).toBe(false);
    });

    it('should increase score when tiles merge', () => {
      game['board'] = [
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];

      const initialScore = game['score'];
      const result = game.makeMove('left');

      expect(result.moved).toBe(true);
      expect(result.score).toBeGreaterThan(initialScore);
    });
  });

  describe('canMove', () => {
    it('should return true when there are empty cells', () => {
      game['board'] = [
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];

      expect(game.canMove()).toBe(true);
    });

    it('should return true when adjacent tiles can merge', () => {
      game['board'] = [
        [2, 2, 4, 8],
        [4, 8, 2, 4],
        [8, 4, 8, 2],
        [2, 8, 4, 8]
      ];

      expect(game.canMove()).toBe(true);
    });

    it('should return false when no moves are possible', () => {
      game['board'] = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2]
      ];

      expect(game.canMove()).toBe(false);
    });
  });

  describe('checkWin', () => {
    it('should return true when 2048 tile is present', () => {
      game['board'] = [
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [512, 1024, WIN_TILE, 0],
        [0, 0, 0, 0]
      ];

      expect(game.checkWin()).toBe(true);
    });

    it('should return false when no 2048 tile is present', () => {
      game['board'] = [
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [512, 1024, 0, 0],
        [0, 0, 0, 0]
      ];

      expect(game.checkWin()).toBe(false);
    });
  });

  describe('getGameState', () => {
    it('should return the current game state', () => {
      const gameState = game.getGameState();

      expect(gameState).toHaveProperty('board');
      expect(gameState).toHaveProperty('score');
      expect(gameState).toHaveProperty('isGameOver');
      expect(gameState).toHaveProperty('hasWon');
      expect(gameState).toHaveProperty('canMove');

      expect(gameState.board).toHaveLength(BOARD_SIZE);
      expect(typeof gameState.score).toBe('number');
      expect(typeof gameState.isGameOver).toBe('boolean');
      expect(typeof gameState.hasWon).toBe('boolean');
      expect(typeof gameState.canMove).toBe('boolean');
    });

    it('should return a copy of the board, not the original', () => {
      const gameState = game.getGameState();
      const originalBoard = game['board'];

      // Modify the returned board
      gameState.board[0][0] = 9999 as any;

      // Original board should be unchanged
      expect(originalBoard[0][0]).not.toBe(9999);
    });
  });

  describe('reset', () => {
    it('should reset the game to initial state', () => {
      // Modify the game state
      game['score'] = 1000;
      game['hasWon'] = true;

      game.reset();

      expect(game['score']).toBe(0);
      expect(game['hasWon']).toBe(false);

      // Should have exactly 2 tiles on the board
      let tileCount = 0;
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          if (game['board'][row][col] !== EMPTY_CELL) {
            tileCount++;
          }
        }
      }

      expect(tileCount).toBe(2);
    });
  });

  describe('additional helper methods', () => {
    it('should get current score', () => {
      expect(typeof game.getScore()).toBe('number');
      expect(game.getScore()).toBeGreaterThanOrEqual(0);
    });

    it('should get board copy', () => {
      const board = game.getBoard();
      expect(board).toHaveLength(BOARD_SIZE);
      expect(board[0]).toHaveLength(BOARD_SIZE);

      // Should be a copy, not the original
      board[0][0] = 9999 as any;
      expect(game.getBoard()[0][0]).not.toBe(9999);
    });

    it('should allow setting board for testing', () => {
      const testBoard: Board = [
        [2, 4, 8, 16],
        [32, 64, 128, 256],
        [512, 1024, 2048, 0],
        [0, 0, 0, 0]
      ];

      game.setBoardForTesting(testBoard);
      const currentBoard = game.getBoard();

      expect(currentBoard[0][0]).toBe(2);
      expect(currentBoard[2][2]).toBe(2048);
    });
  });

  describe('movement in all directions', () => {
    describe('left movement', () => {
      it('should slide tiles left', () => {
        game.setBoardForTesting([
          [0, 2, 0, 4],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]);

        game.makeMove('left');
        const board = game.getBoard();

        expect(board[0][0]).toBe(2);
        expect(board[0][1]).toBe(4);
        expect(board[0][2]).toBe(0);
        expect(board[0][3]).toBe(0);
      });

      it('should merge tiles moving left', () => {
        game.setBoardForTesting([
          [2, 2, 4, 4],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]);

        const result = game.makeMove('left');
        const board = game.getBoard();

        expect(board[0][0]).toBe(4);
        expect(board[0][1]).toBe(8);
        expect(result.score).toBeGreaterThan(0);
      });

      it('should merge only once per move [2,2,2,2] -> [4,4,0,0]', () => {
        game.setBoardForTesting([
          [2, 2, 2, 2],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]);

        game.makeMove('left');
        const board = game.getBoard();

        expect(board[0][0]).toBe(4);
        expect(board[0][1]).toBe(4);
        expect(board[0][2]).toBe(0);
        expect(board[0][3]).toBe(0);
      });
    });

    describe('right movement', () => {
      it('should slide tiles right', () => {
        game.setBoardForTesting([
          [2, 0, 4, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]);

        game.makeMove('right');
        const board = game.getBoard();

        expect(board[0][0]).toBe(0);
        expect(board[0][1]).toBe(0);
        expect(board[0][2]).toBe(2);
        expect(board[0][3]).toBe(4);
      });

      it('should merge tiles moving right', () => {
        game.setBoardForTesting([
          [2, 2, 4, 4],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]);

        game.makeMove('right');
        const board = game.getBoard();

        expect(board[0][2]).toBe(4);
        expect(board[0][3]).toBe(8);
      });
    });

    describe('up movement', () => {
      it('should slide tiles up', () => {
        game.setBoardForTesting([
          [0, 0, 0, 0],
          [2, 0, 0, 0],
          [0, 0, 0, 0],
          [4, 0, 0, 0]
        ]);

        game.makeMove('up');
        const board = game.getBoard();

        // Check that tiles moved to correct positions
        expect(board[0][0]).toBe(2);
        expect(board[1][0]).toBe(4);
        // Note: positions 2 and 3 in column 0 could be empty or have a new random tile
        // So we only verify the moved tiles ended up in the right place
      });

      it('should merge tiles moving up', () => {
        game.setBoardForTesting([
          [2, 0, 0, 0],
          [2, 0, 0, 0],
          [4, 0, 0, 0],
          [4, 0, 0, 0]
        ]);

        game.makeMove('up');
        const board = game.getBoard();

        expect(board[0][0]).toBe(4);
        expect(board[1][0]).toBe(8);
      });
    });

    describe('down movement', () => {
      it('should slide tiles down', () => {
        game.setBoardForTesting([
          [2, 0, 0, 0],
          [0, 0, 0, 0],
          [4, 0, 0, 0],
          [0, 0, 0, 0]
        ]);

        game.makeMove('down');
        const board = game.getBoard();

        expect(board[0][0]).toBe(0);
        expect(board[1][0]).toBe(0);
        expect(board[2][0]).toBe(2);
        expect(board[3][0]).toBe(4);
      });

      it('should merge tiles moving down', () => {
        game.setBoardForTesting([
          [2, 0, 0, 0],
          [2, 0, 0, 0],
          [4, 0, 0, 0],
          [4, 0, 0, 0]
        ]);

        game.makeMove('down');
        const board = game.getBoard();

        expect(board[2][0]).toBe(4);
        expect(board[3][0]).toBe(8);
      });
    });
  });

  describe('isGameOver', () => {
    it('should return false when moves are available', () => {
      game.setBoardForTesting([
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);

      expect(game.isGameOver()).toBe(false);
    });

    it('should return true when no moves are possible', () => {
      game.setBoardForTesting([
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2]
      ]);

      expect(game.isGameOver()).toBe(true);
    });
  });

  describe('win condition in makeMove', () => {
    it('should set hasWon to true when 2048 is reached', () => {
      game.setBoardForTesting([
        [1024, 1024, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);

      const result = game.makeMove('left');

      expect(result.hasWon).toBe(true);
      expect(result.board[0][0]).toBe(2048);
    });

    it('should only set hasWon once', () => {
      game.setBoardForTesting([
        [2048, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);

      game['hasWon'] = true;
      const result = game.makeMove('left');

      expect(result.hasWon).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle complex merge scenarios', () => {
      game.setBoardForTesting([
        [2, 0, 2, 4],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);

      game.makeMove('left');
      const board = game.getBoard();

      expect(board[0][0]).toBe(4);
      expect(board[0][1]).toBe(4);
    });

    it('should not merge already merged tiles [4,2,2,0] -> [4,4,0,0]', () => {
      game.setBoardForTesting([
        [4, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);

      game.makeMove('left');
      const board = game.getBoard();

      expect(board[0][0]).toBe(4);
      expect(board[0][1]).toBe(4);
      expect(board[0][2]).toBe(0);
      expect(board[0][3]).toBe(0);
    });

    it('should handle all tiles being the same value', () => {
      game.setBoardForTesting([
        [8, 8, 8, 8],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);

      game.makeMove('left');
      const board = game.getBoard();

      expect(board[0][0]).toBe(16);
      expect(board[0][1]).toBe(16);
      expect(board[0][2]).toBe(0);
      expect(board[0][3]).toBe(0);
    });
  });
});
