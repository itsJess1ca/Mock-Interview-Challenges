import { Direction } from './types';
import readline from "node:readline";
readline.emitKeypressEvents(process.stdin);

/**
 * Set up input handling for the game
 */
export function setupInput(onMove: (direction: Direction) => void, onQuit: () => void, onRestart: () => void): void {
  enableRawMode();
  process.stdin.on('keypress', (str, key) => {
    if (handleCtrlC(key.sequence)) {
      onQuit();
    }
    const direction = keyToDirection(key.name);
    if (direction) onMove(direction);
    if (str === "q") onQuit();
    if (str === "r") onRestart();
  });
}

/**
 * Convert key input to direction
 */
export function keyToDirection(key: string): Direction | null {
  // Map keyboard input to game directions
  // Support both WASD and arrow keys
  // Arrow key codes: ↑='\u001b[A', ↓='\u001b[B', ←='\u001b[D', →='\u001b[C'
  switch (key.toLowerCase()) {
    // Add cases for w, s, a, d and arrow keys
    case "a":
    case "left":
      return "left";
    case "w":
    case "up":
      return "up";
    case "d":
    case "right":
      return "right";
    case "s":
    case "down":
      return "down";
    default:
      return null;
  }
}

/**
 * Check if the input is a special command (quit, restart)
 */
export function isSpecialCommand(key: string): 'quit' | 'restart' | null {
  // TODO: Implement this function
  // Return 'quit' for Q, 'restart' for R, null otherwise
  throw new Error('Not implemented');
}

/**
 * Enable raw input mode for immediate key detection
 */
export function enableRawMode(): void {
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
}

/**
 * Disable raw input mode
 */
export function disableRawMode(): void {
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(false);
  }
  process.stdin.pause();
}

/**
 * Handle Ctrl+C gracefully
 */
export function handleCtrlC(key: string): boolean {
  return key === '\u0003'; // Ctrl+C
}

/**
 * Parse multi-character escape sequences (like arrow keys)
 */
export function parseEscapeSequence(key: string): string {
  // TODO: Handle escape sequences for arrow keys
  // Some terminals send multi-character sequences for special keys
  return key;
}
