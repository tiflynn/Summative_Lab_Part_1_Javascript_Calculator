const { add, subtract, multiply, divide, calculate, printHistory, history } = require('../src/console-calculator');

beforeEach(() => {
  history.length = 0;
});

describe('add', () => {
  test('adds two positive numbers', () => {
    expect(add(9, 12)).toBe(21);
  });

  test('adds a positive and negative number', () => {
    expect(add(5, -3)).toBe(2);
  });

  test('adds two decimals', () => {
    expect(add(1.5, 2.5)).toBe(4);
  });

  test('records entry in history', () => {
    add(1, 2);
    expect(history).toHaveLength(1);
    expect(history[0]).toEqual({ operation: 'add', a: 1, b: 2, result: 3 });
  });
});

describe('subtract', () => {
  test('subtracts two numbers', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('returns negative result', () => {
    expect(subtract(3, 9)).toBe(-6);
  });

  test('subtracts decimals', () => {
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
  });

  test('records entry in history', () => {
    subtract(8, 3);
    expect(history[0]).toEqual({ operation: 'subtract', a: 8, b: 3, result: 5 });
  });
});

describe('multiply', () => {
  test('multiplies two positive numbers', () => {
    expect(multiply(3, 4)).toBe(12);
  });

  test('multiplies by zero', () => {
    expect(multiply(99, 0)).toBe(0);
  });

  test('multiplies two negatives', () => {
    expect(multiply(-3, -4)).toBe(12);
  });

  test('records entry in history', () => {
    multiply(2, 5);
    expect(history[0]).toEqual({ operation: 'multiply', a: 2, b: 5, result: 10 });
  });
});

describe('divide', () => {
  test('divides two numbers', () => {
    expect(divide(20, 4)).toBe(5);
  });

  test('returns decimal result', () => {
    expect(divide(1, 4)).toBe(0.25);
  });

  test('throws on division by zero', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero');
  });

  test('records entry in history', () => {
    divide(10, 2);
    expect(history[0]).toEqual({ operation: 'divide', a: 10, b: 2, result: 5 });
  });
});

describe('calculate', () => {
  test('parses and evaluates addition', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    calculate('9+12');
    expect(console.log).toHaveBeenCalledWith('= 21');
    console.log.mockRestore();
  });

  test('parses and evaluates subtraction', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    calculate('10-3');
    expect(console.log).toHaveBeenCalledWith('= 7');
    console.log.mockRestore();
  });

  test('parses and evaluates multiplication', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    calculate('5*4');
    expect(console.log).toHaveBeenCalledWith('= 20');
    console.log.mockRestore();
  });

  test('parses and evaluates division', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    calculate('20/4');
    expect(console.log).toHaveBeenCalledWith('= 5');
    console.log.mockRestore();
  });

  test('handles spaces around operator', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    calculate('3 + 7');
    expect(console.log).toHaveBeenCalledWith('= 10');
    console.log.mockRestore();
  });

  test('prints error for division by zero', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    calculate('5/0');
    expect(console.log).toHaveBeenCalledWith('Error: Division by zero');
    console.log.mockRestore();
  });

  test('prints error for invalid input', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    calculate('abc');
    expect(console.log).toHaveBeenCalledWith('Invalid input. Use format: 9+12, 5*3, 10/2, 8-4');
    console.log.mockRestore();
  });

  test('adds result to history', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    calculate('6+4');
    expect(history).toHaveLength(1);
    console.log.mockRestore();
  });
});

describe('printHistory', () => {
  test('prints "No history yet." when history is empty', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    printHistory();
    expect(console.log).toHaveBeenCalledWith('No history yet.');
    console.log.mockRestore();
  });

  test('prints each history entry', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    add(2, 3);
    subtract(9, 4);
    printHistory();
    expect(console.log).toHaveBeenCalledWith('1. 2 + 3 = 5');
    expect(console.log).toHaveBeenCalledWith('2. 9 - 4 = 5');
    console.log.mockRestore();
  });
});
