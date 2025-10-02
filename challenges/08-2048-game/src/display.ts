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
  console.log('┌────┬────┬────┬────┐');
  let isFirst = true;
  for (const row of board) {
    if (!isFirst) console.log('├────┼────┼────┼────┤');
    let rowStr = '│';
    const cellValues: string[] = [];
    for (const cell of row) {
      cellValues.push(formatCellValue(cell));
    }

    rowStr += cellValues.join('│');
    rowStr += '│';
    console.log(rowStr);
    isFirst = false;
  }
  console.log('└────┴────┴────┴────┘')
}

/**
 * Display the game state including score and status
 */
export function displayGameState(gameState: GameState): void {
  // TODO: Implement this function
  displayBoard(gameState.board);
  if (gameState.hasWon) {
    displayWinMessage()
    return;
  }
  if (gameState.isGameOver) {
    displayGameOverMessage();
  }
  console.log(`Score: ${gameState.score} | Status: ${gameState.isGameOver}`);
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
export function formatCellValue(cell: CellValue): string {
  let value = cell.toString();
  if (value.length === 4) {
    return value;
  }
  if (value === '0') value = ' ';
  return ` ${value.padEnd(3, ' ')}`;
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
