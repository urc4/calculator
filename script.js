const CALCULATOR = document.querySelector(".calculator");
const CALC_DISPLAY = CALCULATOR.querySelector(".display");
const CALC_BUTTONS = CALCULATOR.querySelector(".btns");

const Operators = {
  add: (augend, addend) => augend + addend,
  subtract: (minuend, subtrahend) => minuend - subtrahend,
  multiply: (multiplicand, multiplier) => multiplicand * multiplier,
  divide: (dividend, divisor) => dividend / divisor,
  exponentiate: (base, exponent) => base ** exponent,
  negate: (value) => value * -1,
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
    default:
      break;
  }
}

function updateDisplayHistory(current, operator) {
  const calcHistory = CALC_DISPLAY.querySelector(".history");
}

const Display = {
  updateDisplayHistory: updateDisplayHistory,
  updateDisplayCurrent: (digit) => {
    const currentNumber = CALC_DISPLAY.querySelector(".current");
    if (currentNumber.textContent === "0")
      currentNumber.textContent = `${digit}`;
    else if (typeof Number(currentNumber.textContent) === "number")
      currentNumber.textContent += `${digit}`;
  },
};

// add event listerns for keys use algo + button.id
// can i not use this.numberBtns here?

const NumberButtons = {
  numberBtns: CALC_BUTTONS.querySelectorAll(".number"),
  Display: Display,
  activateNumberListeners: () => {
    NumberButtons.numberBtns.forEach((btn) => {
      btn.addEventListener("mousedown", (event) => {
        // add if statement whether it has reached maximum display size
        Display.updateDisplayCurrent(event.target.id);
      });
    });
  },
};

NumberButtons.activateNumberListeners();

const Calculator = {
  Operators: Operators,
  operate: operate,
  updateDisplay: null,
  currentValue: null,
};
