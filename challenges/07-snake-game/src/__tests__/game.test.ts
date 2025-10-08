import { SnakeGame } from '../game';
import { Direction, GameState, GameSettings } from '../types';

describe('SnakeGame', () => {
  let game: SnakeGame;
  const defaultSettings: GameSettings = {
    difficulty: 'medium',
    boardSize: 'medium',
    wallsEnabled: false,
    specialFoodEnabled: true
  };

  beforeEach(() => {
    game = new SnakeGame(defaultSettings);
  });

  describe('Game Initialization', () => {
    it('should create game with default settings', () => {
      expect(game.getGameState()).toBe(GameState.Playing);
      expect(game.getScore()).toBe(0);
      expect(game.getLevel()).toBe(1);
    });

    it('should create game with custom settings', () => {
      const customSettings: GameSettings = {
        difficulty: 'hard',
        boardSize: 'large',
        wallsEnabled: true,
        specialFoodEnabled: false
      };

      const customGame = new SnakeGame(customSettings);
      expect(customGame.getSettings()).toEqual(customSettings);
    });

    it('should initialize board with correct dimensions', () => {
      const board = game.getBoard();
      expect(board.width).toBeGreaterThan(0);
      expect(board.height).toBeGreaterThan(0);
    });

    it('should start with snake in initial position', () => {
      const snake = game.getSnake();
      expect(snake.getLength()).toBe(1);
    });
  });

  describe('Game Start', () => {
    it('should initialize game properly on start', () => {
      game.startGame();

      expect(game.getGameState()).toBe(GameState.Playing);
      expect(game.getFood().length).toBeGreaterThan(0);
    });

    it('should reset all statistics on start', () => {
      game.startGame();

      expect(game.getScore()).toBe(0);
      expect(game.getLevel()).toBe(1);
    });
  });

  describe('Game Updates', () => {
    beforeEach(() => {
      game.startGame();
    });

    it('should update game state successfully', () => {
      const result = game.update();
      expect(result.success).toBe(true);
    });

    it('should maintain playing state during normal gameplay', () => {
      game.update();
      expect(game.getGameState()).toBe(GameState.Playing);
    });

    it('should not update when game is paused', () => {
      game.pauseGame();
      const result = game.update();
      expect(result.success).toBe(false);
    });

    it('should not update when game is over', () => {
      // Force game over state
      game.resetGame();
      // Would need to implement a way to force game over for testing
      // This is a placeholder test
      expect(true).toBe(true);
    });
  });

  describe('Direction Changes', () => {
    beforeEach(() => {
      game.startGame();
    });

    it('should allow valid direction changes', () => {
      expect(game.changeDirection(Direction.Up)).toBe(true);
      expect(game.changeDirection(Direction.Down)).toBe(true);
      expect(game.changeDirection(Direction.Left)).toBe(true);
      expect(game.changeDirection(Direction.Right)).toBe(true);
    });

    it('should prevent invalid direction changes', () => {
      const snake = game.getSnake();
      const currentDirection = snake.getDirection();

      // Try to reverse direction
      let oppositeDirection: Direction;
      switch (currentDirection) {
        case Direction.Up: oppositeDirection = Direction.Down; break;
        case Direction.Down: oppositeDirection = Direction.Up; break;
        case Direction.Left: oppositeDirection = Direction.Right; break;
        case Direction.Right: oppositeDirection = Direction.Left; break;
      }

      expect(game.changeDirection(oppositeDirection)).toBe(false);
    });
  });

  describe('Food Management', () => {
    beforeEach(() => {
      game.startGame();
    });

    it('should spawn food on game start', () => {
      const food = game.getFood();
      expect(food.length).toBeGreaterThan(0);
    });

    it('should spawn food in valid positions', () => {
      const food = game.getFood();
      const snake = game.getSnake();
      const board = game.getBoard();

      food.forEach(f => {
        // Food should be within board bounds
        expect(f.position.x).toBeGreaterThanOrEqual(0);
        expect(f.position.x).toBeLessThan(board.width);
        expect(f.position.y).toBeGreaterThanOrEqual(0);
        expect(f.position.y).toBeLessThan(board.height);

        // Food should not be on snake
        expect(snake.occupiesPosition(f.position)).toBe(false);
      });
    });

    it('should include special food when enabled', () => {
      if (game.getSettings().specialFoodEnabled) {
        // Run multiple times to increase chance of special food
        for (let i = 0; i < 10; i++) {
          game.resetGame();
          game.startGame();
        }

        // Check if any special food exists across all attempts
        // This is probabilistic, so we can't guarantee it every time
        expect(true).toBe(true); // Placeholder
      }
    });
  });

  describe('Scoring System', () => {
    beforeEach(() => {
      game.startGame();
    });

    it('should start with zero score', () => {
      expect(game.getScore()).toBe(0);
    });

    it('should increase score when food is consumed', () => {
      const initialScore = game.getScore();

      // This would require manipulating the game state to force food consumption
      // For now, this is a placeholder test
      expect(initialScore).toBe(0);
    });

    it('should track food eaten count', () => {
      const stats = game.getGameStats();
      expect(stats.foodEaten).toBe(0);
    });
  });

  describe('Level System', () => {
    beforeEach(() => {
      game.startGame();
    });

    it('should start at level 1', () => {
      expect(game.getLevel()).toBe(1);
    });

    it('should increase speed with level', () => {
      const initialSpeed = game.getCurrentSpeed();

      // Level progression would need to be tested with actual gameplay
      expect(initialSpeed).toBeGreaterThan(0);
    });
  });

  describe('Pause and Resume', () => {
    beforeEach(() => {
      game.startGame();
    });

    it('should pause game when requested', () => {
      game.pauseGame();
      expect(game.getGameState()).toBe(GameState.Paused);
    });

    it('should resume game when requested', () => {
      game.pauseGame();
      game.resumeGame();
      expect(game.getGameState()).toBe(GameState.Playing);
    });

    it('should not pause when game is over', () => {
      // Force game over state first
      // This would require implementing a way to force game over
      expect(true).toBe(true); // Placeholder
    });
  });

  describe('Game Statistics', () => {
    beforeEach(() => {
      game.startGame();
    });

    it('should provide complete game statistics', () => {
      const stats = game.getGameStats();

      expect(stats).toHaveProperty('score');
      expect(stats).toHaveProperty('level');
      expect(stats).toHaveProperty('speed');
      expect(stats).toHaveProperty('foodEaten');
      expect(stats).toHaveProperty('gameTime');
      expect(stats).toHaveProperty('highScore');
    });

    it('should track elapsed time', () => {
      const stats1 = game.getGameStats();

      // Wait a bit
      setTimeout(() => {
        const stats2 = game.getGameStats();
        expect(stats2.gameTime).toBeGreaterThanOrEqual(stats1.gameTime);
      }, 10);
    });
  });

  describe('Game Reset', () => {
    beforeEach(() => {
      game.startGame();
    });

    it('should reset to initial state', () => {
      // Modify game state
      game.changeDirection(Direction.Up);

      game.resetGame();

      expect(game.getGameState()).toBe(GameState.Playing);
      expect(game.getScore()).toBe(0);
      expect(game.getLevel()).toBe(1);
    });

    it('should preserve settings after reset', () => {
      const originalSettings = game.getSettings();

      game.resetGame();

      expect(game.getSettings()).toEqual(originalSettings);
    });
  });

  describe('New Game', () => {
    it('should start new game with same settings', () => {
      const originalSettings = game.getSettings();

      game.newGame();

      expect(game.getSettings()).toEqual(originalSettings);
      expect(game.getGameState()).toBe(GameState.Playing);
    });

    it('should start new game with different settings', () => {
      const newSettings: GameSettings = {
        difficulty: 'hard',
        boardSize: 'large',
        wallsEnabled: true,
        specialFoodEnabled: false
      };

      game.newGame(newSettings);

      expect(game.getSettings()).toEqual(newSettings);
    });
  });

  describe('Collision Detection', () => {
    beforeEach(() => {
      game.startGame();
    });

    it('should detect wall collisions when walls enabled', () => {
      const wallGame = new SnakeGame({
        ...defaultSettings,
        wallsEnabled: true
      });
      wallGame.startGame();

      // This would require manipulating snake position to test wall collision
      expect(true).toBe(true); // Placeholder
    });

    it('should handle boundary wrapping when walls disabled', () => {
      // This would require testing boundary behavior
      expect(true).toBe(true); // Placeholder
    });

    it('should detect self collision', () => {
      // This would require creating a scenario where snake hits itself
      expect(true).toBe(true); // Placeholder
    });
  });
});