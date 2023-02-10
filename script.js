// Operators
function add(augend, addend) {
  return augend + addend;
}

function subtract(minuend, subtrahend) {
  return minuend - subtrahend;
}

function multiply(multiplicand, multiplier) {
  return multiplicand * multiplier;
}

function divide(dividend, divisor) {
  return dividend / divisor;
}

function exponentiate(base, exponent) {
  return base ** exponent;
}
// could add a root function
function negate(value) {
  return value * -1;
}

function operate(operator, firstOperand, secondOperand) {
  switch (operator) {
    case "+":
      return add(firstOperand, secondOperand);
      break;
    case "-":
      return subtract(firstOperand, secondOperand);
      break;
    case "*":
      return multiply(firstOperand, secondOperand);
      break;
    case "/":
      return divide(firstOperand, secondOperand);
      break;
    case "**":
      return exponentiate(firstOperand, secondOperand);
      break;
    case "+/-":
      return negate(firstOperand);
      break;
  }
}
