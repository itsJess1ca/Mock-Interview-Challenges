import * as readline from 'readline';

export class InputHandler {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  public async getPlayerMove(): Promise<number> {
    return new Promise((resolve) => {
      this.rl.question('Enter column (1-7): ', (answer) => {
        const column = parseInt(answer.trim(), 10);
        resolve(column);
      });
    });
  }

  public async askPlayAgain(): Promise<boolean> {
    return new Promise((resolve) => {
      this.rl.question('Play again? (y/n): ', (answer) => {
        const response = answer.trim().toLowerCase();
        resolve(response === 'y' || response === 'yes');
      });
    });
  }

  public close(): void {
    this.rl.close();
  }
}