import { Board, Player } from './types';

export class GameDisplay {
  public displayBoard(board: Board): void {
    // TODO: Implement board display
    // Display the board in a nice ASCII format
    // Example:
    // |_|_|_|_|_|_|_|
    // |_|_|_|_|_|_|_|
    // |_|_|_|_|_|_|_|
    // |_|_|_|_|_|_|_|
    // |_|_|_|X|_|_|_|
    // |_|_|O|X|_|_|_|
    //  1 2 3 4 5 6 7
    throw new Error('Method not implemented');
  }

  public displayWinner(winner: Player): void {
    console.log(`🎉 Player ${winner} wins!`);
  }

  public displayTie(): void {
    console.log('🤝 It\'s a tie!');
  }

  public displayCurrentPlayer(player: Player): void {
    console.log(`Player ${player}'s turn`);
  }

  public displayInvalidMove(): void {
    console.log('❌ Invalid move! Try again.');
  }

  public displayWelcome(): void {
    console.log('🔴🟡 Welcome to Connect 4! 🟡🔴');
    console.log('Enter a column number (1-7) to drop your piece');
  }
}