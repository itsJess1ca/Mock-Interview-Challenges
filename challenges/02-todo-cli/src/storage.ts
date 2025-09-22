import * as fs from 'fs';
import * as path from 'path';
import { TodoList } from './types';

export class TodoStorage {
  private filePath: string;

  constructor(filename: string = 'todos.json') {
    this.filePath = path.join(process.cwd(), filename);
  }

  public async loadTodos(): Promise<TodoList> {
    // TODO: Implement loading todos from file
    // 1. Check if file exists
    // 2. If it doesn't exist, return empty TodoList with nextId: 1
    // 3. If it exists, read and parse the JSON
    // 4. Handle errors gracefully (corrupted file, etc.)
    // 5. Convert date strings back to Date objects
    throw new Error('Method not implemented');
  }

  public async saveTodos(todoList: TodoList): Promise<void> {
    // TODO: Implement saving todos to file
    // 1. Convert TodoList to JSON string
    // 2. Write to file atomically (consider using a temp file)
    // 3. Handle write errors
    throw new Error('Method not implemented');
  }

  public async backupTodos(): Promise<string> {
    // TODO: Create a backup file with timestamp
    // Return the backup filename
    throw new Error('Method not implemented');
  }

  private fileExists(): boolean {
    // TODO: Check if the todos file exists
    throw new Error('Method not implemented');
  }
}