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

function updateHistory(current, operator) {
  const calcHistory = CALC_DISPLAY.querySelector(".history");
}

const Display = {
  // add if statement whether it has reached maximum display size
  updateHistory: updateHistory,
  updateCurrentDigits: (digit) => {
    const currentNumber = CALC_DISPLAY.querySelector(".current");
    if (currentNumber.textContent === "0")
      currentNumber.textContent = `${digit}`;
    else currentNumber.textContent += `${digit}`;
  },
  updateDecimal: () => {
    const currentNumber = CALC_DISPLAY.querySelector(".current");
    if (currentNumber.textContent.includes(".")) return;
    if (!currentNumber.textContent) currentNumber.textContent = `0.`;
    else currentNumber.textContent += `.`;
  },
  updateDelete: () => {
    const currentNumber = CALC_DISPLAY.querySelector(".current");
    if (currentNumber.textContent.length === 1) currentNumber.textContent = `0`;
    else currentNumber.textContent = currentNumber.textContent.slice(0, -1);
  },
  updateClear: () => {
    const currentNumber = CALC_DISPLAY.querySelector(".current");
    const calcHistory = CALC_DISPLAY.querySelector(".history");

    calcHistory.textContent = `h`;
    currentNumber.textContent = `0`;
    Calculator.currentValue = null;
    Calculator.storedValue = null;
  },
};

const ClearButton = {
  clearBtn: CALC_BUTTONS.querySelector("#clear"),
  Display: Display,
  activateClearListener: () => {
    ClearButton.clearBtn.addEventListener("mousedown", () =>
      Display.updateClear()
    );
  },
};

const DeleteButton = {
  deleteBtn: CALC_BUTTONS.querySelector("#delete"),
  Display: Display,
  activateDeleteListener: () => {
    DeleteButton.deleteBtn.addEventListener("mousedown", () =>
      Display.updateDelete()
    );
  },
};

const DecimalButton = {
  decimalBtn: CALC_BUTTONS.querySelector(".decimal"),
  Display: Display,
  activateDecimalListener: () => {
    DecimalButton.decimalBtn.addEventListener("mousedown", () =>
      Display.updateDecimal()
    );
  },
};

// add event listerns for keys use algo + button.id
// can i not use this.numberBtns here?

const NumberButtons = {
  numberBtns: CALC_BUTTONS.querySelectorAll(".number"),
  Display: Display,
  activateNumberListeners: () => {
    NumberButtons.numberBtns.forEach((btn) => {
      btn.addEventListener("mousedown", (event) =>
        Display.updateCurrentDigits(event.target.id)
      );
    });
  },
};

const Calculator = {
  Operators: Operators,
  operate: operate,
  activateListeners: () => {
    NumberButtons.activateNumberListeners();
    DecimalButton.activateDecimalListener();
    DeleteButton.activateDeleteListener();
    ClearButton.activateClearListener();
  },
  updateDisplay: null,
  currentValue: null,
  storedValue: null,
};

Calculator.activateListeners();
