import * as readline from 'readline';
import { Difficulty } from './types';

export class InputHandler {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  public async getCommand(): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question('Enter command: ', (answer) => {
        resolve(answer.trim().toLowerCase());
      });
    });
  }

  public async getDifficulty(): Promise<Difficulty> {
    // TODO: Get difficulty choice from user
    // Display options and get user input (1-3)
    // Return appropriate Difficulty enum value
    // Handle invalid input gracefully
    throw new Error('Method not implemented');
  }

  public parseCommand(input: string): { action: string; row?: number; col?: number } | null {
    // TODO: Parse user input commands
    // Handle commands like:
    // - "r 3 5" (reveal row 3, col 5)
    // - "f 2 7" (flag row 2, col 7)
    // - "n" (new game)
    // - "q" (quit)
    // - "h" (help)
    // Return null for invalid commands
    throw new Error('Method not implemented');
  }

  public async askPlayAgain(): Promise<boolean> {
    return new Promise((resolve) => {
      this.rl.question('Play again? (y/n): ', (answer) => {
        resolve(answer.toLowerCase().startsWith('y'));
      });
    });
  }

  public async askNewGame(): Promise<boolean> {
    return new Promise((resolve) => {
      this.rl.question('Start a new game? (y/n): ', (answer) => {
        resolve(answer.toLowerCase().startsWith('y'));
      });
    });
  }

  public close(): void {
    this.rl.close();
  }
}