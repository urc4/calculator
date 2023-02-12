const CALCULATOR = document.querySelector(".calculator");
const CALC_DISPLAY = CALCULATOR.querySelector(".display");
const CALC_BUTTONS = CALCULATOR.querySelector(".btns");

function operate(operator, firstOperand, secondOperand) {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
      break;
    case "-":
      return firstOperand - secondOperand;
      break;
    case "*":
      return firstOperand * secondOperand;
      break;
    case "/":
      return firstOperand / secondOperand;
      break;
    case "**":
      return firstOperand ** secondOperand;
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

      Calculator.storedValue = operate(
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

// coul make all of this object operators a function with an object containing each
// of the information that changes each time around so I can to query selector all

function updateOperator(btnId) {
  const calcHistory = CALC_DISPLAY.querySelector(".history");
  const currentNumber = CALC_DISPLAY.querySelector(".current");
  const currentString = currentNumber.textContent;
  Calculator.currentValue = convertToNumber(currentString);

  switch (btnId) {
    case "add":
      Calculator.operator = "+";
      break;
    case "subtract":
      Calculator.operator = "-";
      break;
    case "multiply":
      Calculator.operator = "*";
      break;
    case "divide":
      Calculator.operator = "/";
      break;
    case "exponentiate":
      Calculator.operator = "**";
      break;
    case "negate":
      Calculator.operator = "+/-";
      break;
    case "operate":
      Operation.operator = "=";
      break;
  }

  if (Calculator.operator === "+/-") {
    Calculator.currentValue = `${Calculator.operate(
      Calculator.operator,
      Calculator.currentValue
    )}`;
    return;
  }

  if (!Calculator.storedValue) {
    Calculator.storedValue = Calculator.currentValue;
    Calculator.currentValue = null;
    calcHistory.textContent = `${Calculator.storedValue} ${Calculator.operator}`;
    Calculator.operator = null;
    return;
  }

  Calculator.storedValue = operate(
    Calculator.operator,
    Calculator.currentValue,
    Calculator.storedValue
  );
  Calculator.currentValue = null;
  calcHistory.textContent = `${Calculator.storedValue} ${Calculator.operator}`;
  currentNumber.textContent = "";
  Calculator.operator = null;
}

function createOperatorListener() {
  const operatorBtn = CALC_BUTTONS.querySelectorAll(".operator");
  operatorBtn.forEach((btn) => {
    btn.addEventListener("mousedown", (event) => {
      updateOperator(event.target.id);
    });
  });
}

const Calculator = {
  // Operators: Operators,
  // operate: operate,
  activateListeners: () => {
    createNumberListener();
    createDecimalListener();
    createDeleteListener();
    createClearListener();
    AddButton.activateAddListener();
  },
  currentValue: null,
  storedValue: null,
  operator: null,
};

Calculator.activateListeners();

// const Operators = {
//   add: (augend, addend) => augend + addend,
//   subtract: (minuend, subtrahend) => minuend - subtrahend,
//   multiply: (multiplicand, multiplier) => multiplicand * multiplier,
//   divide: (dividend, divisor) => dividend / divisor,
//   exponentiate: (base, exponent) => base ** exponent,
//   negate: (value) => value * -1,
// };

// const ClearButton = {
//   clearBtn: CALC_BUTTONS.querySelector("#clear"),
//   Display: Display,
//   activateClearListener: () => {
//     ClearButton.clearBtn.addEventListener("mousedown", () =>
//       Display.updateClear()
//     );
//   },
// };

// const OperatorButton = {
//   Display: Display,
//   activateOperatorListener: () => {
//     const operatorBtn = CALC_BUTTONS.querySelectorAll(".operator");
//     operatorBtn.forEach(btn => {
//       btn.addEventListener("mousedown",(event)=>{
//         updateOperator(event.target.id)
//       })
//     })
//   },
// };

// const DecimalButton = {
//   decimalBtn: CALC_BUTTONS.querySelector(".decimal"),
//   Display: Display,
//   activateDecimalListener: () => {
//     DecimalButton.decimalBtn.addEventListener("mousedown", () =>
//       Display.updateDecimal()
//     );
//   },
// };

// const DeleteButton = {
//   deleteBtn: CALC_BUTTONS.querySelector("#delete"),
//   Display: Display,
//   activateDeleteListener: () => {
//     DeleteButton.deleteBtn.addEventListener("mousedown", () =>
//       Display.updateDelete()
//     );
//   },
// };

// NumberButtons.activateNumberListeners();
// DecimalButton.activateDecimalListener();
// DeleteButton.activateDeleteListener();
// ClearButton.activateClearListener();
