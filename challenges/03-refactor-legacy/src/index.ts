// LEGACY CLI - Also needs improvement
import { Calculator } from './calculator';
import * as readline from 'readline';

const calc = new Calculator();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('=== Legacy Calculator ===');
console.log('Enter operations like: add 5 3, sub 10 2, etc.');
console.log('Available operations: add, sub, mul, div, pow, sqrt, factorial, percentage');
console.log('Memory operations: ms (store), mr (recall), ma (add), mc (clear)');
console.log('Other: history, clear, exit');

function processCommand(input: string): void {
  const parts = input.trim().split(' ');
  const command = parts[0].toLowerCase();

  switch (command) {
    case 'add':
      if (parts.length !== 3) {
        console.log('Usage: add <number1> <number2>');
        break;
      }
      console.log('Result:', calc.add(parts[1], parts[2]));
      break;
    case 'sub':
      if (parts.length !== 3) {
        console.log('Usage: sub <number1> <number2>');
        break;
      }
      console.log('Result:', calc.sub(parts[1], parts[2]));
      break;
    case 'mul':
      if (parts.length !== 3) {
        console.log('Usage: mul <number1> <number2>');
        break;
      }
      console.log('Result:', calc.mul(parts[1], parts[2]));
      break;
    case 'div':
      if (parts.length !== 3) {
        console.log('Usage: div <number1> <number2>');
        break;
      }
      console.log('Result:', calc.div(parts[1], parts[2]));
      break;
    case 'pow':
      if (parts.length !== 3) {
        console.log('Usage: pow <base> <exponent>');
        break;
      }
      console.log('Result:', calc.pow(parts[1], parts[2]));
      break;
    case 'sqrt':
      if (parts.length !== 2) {
        console.log('Usage: sqrt <number>');
        break;
      }
      console.log('Result:', calc.sqrt(parts[1]));
      break;
    case 'factorial':
      if (parts.length !== 2) {
        console.log('Usage: factorial <number>');
        break;
      }
      console.log('Result:', calc.factorial(parts[1]));
      break;
    case 'percentage':
      if (parts.length !== 3) {
        console.log('Usage: percentage <value> <percent>');
        break;
      }
      console.log('Result:', calc.percentage(parts[1], parts[2]));
      break;
    case 'ms':
      if (parts.length !== 2) {
        console.log('Usage: ms <value>');
        break;
      }
      calc.memoryStore(parts[1]);
      break;
    case 'mr':
      calc.memoryRecall();
      break;
    case 'ma':
      if (parts.length !== 2) {
        console.log('Usage: ma <value>');
        break;
      }
      calc.memoryAdd(parts[1]);
      break;
    case 'mc':
      calc.memoryClear();
      break;
    case 'history':
      calc.showHistory();
      break;
    case 'clear':
      calc.clearHistory();
      break;
    case 'exit':
      console.log('Goodbye!');
      rl.close();
      return;
    default:
      console.log('Unknown command. Try: add, sub, mul, div, pow, sqrt, factorial, percentage, ms, mr, ma, mc, history, clear, exit');
  }
}

function promptUser(): void {
  rl.question('calc> ', (input) => {
    processCommand(input);
    promptUser();
  });
}

promptUser();