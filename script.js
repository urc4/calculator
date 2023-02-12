const CALCULATOR = document.querySelector(".calculator");
const CALC_DISPLAY = CALCULATOR.querySelector(".display");
const CALC_BUTTONS = CALCULATOR.querySelector(".btns");

function operate(operator, firstOperand, secondOperand) {
  switch (operator) {
    case "+":
      return secondOperand + firstOperand;
      break;
    case "-":
      return secondOperand - firstOperand;
      break;
    case "*":
      return secondOperand * firstOperand;
      break;
    case "/":
      return secondOperand / firstOperand;
      break;
    case "**":
      return secondOperand ** firstOperand;
      break;
    case "+/-":
      return firstOperand * -1;
      break;
    default:
      break;
  }
}

const Display = {
  // add if statement whether it has reached maximum display size
  updateCurrentDigits: (digit) => {
    const currentNumber = CALC_DISPLAY.querySelector(".current");
    if (Calculator.isOperating) {
      currentNumber.textContent = `${digit}`;
      Calculator.isOperating = false;
      return;
    }
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
    Calculator.operator = null;
  },
};

function createClearListener() {
  const clearBtn = CALC_BUTTONS.querySelector("#clear");
  clearBtn.addEventListener("mousedown", () => Display.updateClear());
}

function createDeleteListener() {
  const deleteBtn = CALC_BUTTONS.querySelector("#delete");
  deleteBtn.addEventListener("mousedown", () => Display.updateDelete());
}

function createDecimalListener() {
  const decimalBtn = CALC_BUTTONS.querySelector(".decimal");
  decimalBtn.addEventListener("mousedown", () => Display.updateDecimal());
}

// add event listerns for keys use algo + button.id
// can i not use this.numberBtns here?

function createNumberListener() {
  const numberBtns = CALC_BUTTONS.querySelectorAll(".number");
  numberBtns.forEach((btn) => {
    btn.addEventListener("mousedown", (event) =>
      Display.updateCurrentDigits(event.target.id)
    );
  });
}

function convertToNumber(currentString) {
  if (!currentString) return null;
  if (!currentString.includes(".")) return Number(currentString);
  const splitDecimal = currentString.split(".");
  const integerPart = splitDecimal[0];
  const decimalPart = splitDecimal[1];
  if (!decimalPart.length) return Number(integerPart);
  return Number(integerPart + decimalPart) / 10 ** decimalPart.length;
}

// coul make all of this object operators a function with an object containing each
// of the information that changes each time around so I can to query selector all

function getOperator(btnId) {
  switch (btnId) {
    case "add":
      return "+";
      break;
    case "subtract":
      return "-";
      break;
    case "multiply":
      return "*";
      break;
    case "divide":
      return "/";
      break;
    case "exponentiate":
      return "**";
      break;
    case "negate":
      return "+/-";
      break;
    case "operate":
      return "=";
      break;
  }
}

// as of now it is performing the clicked event
function updateOperator(btnId) {
  const calcHistory = CALC_DISPLAY.querySelector(".history");
  const currentNumber = CALC_DISPLAY.querySelector(".current");
  // const currentString = currentNumber.textContent;
  Calculator.currentValue = convertToNumber(currentNumber.textContent);

  if (Calculator.operator === null) Calculator.operator = getOperator(btnId);

  // if (Calculator.operator === "+/-" && Calculator.currentValue !== null) {
  //   Calculator.currentValue = `${operate(
  //     Calculator.operator,
  //     Calculator.currentValue
  //   )}`;
  //   calcHistory.textContent = `negate(${currentNumber.textContent})`;
  //   currentNumber.textContent = `${Calculator.currentValue}`;
  //   Calculator.operator = null;
  //   return;
  // }

  if (Calculator.storedValue === null) {
    Calculator.storedValue = Calculator.currentValue;
    Calculator.operator = getOperator(btnId);
    Calculator.currentValue = null;
    calcHistory.textContent = `${Calculator.storedValue} ${Calculator.operator}`;
    currentNumber.textContent = `${Calculator.storedValue}`;
    Calculator.isOperating = true;
    return;
  }

  if (Calculator.currentValue === null) return;

  Calculator.storedValue = operate(
    Calculator.operator,
    Calculator.currentValue,
    Calculator.storedValue
  );
  Calculator.currentValue = null;
  currentNumber.textContent = `${Calculator.storedValue}`;
  Calculator.isOperating = true;
  Calculator.operator = getOperator(btnId);
  calcHistory.textContent = `${Calculator.storedValue} ${Calculator.operator}`;
  // Calculator.operator = null;
}

function createOperatorListener() {
  const operatorBtn = CALC_BUTTONS.querySelectorAll(".operation");
  operatorBtn.forEach((btn) => {
    btn.addEventListener("mousedown", (event) => {
      updateOperator(event.target.id);
    });
  });
}

const Calculator = {
  activateListeners: () => {
    createNumberListener();
    createDecimalListener();
    createDeleteListener();
    createClearListener();
    createOperatorListener();
  },
  currentValue: null,
  storedValue: null,
  operator: null,
  isOperating: false,
};

Calculator.activateListeners();
