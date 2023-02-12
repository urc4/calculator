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

function convertToNumber(currentString) {
  // const currentString = currentValue.textContent;
  // Number("") retruns 0
  if (!currentString.includes(".")) return Number(currentString);
  const splitDecimal = currentString.split(".");
  const integerPart = splitDecimal[0];
  const decimalPart = splitDecimal[1];
  if (!decimalPart.length) return Number(integerPart);
  return Number(integerPart + decimalPart) / 10 ** decimalPart.length;
}

const AddButton = {
  addBtn: CALC_BUTTONS.querySelector("#add"),
  Display: Display,
  activateAddListener: () => {
    AddButton.addBtn.addEventListener("mousedown", () => {
      const currentNumber = CALC_DISPLAY.querySelector(".current");
      const calcHistory = CALC_DISPLAY.querySelector(".history");
      const currentString = currentNumber.textContent;
      Calculator.currentValue = convertToNumber(currentString);
      if (!Calculator.storedValue) {
        Calculator.storedValue = Calculator.currentValue;
        Calculator.currentValue = null;
        Calculator.operator = "+";
        calcHistory.textContent = `${Calculator.storedValue} ${Calculator.operator}`;
      }

      Calculator.storedValue = Calculator.operate(
        Calculator.operator,
        Calculator.currentValue,
        Calculator.storedValue
      );
      Calculator.currentValue = null;
      calcHistory.textContent = `${Calculator.storedValue} ${Calculator.operator}`;
      currentNumber.textContent = "";
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
    AddButton.activateAddListener();
  },
  updateDisplay: null,
  currentValue: null,
  storedValue: null,
  operator: null,
};

Calculator.activateListeners();
