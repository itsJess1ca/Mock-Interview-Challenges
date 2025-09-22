export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface TodoList {
  todos: Todo[];
  nextId: number;
}

export type Priority = 'low' | 'medium' | 'high';

export interface TodoWithPriority extends Todo {
  priority: Priority;
}