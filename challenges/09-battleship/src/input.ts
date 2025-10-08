import * as readline from 'readline';
import { Position, Orientation } from './types';

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
      this.rl.question('> ', (answer) => {
        resolve(answer.trim());
      });
    });
  }

  public parseCommand(input: string): {
    action: string;
    args: string[];
  } {
    // TODO: Parse user input into action and arguments
    // Handle commands like:
    // - "place carrier A1 horizontal"
    // - "attack B5"
    // - "remove battleship"
    // - "help"
    throw new Error('Method not implemented');
  }

  public parsePosition(positionStr: string): Position | null {
    // TODO: Parse position string like "A1", "B5", "J10"
    // Convert letter to column number (A=0, B=1, etc.)
    // Convert number to row (1=0, 2=1, etc.)
    // Return null for invalid positions
    throw new Error('Method not implemented');
  }

  public parseOrientation(orientationStr: string): Orientation | null {
    // TODO: Parse orientation string
    // Accept variations like "h", "horizontal", "v", "vertical"
    // Return null for invalid orientations
    throw new Error('Method not implemented');
  }

  public formatPosition(position: Position): string {
    // TODO: Convert position back to string format
    // Convert column number to letter, row number to display number
    // Example: {row: 0, col: 0} -> "A1"
    throw new Error('Method not implemented');
  }

  public async getAIDifficulty(): Promise<'easy' | 'medium' | 'hard'> {
    return new Promise((resolve) => {
      this.rl.question('Enter your choice (1-3): ', (answer) => {
        const choice = parseInt(answer);
        switch (choice) {
          case 1: resolve('easy'); break;
          case 2: resolve('medium'); break;
          case 3: resolve('hard'); break;
          default: resolve('medium'); break;
        }
      });
    });
  }

  public async getYesNo(question: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.rl.question(`${question} (y/n): `, (answer) => {
        resolve(answer.toLowerCase().startsWith('y'));
      });
    });
  }

  public async waitForKeyPress(message: string = 'Press Enter to continue...'): Promise<void> {
    return new Promise((resolve) => {
      this.rl.question(message, () => {
        resolve();
      });
    });
  }

  public validateShipName(shipName: string, availableShips: string[]): string | null {
    // TODO: Validate and normalize ship name
    // Accept partial matches and case-insensitive input
    // Return standardized ship name or null if invalid
    throw new Error('Method not implemented');
  }

  public close(): void {
    this.rl.close();
  }
}