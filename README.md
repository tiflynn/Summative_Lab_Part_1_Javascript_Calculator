# JavaScript Calculator

A calculator built in two forms: a browser-based UI and a Node.js console application. Both support the four basic arithmetic operations and maintain a running calculation history.

## Project Structure

```
├── package.json
├── browser/
│   ├── calculator.html   # Browser calculator UI
│   ├── calculator.css    # Styles
│   └── calculator.js     # Math logic and UI behavior
├── src/
│   └── console-calculator.js   # Node.js REPL calculator
└── tests/
    └── console-calculator.test.js   # Jest unit tests
```

## Requirements

- [Node.js](https://nodejs.org/) v14 or higher (for the console app and tests)
- A modern web browser (for the browser app — no build step required)

## Setup

Install dependencies (only needed for running tests):

```bash
npm install
```

## Running the Browser Calculator

Open `browser/calculator.html` directly in a web browser. No server or build step is required.

**Supported operations:**
- Addition, subtraction, multiplication, division
- Decimal numbers
- Chained operations
- History panel (click the **History** button)
- **AC** clears the current calculation

## Running the Console Calculator

```bash
node src/console-calculator.js
```

Type an expression at the `>` prompt and press Enter:

```
> 9+12
= 21
> 100 / 4
= 25
> 3.5 * 2
= 7
> history
1. 9 + 12 = 21
2. 100 / 4 = 25
3. 3.5 * 2 = 7
> exit
Goodbye!
```

**Supported commands:**

| Command     | Description                        |
|-------------|------------------------------------|
| `9+12`      | Evaluate an expression             |
| `history`   | Print all past calculations        |
| `exit`      | Quit the program                   |

Supported operators: `+`, `-`, `*`, `/`

## Running Tests

```bash
npm test
```

Tests cover all math functions (`add`, `subtract`, `multiply`, `divide`), the `calculate` input parser, and `printHistory`. There are 26 tests in total.
