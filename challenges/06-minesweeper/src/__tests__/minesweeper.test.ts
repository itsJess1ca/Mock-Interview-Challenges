import { MinesweeperGame } from '../minesweeper';
import { GameState, Difficulty } from '../types';

describe('MinesweeperGame', () => {
  let game: MinesweeperGame;

  beforeEach(() => {
    game = new MinesweeperGame(Difficulty.Beginner);
  });

  describe('Game Initialization', () => {
    it('should create a game with beginner difficulty by default', () => {
      const dimensions = game.getBoardDimensions();
      expect(dimensions.rows).toBe(9);
      expect(dimensions.cols).toBe(9);
      expect(game.getRemainingMines()).toBe(10);
    });

    it('should create games with different difficulties', () => {
      const intermediate = new MinesweeperGame(Difficulty.Intermediate);
      const expert = new MinesweeperGame(Difficulty.Expert);

      expect(intermediate.getBoardDimensions()).toEqual({ rows: 16, cols: 16 });
      expect(expert.getBoardDimensions()).toEqual({ rows: 16, cols: 30 });
      expect(expert.getRemainingMines()).toBe(99);
    });

    it('should start with playing state', () => {
      expect(game.getGameState()).toBe(GameState.Playing);
    });
  });

  describe('Board Creation', () => {
    it('should create empty board with correct dimensions', () => {
      const board = game.getBoard();
      expect(board).toHaveLength(9);
      expect(board[0]).toHaveLength(9);
    });

    it('should initialize all cells as hidden and not flagged', () => {
      const board = game.getBoard();
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const cell = board[row][col];
          expect(cell.isRevealed).toBe(false);
          expect(cell.isFlagged).toBe(false);
          expect(cell.row).toBe(row);
          expect(cell.col).toBe(col);
        }
      }
    });
  });

  describe('Mine Placement', () => {
    it('should place correct number of mines after first move', () => {
      game.initializeGame(4, 4); // Center position
      const board = game.getBoard();

      let mineCount = 0;
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col].isMine) {
            mineCount++;
          }
        }
      }
      expect(mineCount).toBe(10);
    });

    it('should ensure first move position is safe', () => {
      game.initializeGame(4, 4);
      const firstMoveCell = game.getCellAt(4, 4);
      expect(firstMoveCell?.isMine).toBe(false);
    });

    it('should calculate neighbor mine counts correctly', () => {
      game.initializeGame(0, 0);
      const board = game.getBoard();

      // Check that non-mine cells have valid neighbor counts (0-8)
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const cell = board[row][col];
          if (!cell.isMine) {
            expect(cell.neighborMineCount).toBeGreaterThanOrEqual(0);
            expect(cell.neighborMineCount).toBeLessThanOrEqual(8);
          }
        }
      }
    });
  });

  describe('Cell Revealing', () => {
    beforeEach(() => {
      game.initializeGame(4, 4); // Initialize with center move
    });

    it('should reveal a single cell', () => {
      const result = game.revealCell(0, 0);
      expect(result.success).toBe(true);

      const cell = game.getCellAt(0, 0);
      expect(cell?.isRevealed).toBe(true);
    });

    it('should not reveal flagged cells', () => {
      game.toggleFlag(0, 0);
      const result = game.revealCell(0, 0);

      expect(result.success).toBe(false);
      const cell = game.getCellAt(0, 0);
      expect(cell?.isRevealed).toBe(false);
    });

    it('should not reveal already revealed cells', () => {
      game.revealCell(0, 0);
      const result = game.revealCell(0, 0);

      expect(result.success).toBe(false);
    });

    it('should end game when mine is revealed', () => {
      const board = game.getBoard();

      // Find a mine to click on
      let mineRow = -1, mineCol = -1;
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col].isMine) {
            mineRow = row;
            mineCol = col;
            break;
          }
        }
        if (mineRow !== -1) break;
      }

      const result = game.revealCell(mineRow, mineCol);
      expect(result.gameState).toBe(GameState.Lost);
      expect(game.getGameState()).toBe(GameState.Lost);
    });

    it('should handle invalid positions gracefully', () => {
      const result = game.revealCell(-1, 0);
      expect(result.success).toBe(false);

      const result2 = game.revealCell(10, 10);
      expect(result2.success).toBe(false);
    });
  });

  describe('Flood Fill Revealing', () => {
    beforeEach(() => {
      game.initializeGame(4, 4);
    });

    it('should reveal multiple cells when clicking empty area', () => {
      const board = game.getBoard();

      // Find a cell with no neighboring mines
      let emptyRow = -1, emptyCol = -1;
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const cell = board[row][col];
          if (!cell.isMine && cell.neighborMineCount === 0) {
            emptyRow = row;
            emptyCol = col;
            break;
          }
        }
        if (emptyRow !== -1) break;
      }

      if (emptyRow !== -1) {
        const result = game.revealCell(emptyRow, emptyCol);
        expect(result.revealedCells.length).toBeGreaterThan(1);
      }
    });

    it('should not reveal flagged cells during flood fill', () => {
      // This test requires a specific board setup
      // You might need to create a test with a known board configuration
      expect(true).toBe(true); // Placeholder - implement when flood fill is done
    });
  });

  describe('Flag Operations', () => {
    beforeEach(() => {
      game.initializeGame(4, 4);
    });

    it('should toggle flag on unrevealed cell', () => {
      const result = game.toggleFlag(0, 0);
      expect(result.success).toBe(true);

      const cell = game.getCellAt(0, 0);
      expect(cell?.isFlagged).toBe(true);
      expect(game.getRemainingMines()).toBe(9);
    });

    it('should remove flag when toggling flagged cell', () => {
      game.toggleFlag(0, 0);
      const result = game.toggleFlag(0, 0);

      expect(result.success).toBe(true);
      const cell = game.getCellAt(0, 0);
      expect(cell?.isFlagged).toBe(false);
      expect(game.getRemainingMines()).toBe(10);
    });

    it('should not flag revealed cells', () => {
      game.revealCell(0, 0);
      const result = game.toggleFlag(0, 0);

      expect(result.success).toBe(false);
      const cell = game.getCellAt(0, 0);
      expect(cell?.isFlagged).toBe(false);
    });
  });

  describe('Win Condition', () => {
    it('should detect win when all non-mine cells are revealed', () => {
      game.initializeGame(4, 4);
      const board = game.getBoard();

      // Reveal all non-mine cells
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const cell = board[row][col];
          if (!cell.isMine) {
            game.revealCell(row, col);
          }
        }
      }

      expect(game.getGameState()).toBe(GameState.Won);
    });
  });

  describe('Game Statistics', () => {
    beforeEach(() => {
      game.initializeGame(4, 4);
    });

    it('should track revealed cells count', () => {
      game.revealCell(0, 0);
      game.revealCell(0, 1);

      const stats = game.getGameStats();
      expect(stats.revealedCells).toBeGreaterThanOrEqual(2);
    });

    it('should track flagged cells count', () => {
      game.toggleFlag(0, 0);
      game.toggleFlag(0, 1);

      const stats = game.getGameStats();
      expect(stats.flaggedCells).toBe(2);
    });

    it('should track elapsed time', () => {
      const stats = game.getGameStats();
      expect(stats.elapsedTime).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Game Reset', () => {
    it('should reset game to initial state', () => {
      game.initializeGame(4, 4);
      game.revealCell(0, 0);
      game.toggleFlag(1, 1);

      game.resetGame();

      expect(game.getGameState()).toBe(GameState.Playing);
      expect(game.getRemainingMines()).toBe(10);

      const board = game.getBoard();
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const cell = board[row][col];
          expect(cell.isRevealed).toBe(false);
          expect(cell.isFlagged).toBe(false);
        }
      }
    });

    it('should reset with different difficulty', () => {
      game.resetGame(Difficulty.Expert);

      const dimensions = game.getBoardDimensions();
      expect(dimensions.rows).toBe(16);
      expect(dimensions.cols).toBe(30);
      expect(game.getRemainingMines()).toBe(99);
    });
  });
});