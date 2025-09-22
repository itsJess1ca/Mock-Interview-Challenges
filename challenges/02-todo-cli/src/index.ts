import { TodoManager } from './todoManager';
import { TodoStorage } from './storage';
import { TodoCLI } from './cli';

async function main(): Promise<void> {
  const storage = new TodoStorage();
  const todoManager = new TodoManager(storage);
  const cli = new TodoCLI(todoManager);

  await todoManager.initialize();

  const args = process.argv.slice(2);
  await cli.processCommand(args);
}

if (require.main === module) {
  main().catch(console.error);
}