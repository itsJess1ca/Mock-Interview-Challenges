import { Connect4Game } from '../connect4';

describe('Connect4Game', () => {
  let game: Connect4Game;

  beforeEach(() => {
    game = new Connect4Game();
  });

  describe('Initial game state', () => {
    test('should start with player 1', () => {
      const gameState = game.getGameState();
      expect(gameState.currentPlayer).toBe(1);
    });

    test('should have no winner initially', () => {
      const gameState = game.getGameState();
      expect(gameState.winner).toBeNull();
    });

    test('should not be game over initially', () => {
      const gameState = game.getGameState();
      expect(gameState.isGameOver).toBe(false);
    });

    // TODO: Add test for empty board
  });

  describe('Making moves', () => {
    // TODO: Add tests for:
    // - Valid moves
    // - Invalid moves (out of bounds, full column)
    // - Player switching
    // - Win detection
  });

  describe('Win conditions', () => {
    // TODO: Add tests for:
    // - Horizontal wins
    // - Vertical wins
    // - Diagonal wins
    // - Tie conditions
  });
});