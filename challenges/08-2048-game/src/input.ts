import { Direction } from './types';
import readline from 'node:readline';

type KeypressListener = (str: string, key: readline.Key) => void;

/**
 * InputHandler class manages keyboard input for the game
 * Handles raw mode stdin, keypress events, and input mapping
 */
export class InputHandler {
  private keypressListener: KeypressListener | null = null;
  private isKeypressEventsEnabled = false;

  /**
   * Set up input handling for the game
   * @param onMove - Callback when a movement key is pressed
   * @param onQuit - Callback when quit is requested
   * @param onRestart - Callback when restart is requested
   */
  public setup(
    onMove: (direction: Direction) => void,
    onQuit: () => void,
    onRestart: () => void
  ): void {
    // Enable keypress events if not already enabled
    if (!this.isKeypressEventsEnabled) {
      readline.emitKeypressEvents(process.stdin);
      this.isKeypressEventsEnabled = true;
    }

    this.enableRawMode();

    this.keypressListener = (str: string, key: readline.Key) => {
      if (!key?.sequence) return;

      if (this.handleCtrlC(key.sequence)) {
        onQuit();
        return;
      }

      if (!key?.name) return;

      const direction = this.keyToDirection(key.name);
      if (direction) onMove(direction);

      if (str === 'q') onQuit();
      if (str === 'r') onRestart();
    };

    process.stdin.on('keypress', this.keypressListener);
  }

  /**
   * Tear down input handling
   */
  public teardown(): void {
    if (this.keypressListener) {
      process.stdin.removeListener('keypress', this.keypressListener);
      this.keypressListener = null;
    }
    this.disableRawMode();
  }

  /**
   * Convert key input to direction
   * @private
   */
  private keyToDirection(key: string): Direction | null {
    switch (key.toLowerCase()) {
      case 'a':
      case 'left':
        return 'left';
      case 'w':
      case 'up':
        return 'up';
      case 'd':
      case 'right':
        return 'right';
      case 's':
      case 'down':
        return 'down';
      default:
        return null;
    }
  }

  /**
   * Enable raw input mode for immediate key detection
   * @private
   */
  private enableRawMode(): void {
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
  }

  /**
   * Disable raw input mode
   * @private
   */
  private disableRawMode(): void {
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }
    process.stdin.pause();
  }

  /**
   * Handle Ctrl+C gracefully
   * @private
   */
  private handleCtrlC(key: string): boolean {
    return key === '\u0003'; // Ctrl+C
  }
}
