import { Board, GameState, TileColors, CellValue } from './types';

/**
 * Display the current board state in a formatted way
 */
export function displayBoard(board: Board): void {
  // TODO: Implement this function
  // Display the board in a nice ASCII format
  // You can use the TileColors for visual representation
  // Example output:
  // ┌────┬────┬────┬────┐
  // │ 2  │ 4  │    │ 2  │
  // ├────┼────┼────┼────┤
  // │    │ 8  │ 16 │ 4  │
  // ├────┼────┼────┼────┤
  // │ 2  │    │ 2  │ 8  │
  // ├────┼────┼────┼────┤
  // │ 4  │ 2  │ 4  │ 2  │
  // └────┴────┴────┴────┘
}

/**
 * Display the game state including score and status
 */
export function displayGameState(gameState: GameState): void {
  // TODO: Implement this function
  // Display score, game status, and the board
  throw new Error('Not implemented');
}

/**
 * Display game instructions
 */
export function displayInstructions(): void {
  console.log('🎮 Welcome to 2048!');
  console.log('');
  console.log('Instructions:');
  console.log('• Use arrow keys or WASD to move tiles');
  console.log('• When two tiles with the same number touch, they merge!');
  console.log('• Try to reach the 2048 tile to win!');
  console.log('• Game ends when you can\'t make any more moves');
  console.log('');
  console.log('Controls:');
  console.log('• W or ↑ : Move Up');
  console.log('• S or ↓ : Move Down');
  console.log('• A or ← : Move Left');
  console.log('• D or → : Move Right');
  console.log('• Q : Quit game');
  console.log('• R : Restart game');
  console.log('');
}

/**
 * Clear the console screen
 */
export function clearScreen(): void {
  console.clear();
}

/**
 * Format a cell value for display
 */
export function formatCellValue(value: CellValue): string {
  // TODO: Implement this function
  // Format the cell value for nice display
  // Empty cells should show as spaces, numbers should be padded
  throw new Error('Not implemented');
}

/**
 * Display win message
 */
export function displayWinMessage(): void {
  console.log('🎉 Congratulations! You reached 2048! 🎉');
  console.log('You can continue playing to reach higher scores!');
}

/**
 * Display game over message
 */
export function displayGameOverMessage(): void {
  console.log('💀 Game Over! No more moves available.');
  console.log('Press R to restart or Q to quit.');
}

/**
 * Get the visual representation of a tile
 */
export function getTileDisplay(value: CellValue): string {
  return TileColors[value] || '❓';
}

/**
 * Display a separator line for the board
 */
export function displaySeparator(isTop: boolean = false, isBottom: boolean = false): void {
  // TODO: Helper function for board display
  // Use box drawing characters for clean board borders
  throw new Error('Not implemented');
}
