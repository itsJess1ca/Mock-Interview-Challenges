# Challenge 2: Todo CLI with Persistence

**Difficulty:** Medium
**Estimated Time:** 60-90 minutes
**Skills:** File I/O, CLI interfaces, CRUD operations, async/await, testing

## Overview

Build a command-line todo application that persists data to a JSON file. This challenge tests your ability to:
- Handle file system operations and data persistence
- Design clean APIs and interfaces
- Work with async/await and error handling
- Parse command-line arguments
- Write comprehensive tests

## Getting Started

```bash
cd challenges/02-todo-cli
npm install
npm run dev help
```

## What You Need to Implement

### 1. Storage Layer (`src/storage.ts`)
- `loadTodos()` - Load todos from JSON file, handle missing/corrupted files
- `saveTodos()` - Save todos to JSON file atomically
- `backupTodos()` - Create timestamped backup files
- `fileExists()` - Check if file exists

### 2. Todo Manager (`src/todoManager.ts`)
- `addTodo()` - Add new todo with auto-incrementing ID
- `completeTodo()` - Mark todo as completed with timestamp
- `deleteTodo()` - Remove todo by ID
- `updateTodo()` - Edit todo text
- `listTodos()` - Get todos with optional filtering
- `searchTodos()` - Search todos by text (case-insensitive)
- `getStats()` - Return counts of total/completed/pending
- `clearCompleted()` - Remove all completed todos

### 3. CLI Interface (`src/cli.ts`)
- `handleAdd()` - Process add command
- `handleList()` - Process list command with flags
- `handleComplete()` - Process complete command
- `handleDelete()` - Process delete command
- `handleUpdate()` - Process update command
- `handleSearch()` - Process search command
- `handleStats()` - Process stats command
- `handleClear()` - Process clear command
- `displayTodos()` - Format and display todos nicely

### 4. Tests (`src/__tests__/todoManager.test.ts`)
- Add comprehensive tests for all TodoManager methods
- Test edge cases and error conditions
- Mock the storage layer appropriately

## Example Commands

```bash
# Add todos
npm run dev add "Buy groceries"
npm run dev add "Learn TypeScript"

# List todos
npm run dev list
npm run dev list --pending

# Complete todos
npm run dev complete 1

# Update todos
npm run dev update 2 "Master TypeScript"

# Search todos
npm run dev search "TypeScript"

# Show statistics
npm run dev stats

# Clear completed todos
npm run dev clear
```

## Requirements

1. **Data Persistence**: Todos must survive app restarts
2. **Error Handling**: Gracefully handle file errors, invalid IDs, etc.
3. **Input Validation**: Validate command arguments
4. **User-Friendly Output**: Clear messages and formatted displays
5. **Test Coverage**: Comprehensive tests for core functionality

## Advanced Features (Bonus)

- Add todo priorities (high, medium, low)
- Due dates and reminders
- Categories/tags
- Export to different formats
- Undo functionality

## Tips for Success

- Start with the storage layer - get file persistence working first
- Build incrementally - implement one command at a time
- Test as you go - don't wait until the end
- Handle edge cases early (empty files, invalid JSON, etc.)
- Use TypeScript features (interfaces, types) effectively

## Common Pitfalls

- Not handling missing or corrupted JSON files
- Forgetting to save after modifications
- Not validating user input (IDs, empty text)
- Race conditions in file operations
- Poor error messages that don't help users

This challenge demonstrates real-world skills in building CLI tools and data persistence!