const CALCULATOR = document.querySelector(".calculator");
const CALC_DISPLAY = CALCULATOR.querySelector(".display");
const CALC_BUTTONS = CALCULATOR.querySelector(".btns");

const FOOTER = document.querySelector("footer");
const yearDisplay = FOOTER.querySelector("#year");
yearDisplay.textContent = new Date().getFullYear();

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
    case "exp":
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
    if (Calculator.isOperating) return;
    const currentNumber = CALC_DISPLAY.querySelector(".current");
    if (currentNumber.textContent.length === 1) currentNumber.textContent = `0`;
    else currentNumber.textContent = currentNumber.textContent.slice(0, -1);
  },
  updateClear: () => {
    const currentNumber = CALC_DISPLAY.querySelector(".current");
    const calcHistory = CALC_DISPLAY.querySelector(".history");
    calcHistory.textContent = ``;
    currentNumber.textContent = `0`;
    Calculator.currentValue = null;
    Calculator.storedValue = null;
    Calculator.operator = null;
  },
  isUnderMaxLength: () => {
    const currentNumberText =
      CALC_DISPLAY.querySelector(".current").textContent;
    // . e+26 tem ate 13 caracteres
    if (currentNumberText.length > 12) return false;
    if (currentNumberText.length < 12) return true;
    if (currentNumberText.includes(".")) return true;
    return false;
  },
  roundNumber: () => {
    if (Display.isUnderMaxLength()) return;
    const currentNumber = CALC_DISPLAY.querySelector(".current");
    const currentValue = convertToNumber(currentNumber.textContent);
    if (!currentNumber.textContent.includes(".")) {
      const exponent = currentNumber.textContent.length - 1;
      currentNumber.textContent =
        `${Math.round(currentValue / 10 ** 4)}`.slice(0, 8) + `e+${exponent}`;
    }
    currentNumber.textContent = `${Math.round(
      convertToNumber(currentNumber.textContent)
    )}`;
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

function getOperator(btnId) {
  switch (btnId) {
    case "add":
      return ["+", "+"];
      break;
    case "subtract":
      return ["-", "\u{2212}"];
      break;
    case "multiply":
      return ["*", "x"];
      break;
    case "divide":
      return ["/", "\u00F7"];
      break;
    case "exponentiate":
      return ["exp", "exp"];
      break;
  }
}

//on the first run its multiplying by 2 for some reason
function updateNegate() {
  const calcHistory = CALC_DISPLAY.querySelector(".history");
  const currentNumber = CALC_DISPLAY.querySelector(".current");
  Calculator.currentValue = convertToNumber(currentNumber.textContent);
  Calculator.storedValue = operate("+/-", Calculator.currentValue);
  currentNumber.textContent = `${Calculator.storedValue}`;
  calcHistory.textContent = `negate(${Calculator.currentValue})`;
  Calculator.currentValue = null;
  Calculator.isOperating = true;
  // Calculator.operator = getOperator(btnId)[0];
  return;
}

function createNegateListener() {
  const negateBtn = CALC_BUTTONS.querySelector("#negate");
  negateBtn.addEventListener("mousedown", () => {
    updateNegate();
  });
}

// it also doubles the value when pressed another operation afterwards
// this may have to do with the fact that it operates twice
function updateOperate() {
  const calcHistory = CALC_DISPLAY.querySelector(".history");
  const currentNumber = CALC_DISPLAY.querySelector(".current");
  Calculator.currentValue = convertToNumber(currentNumber.textContent);
  console.log("hi");
  if (Calculator.isOperating && Calculator.currentValue === null) return;
  if (Calculator.storedValue === null) return;

  // Calculator.storedValue = operate("=", Calculator.currentValue, Calculator.storedValue);
  // Calculator.isOperating = true;
  calcHistory.textContent = `${Calculator.storedValue} ${Calculator.operator} ${
    Calculator.currentValue
  } = 
  ${(Calculator.storedValue = operate(
    Calculator.operator,
    Calculator.currentValue,
    Calculator.storedValue
  ))}`;
  currentNumber.textContent = `${Calculator.storedValue}`;
  Calculator.currentValue = null;
  // Calculator.operator = getOperator(btnId)[0];
  Calculator.isOperating = true;
  return;
}

function createOperateListener() {
  const operateBtn = CALC_BUTTONS.querySelector("#operate");
  operateBtn.addEventListener("mousedown", () => {
    updateOperate();
  });
}

function updateOperator(btnId) {
  const calcHistory = CALC_DISPLAY.querySelector(".history");
  const currentNumber = CALC_DISPLAY.querySelector(".current");
  Calculator.currentValue = convertToNumber(currentNumber.textContent);

  if (Calculator.operator === null) Calculator.operator = getOperator(btnId)[0];

  if (Calculator.storedValue === null) {
    Calculator.storedValue = Calculator.currentValue;
    Calculator.operator = getOperator(btnId)[0];
    const operatorText = getOperator(btnId)[1];
    Calculator.currentValue = null;
    calcHistory.textContent = `${Calculator.storedValue} ${operatorText}`;
    currentNumber.textContent = `${Calculator.storedValue}`;
    Calculator.isOperating = true;
    return;
  }

  if (Calculator.currentValue === null) return;

  if (Calculator.isOperating) {
    Calculator.operator = getOperator(btnId)[0];
    const operatorText = getOperator(btnId)[1];
    calcHistory.textContent = `${Calculator.storedValue} ${operatorText}`;
    return;
  }

  Calculator.storedValue = operate(
    Calculator.operator,
    Calculator.currentValue,
    Calculator.storedValue
  );
  Calculator.currentValue = null;
  currentNumber.textContent = `${Calculator.storedValue}`;
  Calculator.isOperating = true;
  Calculator.operator = getOperator(btnId)[0];
  const operatorText = getOperator(btnId)[1];
  calcHistory.textContent = `${Calculator.storedValue} ${operatorText}`;
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
    createNegateListener();
    createOperateListener();
  },
  currentValue: null,
  storedValue: null,
  operator: null,
  isOperating: false,
};

Calculator.activateListeners();
