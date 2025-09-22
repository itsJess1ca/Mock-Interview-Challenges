import { Todo, TodoList } from './types';
import { TodoStorage } from './storage';

export class TodoManager {
  private todoList: TodoList;
  private storage: TodoStorage;

  constructor(storage: TodoStorage) {
    this.storage = storage;
    this.todoList = { todos: [], nextId: 1 };
  }

  public async initialize(): Promise<void> {
    this.todoList = await this.storage.loadTodos();
  }

  public async addTodo(text: string): Promise<Todo> {
    // TODO: Implement adding a new todo
    // 1. Create new Todo object with current timestamp
    // 2. Add to the list
    // 3. Increment nextId
    // 4. Save to storage
    // 5. Return the created todo
    throw new Error('Method not implemented');
  }

  public async completeTodo(id: number): Promise<boolean> {
    // TODO: Mark a todo as completed
    // 1. Find todo by id
    // 2. Set completed to true and completedAt to current time
    // 3. Save to storage
    // 4. Return true if found and updated, false otherwise
    throw new Error('Method not implemented');
  }

  public async deleteTodo(id: number): Promise<boolean> {
    // TODO: Delete a todo by id
    // 1. Find and remove todo from list
    // 2. Save to storage
    // 3. Return true if found and deleted, false otherwise
    throw new Error('Method not implemented');
  }

  public async updateTodo(id: number, newText: string): Promise<boolean> {
    // TODO: Update todo text
    // 1. Find todo by id
    // 2. Update the text
    // 3. Save to storage
    // 4. Return true if found and updated, false otherwise
    throw new Error('Method not implemented');
  }

  public listTodos(showCompleted: boolean = true): Todo[] {
    // TODO: Return filtered list of todos
    // If showCompleted is false, filter out completed todos
    // Sort by creation date (newest first)
    throw new Error('Method not implemented');
  }

  public searchTodos(query: string): Todo[] {
    // TODO: Search todos by text content
    // Should be case-insensitive
    // Return matching todos sorted by relevance
    throw new Error('Method not implemented');
  }

  public getStats(): { total: number; completed: number; pending: number } {
    // TODO: Return statistics about todos
    throw new Error('Method not implemented');
  }

  public async clearCompleted(): Promise<number> {
    // TODO: Remove all completed todos
    // Return the number of todos removed
    throw new Error('Method not implemented');
  }
}