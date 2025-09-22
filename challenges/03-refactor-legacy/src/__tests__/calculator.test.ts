import { Calculator } from '../calculator';

describe('Calculator (Legacy Tests)', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
    // Suppress console.log for cleaner test output
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Basic arithmetic', () => {
    test('should add two numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
      expect(calculator.add('2', '3')).toBe(5);
    });

    test('should subtract two numbers', () => {
      expect(calculator.sub(5, 3)).toBe(2);
      expect(calculator.sub('5', '3')).toBe(2);
    });

    test('should multiply two numbers', () => {
      expect(calculator.mul(4, 3)).toBe(12);
      expect(calculator.mul('4', '3')).toBe(12);
    });

    test('should divide two numbers', () => {
      expect(calculator.div(10, 2)).toBe(5);
      expect(calculator.div('10', '2')).toBe(5);
    });

    test('should handle division by zero', () => {
      expect(calculator.div(10, 0)).toBeNull();
    });

    test('should calculate power', () => {
      expect(calculator.pow(2, 3)).toBe(8);
      expect(calculator.pow('2', '3')).toBe(8);
    });

    test('should calculate square root', () => {
      expect(calculator.sqrt(9)).toBe(3);
      expect(calculator.sqrt('9')).toBe(3);
    });

    test('should handle negative square root', () => {
      expect(calculator.sqrt(-4)).toBeNull();
    });
  });

  describe('Advanced operations', () => {
    test('should calculate factorial', () => {
      expect(calculator.factorial(5)).toBe(120);
      expect(calculator.factorial(0)).toBe(1);
    });

    test('should handle invalid factorial input', () => {
      expect(calculator.factorial(-1)).toBeNull();
      expect(calculator.factorial(3.5)).toBeNull();
    });

    test('should calculate percentage', () => {
      expect(calculator.percentage(100, 15)).toBe(15);
      expect(calculator.percentage('100', '15')).toBe(15);
    });
  });

  describe('Memory operations', () => {
    test('should store and recall memory', () => {
      calculator.memoryStore(42);
      expect(calculator.memoryRecall()).toBe(42);
    });

    test('should add to memory', () => {
      calculator.memoryStore(10);
      calculator.memoryAdd(5);
      expect(calculator.memoryRecall()).toBe(15);
    });

    test('should clear memory', () => {
      calculator.memoryStore(42);
      calculator.memoryClear();
      expect(calculator.memoryRecall()).toBe(0);
    });
  });

  describe('History operations', () => {
    test('should track operation history', () => {
      calculator.add(2, 3);
      calculator.mul(4, 5);
      expect(calculator.h.length).toBe(2);
      expect(calculator.h[0]).toBe('2 + 3 = 5');
      expect(calculator.h[1]).toBe('4 * 5 = 20');
    });

    test('should clear history', () => {
      calculator.add(1, 1);
      calculator.clearHistory();
      expect(calculator.h.length).toBe(0);
    });
  });

  describe('Error handling', () => {
    test('should handle invalid string inputs', () => {
      expect(calculator.add('abc', '123')).toBeNull();
      expect(calculator.sub('123', 'def')).toBeNull();
    });

    test('should handle null/undefined inputs', () => {
      expect(calculator.add(null, 5)).toBeNull();
      expect(calculator.mul(undefined, 3)).toBeNull();
    });
  });
});