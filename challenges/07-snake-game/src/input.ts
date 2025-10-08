import * as readline from 'readline';
import { Direction, GameSettings } from './types';

export class InputHandler {
  private rl: readline.Interface;
  private keyListeners: Map<string, () => void>;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.keyListeners = new Map();
    this.setupRawMode();
  }

  private setupRawMode(): void {
    // TODO: Setup raw mode for real-time input handling
    // This allows capturing individual keystrokes without Enter
    // Handle different platforms appropriately
    throw new Error('Method not implemented');
  }

  public onDirectionChange(callback: (direction: Direction) => void): void {
    // TODO: Register callback for direction changes
    // Map arrow keys and WASD to direction changes
    // Handle key mappings: ↑/W=Up, ↓/S=Down, ←/A=Left, →/D=Right
    throw new Error('Method not implemented');
  }

  public onPause(callback: () => void): void {
    // TODO: Register callback for pause key (P)
    this.keyListeners.set('p', callback);
  }

  public onRestart(callback: () => void): void {
    // TODO: Register callback for restart key (R)
    this.keyListeners.set('r', callback);
  }

  public onQuit(callback: () => void): void {
    // TODO: Register callback for quit key (Q)
    this.keyListeners.set('q', callback);
  }

  public onHelp(callback: () => void): void {
    // TODO: Register callback for help key (H)
    this.keyListeners.set('h', callback);
  }

  private handleKeyPress(key: string): void {
    // TODO: Handle individual key presses
    // Look up the key in keyListeners map and execute callback
    // Handle special keys and modifiers
    throw new Error('Method not implemented');
  }

  private mapKeyToDirection(key: string): Direction | null {
    // TODO: Map keyboard input to game directions
    // Support both arrow keys and WASD
    // Return null for non-direction keys
    throw new Error('Method not implemented');
  }

  public async getGameSettings(): Promise<GameSettings> {
    // TODO: Get game settings from user through interactive prompts
    // Ask about difficulty, board size, walls, special food
    // Return complete GameSettings object
    throw new Error('Method not implemented');
  }

  public async getDifficulty(): Promise<'easy' | 'medium' | 'hard' | 'insane'> {
    return new Promise((resolve) => {
      console.log('Select difficulty:');
      console.log('1. Easy (Slow speed)');
      console.log('2. Medium (Normal speed)');
      console.log('3. Hard (Fast speed)');
      console.log('4. Insane (Very fast speed)');

      this.rl.question('Enter your choice (1-4): ', (answer) => {
        const choice = parseInt(answer);
        switch (choice) {
          case 1: resolve('easy'); break;
          case 2: resolve('medium'); break;
          case 3: resolve('hard'); break;
          case 4: resolve('insane'); break;
          default: resolve('medium'); break;
        }
      });
    });
  }

  public async getBoardSize(): Promise<'small' | 'medium' | 'large'> {
    return new Promise((resolve) => {
      console.log('Select board size:');
      console.log('1. Small (15x15)');
      console.log('2. Medium (20x20)');
      console.log('3. Large (30x20)');

      this.rl.question('Enter your choice (1-3): ', (answer) => {
        const choice = parseInt(answer);
        switch (choice) {
          case 1: resolve('small'); break;
          case 2: resolve('medium'); break;
          case 3: resolve('large'); break;
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

  public async waitForKeyPress(message: string = 'Press any key to continue...'): Promise<void> {
    // TODO: Wait for any key press before continuing
    // Useful for pause screens and game over screens
    throw new Error('Method not implemented');
  }

  public enableRealTimeInput(): void {
    // TODO: Enable real-time input mode for gameplay
    // Switch to raw mode where each keypress is immediately captured
    throw new Error('Method not implemented');
  }

  public disableRealTimeInput(): void {
    // TODO: Disable real-time input mode
    // Return to normal line-based input for menus
    throw new Error('Method not implemented');
  }

  public close(): void {
    this.rl.close();
    // TODO: Clean up any raw mode settings
  }
}