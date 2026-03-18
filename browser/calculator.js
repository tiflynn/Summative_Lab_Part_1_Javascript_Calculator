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
  history.forEach((entry, i) => {
    console.log(`${i + 1}. ${entry.a} ${entry.operation} ${entry.b} = ${entry.result}`);
  });
}

let currentInput = '0';
let operator = null;
let previousInput = null;
let justCalculated = false;

function updateDisplay(expression = '') {
  document.getElementById('current').textContent = currentInput;
  document.getElementById('expression').textContent = expression;
}

function appendDigit(digit) {
  if (justCalculated) {
    currentInput = digit === '.' ? '0.' : digit;
    justCalculated = false;
  } else if (digit === '.' && currentInput.includes('.')) {
    return;
  } else {
    currentInput = currentInput === '0' && digit !== '.' ? digit : currentInput + digit;
  }
  updateDisplay();
}

function setOperator(op) {
  if (operator && !justCalculated) calculate();
  previousInput = parseFloat(currentInput);
  operator = op;
  justCalculated = false;
  updateDisplay(`${previousInput} ${op}`);
  currentInput = '0';
}

function calculate() {
  if (operator === null || previousInput === null) return;
  const a = previousInput;
  const b = parseFloat(currentInput);
  const symbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
  let result;

  try {
    if (operator === '+') result = add(a, b);
    else if (operator === '-') result = subtract(a, b);
    else if (operator === '*') result = multiply(a, b);
    else if (operator === '/') result = divide(a, b);
  } catch (e) {
    updateDisplay('Error');
    currentInput = '0';
    operator = null;
    previousInput = null;
    return;
  }

  const expr = `${a} ${symbols[operator]} ${b} =`;
  currentInput = String(parseFloat(result.toFixed(10)));
  operator = null;
  previousInput = null;
  justCalculated = true;
  updateDisplay(expr);
  refreshHistoryPanel();
}

function clearAll() {
  currentInput = '0';
  operator = null;
  previousInput = null;
  justCalculated = false;
  updateDisplay();
}

function toggleHistory() {
  const panel = document.getElementById('historyPanel');
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  refreshHistoryPanel();
  printHistory();
}

function refreshHistoryPanel() {
  const list = document.getElementById('historyList');
  if (history.length === 0) {
    list.innerHTML = '<span class="empty">No history yet.</span>';
    return;
  }
  const symbols = { add: '+', subtract: '−', multiply: '×', divide: '÷' };
  list.innerHTML = history.slice().reverse().map((entry, i) =>
    `<div class="history-item">${history.length - i}. ${entry.a} ${symbols[entry.operation]} ${entry.b} = ${entry.result}</div>`
  ).join('');
}
