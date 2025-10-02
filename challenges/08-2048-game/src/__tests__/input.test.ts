import { keyToDirection } from '../input';

describe('Input Functions', () => {
  describe('keyToDirection', () => {
    it('should map WASD keys to directions', () => {
      expect(keyToDirection('w')).toBe('up');
      expect(keyToDirection('W')).toBe('up');
      expect(keyToDirection('s')).toBe('down');
      expect(keyToDirection('S')).toBe('down');
      expect(keyToDirection('a')).toBe('left');
      expect(keyToDirection('A')).toBe('left');
      expect(keyToDirection('d')).toBe('right');
      expect(keyToDirection('D')).toBe('right');
    });

    it('should map arrow keys to directions', () => {
      expect(keyToDirection('up')).toBe('up');     // Up arrow
      expect(keyToDirection('down')).toBe('down');   // Down arrow
      expect(keyToDirection('left')).toBe('left');   // Left arrow
      expect(keyToDirection('right')).toBe('right');  // Right arrow
    });

    it('should return null for invalid keys', () => {
      expect(keyToDirection('x')).toBe(null);
      expect(keyToDirection('1')).toBe(null);
      expect(keyToDirection(' ')).toBe(null);
      expect(keyToDirection('enter')).toBe(null);
    });
  });
});
