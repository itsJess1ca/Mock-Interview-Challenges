import { BattleshipGame } from './game';
import { GameBoard } from './board';
import { CellState, GameState, Position, AttackResult } from './types';

export class GameDisplay {
  private static readonly SYMBOLS = {
    EMPTY: '~',
    SHIP: '■',
    HIT: 'X',
    MISS: 'O',
    SUNK: '#',
    UNKNOWN: '?'
  };

  private static readonly COLORS = {
    EMPTY: '\x1b[36m',     // Cyan
    SHIP: '\x1b[37m',      // White
    HIT: '\x1b[31m',       // Red
    MISS: '\x1b[34m',      // Blue
    SUNK: '\x1b[35m',      // Magenta
    UNKNOWN: '\x1b[90m',   // Dark gray
    RESET: '\x1b[0m',
    HEADER: '\x1b[33m',    // Yellow
    BORDER: '\x1b[37m'     // White
  };

  public displayWelcome(): void {
    console.log('⚓ Welcome to Battleship! ⚓');
    console.log('');
    console.log('OBJECTIVE:');
    console.log('Sink all enemy ships before they sink yours!');
    console.log('');
    console.log('HOW TO PLAY:');
    console.log('1. Place your ships on your board');
    console.log('2. Take turns attacking enemy positions');
    console.log('3. Use clues from hits to find and sink ships');
    console.log('');
    console.log('SHIP FLEET:');
    console.log('• Carrier (5 spaces)    • Battleship (4 spaces)');
    console.log('• Cruiser (3 spaces)    • Submarine (3 spaces)');
    console.log('• Destroyer (2 spaces)');
    console.log('');
  }

  public displayGameState(game: BattleshipGame): void {
    // TODO: Display the current complete game state
    // 1. Clear screen
    // 2. Show both boards side by side
    // 3. Display game statistics
    // 4. Show current player and game status
    throw new Error('Method not implemented');
  }

  public displayBoards(game: BattleshipGame): void {
    // TODO: Display player and AI boards side by side
    // Player board shows all ships, AI board shows only hits/misses
    // Include column headers and row numbers
    throw new Error('Method not implemented');
  }

  public displayBoard(board: GameBoard, title: string, showShips: boolean = true): void {
    // TODO: Display a single board with title
    // 1. Print title with formatting
    // 2. Print column headers (A-J)
    // 3. Print each row with row number and cells
    // 4. Use appropriate symbols and colors
    // 5. Hide ships if showShips is false (for AI board)
    throw new Error('Method not implemented');
  }

  private getCellDisplay(state: CellState, showShips: boolean): string {
    // TODO: Get display character and color for a cell
    // Use SYMBOLS and COLORS constants
    // Hide ships if showShips is false
    throw new Error('Method not implemented');
  }

  private formatCell(symbol: string, color: string): string {
    return `${color}${symbol}${GameDisplay.COLORS.RESET}`;
  }

  public displaySetupPhase(game: BattleshipGame): void {
    // TODO: Display setup interface
    // 1. Show current player board
    // 2. Show remaining ships to place
    // 3. Display placement instructions
    throw new Error('Method not implemented');
  }

  public displayRemainingShips(game: BattleshipGame): void {
    // TODO: Display ships that still need to be placed
    const remaining = game.getRemainingShips();
    if (remaining.player.length > 0) {
      console.log('\nShips to place:');
      remaining.player.forEach(ship => {
        console.log(`• ${ship.name} (${ship.length} spaces) - ${ship.count} remaining`);
      });
    }
  }

  public displayAttackResult(result: AttackResult): void {
    // TODO: Display the result of an attack
    // Different messages for hit, miss, sunk
    // Special formatting for ship sunk
    throw new Error('Method not implemented');
  }

  public displayGameStats(game: BattleshipGame): void {
    // TODO: Display current game statistics
    // Show hits, misses, accuracy for both players
    // Show elapsed time and turn count
    throw new Error('Method not implemented');
  }

  public displayGameOver(game: BattleshipGame): void {
    // TODO: Display game over screen
    // Show winner, final statistics, both boards revealed
    throw new Error('Method not implemented');
  }

  public displayWin(game: BattleshipGame): void {
    console.log('');
    console.log('🎉 CONGRATULATIONS! YOU WON! 🎉');
    console.log('You sank all enemy ships!');
    this.displayFinalStats(game);
  }

  public displayLoss(game: BattleshipGame): void {
    console.log('');
    console.log('💀 DEFEAT! 💀');
    console.log('All your ships have been sunk!');
    this.displayFinalStats(game);
  }

  private displayFinalStats(game: BattleshipGame): void {
    const stats = game.getGameStats();
    console.log('');
    console.log('📊 FINAL STATISTICS:');
    console.log(`Game Time: ${this.formatTime(stats.gameTime)}`);
    console.log(`Total Turns: ${stats.turnCount}`);
    console.log('');
    console.log('Player Performance:');
    console.log(`  Hits: ${stats.playerHits} | Misses: ${stats.playerMisses}`);
    console.log(`  Accuracy: ${game.getPlayerAccuracy().toFixed(1)}%`);
    console.log(`  Ships Sunk: ${stats.playerShipsSunk}`);
    console.log('');
    console.log('AI Performance:');
    console.log(`  Hits: ${stats.aiHits} | Misses: ${stats.aiMisses}`);
    console.log(`  Accuracy: ${game.getAIAccuracy().toFixed(1)}%`);
    console.log(`  Ships Sunk: ${stats.aiShipsSunk}`);
  }

  private formatTime(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  public displayHelp(): void {
    console.log('');
    console.log('🎯 BATTLESHIP COMMANDS:');
    console.log('');
    console.log('During Setup:');
    console.log('  place <ship> <position> <orientation>');
    console.log('  Example: place carrier A1 horizontal');
    console.log('  remove <ship> - Remove placed ship');
    console.log('  auto - Auto-place remaining ships');
    console.log('  start - Begin game');
    console.log('');
    console.log('During Game:');
    console.log('  attack <position> - Attack enemy position');
    console.log('  Example: attack B5');
    console.log('  stats - Show game statistics');
    console.log('  pause - Pause game');
    console.log('  resume - Resume game');
    console.log('');
    console.log('General:');
    console.log('  help - Show this help');
    console.log('  quit - Exit game');
    console.log('');
    console.log('💡 STRATEGY TIPS:');
    console.log('• After hitting a ship, attack adjacent cells');
    console.log('• Ships cannot touch each other diagonally');
    console.log('• Use systematic patterns to search for ships');
    console.log('• Corner and edge positions are safer for ship placement');
  }

  public displayError(message: string): void {
    console.log(`❌ Error: ${message}`);
  }

  public displaySuccess(message: string): void {
    console.log(`✅ ${message}`);
  }

  public displayInfo(message: string): void {
    console.log(`ℹ️  ${message}`);
  }

  public displayAIThinking(): void {
    console.log('🤖 AI is thinking...');
  }

  public displayTurnIndicator(player: 'player' | 'ai'): void {
    if (player === 'player') {
      console.log('\n⚡ YOUR TURN ⚡');
    } else {
      console.log('\n🤖 AI TURN 🤖');
    }
  }

  public clearScreen(): void {
    // TODO: Clear the console screen
    // Use appropriate method for cross-platform compatibility
    console.clear();
  }

  public displayPlacementHelp(): void {
    console.log('');
    console.log('📍 SHIP PLACEMENT:');
    console.log('• Use coordinates like A1, B5, J10');
    console.log('• Orientations: horizontal or vertical');
    console.log('• Ships cannot overlap or touch');
    console.log('• Type "help" for more commands');
  }

  public displayDifficultyMenu(): void {
    console.log('Select AI Difficulty:');
    console.log('1. Easy (Random attacks)');
    console.log('2. Medium (Hunt & Target)');
    console.log('3. Hard (Advanced strategy)');
  }

  public displayPaused(): void {
    console.log('');
    console.log('⏸️  GAME PAUSED');
    console.log('Type "resume" to continue');
  }
}