import { InputHandler } from '../input';

describe('InputHandler', () => {
  let input: InputHandler;

  beforeEach(() => {
    input = new InputHandler();
  });

  afterEach(() => {
    input.teardown();
  });

  describe('setup and teardown', () => {
    it('should set up input handling without throwing errors', () => {
      const mockMove = jest.fn();
      const mockQuit = jest.fn();
      const mockRestart = jest.fn();

      expect(() => {
        input.setup(mockMove, mockQuit, mockRestart);
      }).not.toThrow();
    });

    it('should tear down input handling without throwing errors', () => {
      const mockMove = jest.fn();
      const mockQuit = jest.fn();
      const mockRestart = jest.fn();

      input.setup(mockMove, mockQuit, mockRestart);
      expect(() => input.teardown()).not.toThrow();
    });

    it('should allow multiple setup/teardown cycles', () => {
      const mockMove = jest.fn();
      const mockQuit = jest.fn();
      const mockRestart = jest.fn();

      expect(() => {
        input.setup(mockMove, mockQuit, mockRestart);
        input.teardown();
        input.setup(mockMove, mockQuit, mockRestart);
        input.teardown();
      }).not.toThrow();
    });
  });
});
