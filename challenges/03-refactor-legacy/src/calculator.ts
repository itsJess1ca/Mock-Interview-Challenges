// LEGACY CODE - NEEDS REFACTORING
// This calculator was written quickly and has many issues
// Your job is to refactor it while maintaining the same functionality

export class Calculator {
  public h: any[] = []; // history
  public m: number = 0; // memory

  // Add two numbers
  public add(a: any, b: any): any {
    let result;
    if (typeof a === 'string') a = parseFloat(a);
    if (typeof b === 'string') b = parseFloat(b);
    if (isNaN(a) || isNaN(b)) {
      console.log('Error: Invalid input');
      return null;
    }
    result = a + b;
    this.h.push(`${a} + ${b} = ${result}`);
    return result;
  }

  // Subtract
  public sub(a: any, b: any): any {
    let result;
    if (typeof a === 'string') a = parseFloat(a);
    if (typeof b === 'string') b = parseFloat(b);
    if (isNaN(a) || isNaN(b)) {
      console.log('Error: Invalid input');
      return null;
    }
    result = a - b;
    this.h.push(`${a} - ${b} = ${result}`);
    return result;
  }

  // Multiply
  public mul(a: any, b: any): any {
    let result;
    if (typeof a === 'string') a = parseFloat(a);
    if (typeof b === 'string') b = parseFloat(b);
    if (isNaN(a) || isNaN(b)) {
      console.log('Error: Invalid input');
      return null;
    }
    result = a * b;
    this.h.push(`${a} * ${b} = ${result}`);
    return result;
  }

  // Divide
  public div(a: any, b: any): any {
    let result;
    if (typeof a === 'string') a = parseFloat(a);
    if (typeof b === 'string') b = parseFloat(b);
    if (isNaN(a) || isNaN(b)) {
      console.log('Error: Invalid input');
      return null;
    }
    if (b === 0) {
      console.log('Error: Division by zero');
      return null;
    }
    result = a / b;
    this.h.push(`${a} / ${b} = ${result}`);
    return result;
  }

  // Power
  public pow(a: any, b: any): any {
    let result;
    if (typeof a === 'string') a = parseFloat(a);
    if (typeof b === 'string') b = parseFloat(b);
    if (isNaN(a) || isNaN(b)) {
      console.log('Error: Invalid input');
      return null;
    }
    result = Math.pow(a, b);
    this.h.push(`${a} ^ ${b} = ${result}`);
    return result;
  }

  // Square root
  public sqrt(a: any): any {
    let result;
    if (typeof a === 'string') a = parseFloat(a);
    if (isNaN(a)) {
      console.log('Error: Invalid input');
      return null;
    }
    if (a < 0) {
      console.log('Error: Cannot take square root of negative number');
      return null;
    }
    result = Math.sqrt(a);
    this.h.push(`sqrt(${a}) = ${result}`);
    return result;
  }

  // Store value in memory
  public memoryStore(value: any): void {
    if (typeof value === 'string') value = parseFloat(value);
    if (isNaN(value)) {
      console.log('Error: Invalid input');
      return;
    }
    this.m = value;
    console.log(`Stored ${value} in memory`);
  }

  // Recall memory
  public memoryRecall(): number {
    console.log(`Memory: ${this.m}`);
    return this.m;
  }

  // Add to memory
  public memoryAdd(value: any): void {
    if (typeof value === 'string') value = parseFloat(value);
    if (isNaN(value)) {
      console.log('Error: Invalid input');
      return;
    }
    this.m += value;
    console.log(`Added ${value} to memory. Memory now: ${this.m}`);
  }

  // Clear memory
  public memoryClear(): void {
    this.m = 0;
    console.log('Memory cleared');
  }

  // Show history
  public showHistory(): void {
    console.log('=== Calculator History ===');
    if (this.h.length === 0) {
      console.log('No history available');
      return;
    }
    for (let i = 0; i < this.h.length; i++) {
      console.log(`${i + 1}. ${this.h[i]}`);
    }
  }

  // Clear history
  public clearHistory(): void {
    this.h = [];
    console.log('History cleared');
  }

  // Calculate percentage
  public percentage(value: any, percent: any): any {
    if (typeof value === 'string') value = parseFloat(value);
    if (typeof percent === 'string') percent = parseFloat(percent);
    if (isNaN(value) || isNaN(percent)) {
      console.log('Error: Invalid input');
      return null;
    }
    const result = (value * percent) / 100;
    this.h.push(`${percent}% of ${value} = ${result}`);
    return result;
  }

  // Factorial
  public factorial(n: any): any {
    if (typeof n === 'string') n = parseFloat(n);
    if (isNaN(n) || n < 0 || n !== Math.floor(n)) {
      console.log('Error: Factorial requires non-negative integer');
      return null;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    this.h.push(`${n}! = ${result}`);
    return result;
  }
}