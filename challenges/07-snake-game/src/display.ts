import { SnakeGame } from './game';
import { Snake } from './snake';
import { Position, CellType, GameState, Food } from './types';

export class GameDisplay {
  private static readonly SYMBOLS = {
    EMPTY: ' ',
    SNAKE_HEAD: '●',
    SNAKE_BODY: '■',
    FOOD: '♦',
    SPECIAL_FOOD: '★',
    WALL: '█',
    BORDER_HORIZONTAL: '─',
    BORDER_VERTICAL: '│',
    BORDER_CORNER: '+'
  };

  public displayWelcome(): void {
    console.log('🐍 Welcome to Snake Game! 🐍');
    console.log('');
    console.log('Controls:');
    console.log('  ↑ or W - Move Up');
    console.log('  ↓ or S - Move Down');
    console.log('  ← or A - Move Left');
    console.log('  → or D - Move Right');
    console.log('  P - Pause/Resume');
    console.log('  R - Restart Game');
    console.log('  Q - Quit');
    console.log('');
  }

  public displayBoard(game: SnakeGame): void {
    // TODO: Display the current game board
    // 1. Get board dimensions from game
    // 2. Create a 2D representation of the board
    // 3. Mark snake positions, food positions
    // 4. Draw borders around the board
    // 5. Use SYMBOLS constant for consistent display
    throw new Error('Method not implemented');
  }

  private createBoardMatrix(game: SnakeGame): CellType[][] {
    // TODO: Create a 2D matrix representing the current board state
    // 1. Initialize with empty cells
    // 2. Mark snake body positions
    // 3. Mark snake head position
    // 4. Mark food positions
    // 5. Mark walls if enabled
    throw new Error('Method not implemented');
  }

  private getCellSymbol(cellType: CellType): string {
    // TODO: Return the appropriate symbol for each cell type
    // Use the SYMBOLS constant
    throw new Error('Method not implemented');
  }

  private drawBorder(width: number): string {
    // TODO: Draw top or bottom border of the game board
    throw new Error('Method not implemented');
  }

  public displayGameStats(game: SnakeGame): void {
    // TODO: Display current game statistics
    // Show score, level, speed, food eaten, time
    // Format in a clean, readable layout
    throw new Error('Method not implemented');
  }

  public displayGameOver(game: SnakeGame): void {
    // TODO: Display game over screen
    // Show final score, high score, game duration
    // Different messages for different end conditions
    throw new Error('Method not implemented');
  }

  public displayPauseScreen(): void {
    console.log('');
    console.log('⏸️  GAME PAUSED');
    console.log('Press P to resume, R to restart, or Q to quit');
    console.log('');
  }

  public displayVictory(game: SnakeGame): void {
    // TODO: Display victory screen (if applicable)
    // Could be triggered by reaching maximum length or score
    throw new Error('Method not implemented');
  }

  public displaySettings(settings: any): void {
    console.log('');
    console.log('🎮 Game Settings:');
    console.log(`Difficulty: ${settings.difficulty}`);
    console.log(`Board Size: ${settings.boardSize}`);
    console.log(`Walls: ${settings.wallsEnabled ? 'Enabled' : 'Disabled'}`);
    console.log(`Special Food: ${settings.specialFoodEnabled ? 'Enabled' : 'Disabled'}`);
    console.log('');
  }

  public displayHelp(): void {
    console.log('');
    console.log('🎯 Snake Game Rules:');
    console.log('- Use arrow keys or WASD to control the snake');
    console.log('- Eat food (♦) to grow and increase your score');
    console.log('- Avoid hitting walls or your own tail');
    console.log('- Special food (★) gives bonus points');
    console.log('- Speed increases as your score grows');
    console.log('');
    console.log('💡 Tips:');
    console.log('- Plan your moves ahead to avoid trapping yourself');
    console.log('- Use the edges strategically but be careful');
    console.log('- Try to create patterns to maximize space');
    console.log('');
  }

  public displayError(message: string): void {
    console.log(`❌ Error: ${message}`);
  }

  public displaySuccess(message: string): void {
    console.log(`✅ ${message}`);
  }

  public clearScreen(): void {
    // TODO: Clear the console screen
    // Use appropriate method for cross-platform compatibility
    throw new Error('Method not implemented');
  }

  public displayFrame(game: SnakeGame): void {
    // TODO: Display a complete game frame
    // 1. Clear screen
    // 2. Display board
    // 3. Display stats
    // 4. Handle special states (paused, game over)
    throw new Error('Method not implemented');
  }

  public displayHighScore(score: number): void {
    console.log(`🏆 High Score: ${score}`);
  }

  public displayCountdown(count: number): void {
    console.log(`Starting in ${count}...`);
  }
}