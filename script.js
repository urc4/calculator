const Operators = {
  add: (augend, addend) => augend + addend,
  subtract: (minuend, subtrahend) => minuend - subtrahend,
  multiply: (multiplicand, multiplier) => multiplicand * multiplier,
  divide: (dividend, divisor) => dividend / divisor,
  exponentiate: (base, exponent) => base ** exponent,
  negate: (value) => value * -1,
  // could add a root operator?
};

function operate(operator, firstOperand, secondOperand) {
  switch (operator) {
    case "+":
      return Operators.add(firstOperand, secondOperand);
      break;
    case "-":
      return Operators.subtract(firstOperand, secondOperand);
      break;
    case "*":
      return Operators.multiply(firstOperand, secondOperand);
      break;
    case "/":
      return Operators.divide(firstOperand, secondOperand);
      break;
    case "**":
      return Operators.exponentiate(firstOperand, secondOperand);
      break;
    case "+/-":
      return Operators.negate(firstOperand);
      break;
  }
}

const Calculator = {
  Operators: Operators,
  operate: operate,
};
