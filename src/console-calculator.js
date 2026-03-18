const readline = require('readline');

const history = [];

function add(a, b) {
  const result = a + b;
  history.push({ operation: 'add', a, b, result });
  return result;
}

function subtract(a, b) {
  const result = a - b;
  history.push({ operation: 'subtract', a, b, result });
  return result;
}

function multiply(a, b) {
  const result = a * b;
  history.push({ operation: 'multiply', a, b, result });
  return result;
}

function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  const result = a / b;
  history.push({ operation: 'divide', a, b, result });
  return result;
}

function printHistory() {
  if (history.length === 0) {
    console.log('No history yet.');
    return;
  }
  const symbols = { add: '+', subtract: '-', multiply: '*', divide: '/' };
  history.forEach((entry, i) => {
    console.log(`${i + 1}. ${entry.a} ${symbols[entry.operation]} ${entry.b} = ${entry.result}`);
  });
}

function calculate(input) {
  const match = input.trim().match(/^(-?\d+\.?\d*)\s*([\+\-\*\/])\s*(-?\d+\.?\d*)$/);
  if (!match) {
    console.log('Invalid input. Use format: 9+12, 5*3, 10/2, 8-4');
    return;
  }

  const a = parseFloat(match[1]);
  const op = match[2];
  const b = parseFloat(match[3]);

  try {
    let result;
    if (op === '+') result = add(a, b);
    else if (op === '-') result = subtract(a, b);
    else if (op === '*') result = multiply(a, b);
    else if (op === '/') result = divide(a, b);

    console.log(`= ${result}`);
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
}

module.exports = { add, subtract, multiply, divide, calculate, printHistory, history };

if (require.main === module) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Console Calculator');
  console.log('Type an expression like 9+12, or "history" to see past calculations, or "exit" to quit.');
  console.log('');

  rl.setPrompt('> ');
  rl.prompt();

  rl.on('line', (line) => {
    const input = line.trim();

    if (input === 'exit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }

    if (input === 'history') {
      printHistory();
    } else if (input !== '') {
      calculate(input);
    }

    rl.prompt();
  });
}
