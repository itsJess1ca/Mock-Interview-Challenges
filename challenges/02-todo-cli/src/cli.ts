import { TodoManager } from './todoManager';
import { Todo } from './types';

export class TodoCLI {
  private todoManager: TodoManager;

  constructor(todoManager: TodoManager) {
    this.todoManager = todoManager;
  }

  public async processCommand(args: string[]): Promise<void> {
    if (args.length === 0) {
      this.showHelp();
      return;
    }

    const command = args[0].toLowerCase();

    try {
      switch (command) {
        case 'add':
          await this.handleAdd(args.slice(1));
          break;
        case 'list':
          await this.handleList(args.slice(1));
          break;
        case 'complete':
          await this.handleComplete(args.slice(1));
          break;
        case 'delete':
          await this.handleDelete(args.slice(1));
          break;
        case 'update':
          await this.handleUpdate(args.slice(1));
          break;
        case 'search':
          await this.handleSearch(args.slice(1));
          break;
        case 'stats':
          await this.handleStats();
          break;
        case 'clear':
          await this.handleClear();
          break;
        case 'help':
          this.showHelp();
          break;
        default:
          console.log(`Unknown command: ${command}`);
          this.showHelp();
      }
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : String(error));
    }
  }

  private async handleAdd(args: string[]): Promise<void> {
    // TODO: Implement add command
    // Join args to create todo text
    // Validate that text is not empty
    // Call todoManager.addTodo()
    // Display success message
    throw new Error('Method not implemented');
  }

  private async handleList(args: string[]): Promise<void> {
    // TODO: Implement list command
    // Check for --completed or --pending flags
    // Get todos from todoManager
    // Display in a nice format with IDs
    throw new Error('Method not implemented');
  }

  private async handleComplete(args: string[]): Promise<void> {
    // TODO: Implement complete command
    // Parse todo ID from args
    // Call todoManager.completeTodo()
    // Display appropriate message
    throw new Error('Method not implemented');
  }

  private async handleDelete(args: string[]): Promise<void> {
    // TODO: Implement delete command
    // Parse todo ID from args
    // Call todoManager.deleteTodo()
    // Display appropriate message
    throw new Error('Method not implemented');
  }

  private async handleUpdate(args: string[]): Promise<void> {
    // TODO: Implement update command
    // Parse ID and new text from args
    // Call todoManager.updateTodo()
    // Display appropriate message
    throw new Error('Method not implemented');
  }

  private async handleSearch(args: string[]): Promise<void> {
    // TODO: Implement search command
    // Join args to create search query
    // Call todoManager.searchTodos()
    // Display results
    throw new Error('Method not implemented');
  }

  private async handleStats(): Promise<void> {
    // TODO: Implement stats command
    // Get stats from todoManager
    // Display in a nice format
    throw new Error('Method not implemented');
  }

  private async handleClear(): Promise<void> {
    // TODO: Implement clear completed command
    // Call todoManager.clearCompleted()
    // Display number of todos removed
    throw new Error('Method not implemented');
  }

  private displayTodos(todos: Todo[]): void {
    // TODO: Display todos in a nice format
    // Show ID, status (✓/✗), text, and creation date
    // Different colors for completed vs pending
    throw new Error('Method not implemented');
  }

  private showHelp(): void {
    console.log(`
Todo CLI - Manage your tasks from the command line

Usage: npm run dev [command] [options]

Commands:
  add <text>        Add a new todo
  list [--pending]  List all todos (or only pending ones)
  complete <id>     Mark todo as completed
  delete <id>       Delete a todo
  update <id> <text> Update todo text
  search <query>    Search todos by text
  stats             Show todo statistics
  clear             Remove all completed todos
  help              Show this help message

Examples:
  npm run dev add "Buy groceries"
  npm run dev list --pending
  npm run dev complete 1
  npm run dev update 2 "Buy organic groceries"
  npm run dev search "groceries"
    `);
  }
}