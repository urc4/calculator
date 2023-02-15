const CALCULATOR = document.querySelector(".calculator");
const CALC_DISPLAY = CALCULATOR.querySelector(".display");
const CALC_BUTTONS = CALCULATOR.querySelector(".btns");
const currentNumber = CALC_DISPLAY.querySelector(".current");
const calcHistory = CALC_DISPLAY.querySelector(".history");

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
      if (firstOperand) return secondOperand / firstOperand;
      return "cmon cuh";
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
    if (Calculator.isError) {
      currentNumber.textContent = `${digit}`;
      Calculator.isError = false;
      return;
    }
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
    if (currentNumber.textContent.includes(".")) return;
    if (Calculator.isOperating) {
      Calculator.isOperating = false;
      currentNumber.textContent = `0.`;
      return;
    }
    if (!currentNumber.textContent) currentNumber.textContent = `0.`;
    else currentNumber.textContent += `.`;
  },
  updateDelete: () => {
    if (
      currentNumber.textContent.length === 2 &&
      currentNumber.textContent[0] === "-"
    ) {
      currentNumber.textContent = `0`;
      return;
    }
    if (Calculator.isError) return;
    if (Calculator.isOperating) return;
    if (currentNumber.textContent.length === 1) currentNumber.textContent = `0`;
    else currentNumber.textContent = currentNumber.textContent.slice(0, -1);
  },
  updateClear: () => {
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
  roundNumber: (number) => {
    if (Display.isUnderMaxLength()) return number;
    const precision = 8;
    return number.toExponential(precision);
  },
};

function createClearListener() {
  const clearBtn = CALC_BUTTONS.querySelector("#clear");
  clearBtn.addEventListener("mousedown", () => Display.updateClear());
  document.addEventListener("keydown", (event) => {
    if (event.key !== "c") return;
    const digitalClearKey = document.querySelector("#clear");
    if (digitalClearKey) {
      const mousedownEvent = new MouseEvent("mousedown");
      digitalClearKey.dispatchEvent(mousedownEvent);
      digitalClearKey.classList.add("active-orange");
    }
  });
  document.addEventListener("keyup", (event) => {
    if (event.key !== "c") return;
    const digitalClearKey = document.querySelector("#clear");
    if (digitalClearKey) {
      const mouseupEvent = new MouseEvent("mouseup");
      // digitalClearKey.dispatchEvent(mouseupEvent);
      digitalClearKey.classList.remove("active-orange");
    }
  });
}

function createDeleteListener() {
  const deleteBtn = CALC_BUTTONS.querySelector("#delete");
  deleteBtn.addEventListener("mousedown", () => Display.updateDelete());
  document.addEventListener("keydown", (event) => {
    if (event.key !== "d") return;
    const digitalDeleteButton = document.querySelector("#delete");
    if (digitalDeleteButton) {
      const mousedownEvent = new MouseEvent("mousedown");
      digitalDeleteButton.dispatchEvent(mousedownEvent);
      digitalDeleteButton.classList.add("active-orange");
    }
  });
  document.addEventListener("keyup", (event) => {
    if (event.key !== "d") return;
    const digitalDeleteButton = document.querySelector("#delete");
    if (digitalDeleteButton) {
      const mouseupEvent = new MouseEvent("mouseup");
      // digitalDeleteButton.dispatchEvent(mouseupEvent);
      digitalDeleteButton.classList.remove("active-orange");
    }
  });
}

function createDecimalListener() {
  const decimalBtn = CALC_BUTTONS.querySelector(".decimal");
  decimalBtn.addEventListener("mousedown", () => Display.updateDecimal());
  document.addEventListener("keydown", (event) => {
    if (event.key !== ".") return;
    const digitalDecimalKey = document.querySelector("#decimal");
    if (digitalDecimalKey) {
      const mousedownEvent = new MouseEvent("mousedown");
      digitalDecimalKey.dispatchEvent(mousedownEvent);
      digitalDecimalKey.classList.add("active-grey");
    }
  });
  document.addEventListener("keyup", (event) => {
    if (event.key !== ".") return;
    const digitalDecimalKey = document.querySelector("#decimal");
    if (digitalDecimalKey) {
      const mouseupEvent = new MouseEvent("mouseup");
      // digitalDecimalKey.dispatchEvent(mouseupEvent);
      digitalDecimalKey.classList.remove("active-grey");
    }
  });
}

function createNumberListener() {
  const numberBtns = CALC_BUTTONS.querySelectorAll(".number");
  numberBtns.forEach((btn) => {
    btn.addEventListener("mousedown", (event) =>
      Display.updateCurrentDigits(event.target.id)
    );
  });

  document.addEventListener("keydown", (event) => {
    if (!Number(event.key) && Number(event.key) !== 0) return;
    if (event.key === " ") return;
    const digitalNumberKey = document.getElementById(`${event.key}`);
    if (digitalNumberKey) {
      const mousedownEvent = new MouseEvent("mousedown");
      digitalNumberKey.dispatchEvent(mousedownEvent);
      digitalNumberKey.classList.add("active-grey");
    }
  });
  document.addEventListener("keyup", (event) => {
    if (!Number(event.key) && Number(event.key) !== 0) return;
    if (event.key === " ") return;
    const digitalNumberKey = document.getElementById(`${event.key}`);
    if (digitalNumberKey) {
      const mouseupEvent = new MouseEvent("mouseup");
      // digitalNumberKey.dispatchEvent(mouseupEvent);
      digitalNumberKey.classList.remove("active-grey");
    }
  });
}

// include rounded answer
function convertToNumber(currentString) {
  if (!currentString) return null;
  if (!currentString.includes("."))
    return Display.roundNumber(Number(currentString));
  const splitDecimal = currentString.split(".");
  const integerPart = splitDecimal[0];
  const decimalPart = splitDecimal[1];
  if (!decimalPart.length) return Display.roundNumber(Number(integerPart));
  return Display.roundNumber(
    Number(integerPart + decimalPart) / 10 ** decimalPart.length
  );
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

function updateNegate() {
  Calculator.currentValue = convertToNumber(currentNumber.textContent);
  if (Calculator.storedValue !== null) {
    // Calculator.isOperating = false;
    currentNumber.textContent = `${operate("+/-", Calculator.currentValue)}`;
    Calculator.currentValue = null;
    return;
  }
  Calculator.storedValue = operate("+/-", Calculator.currentValue);
  currentNumber.textContent = `${Calculator.storedValue}`;
  calcHistory.textContent = `negate(${Calculator.currentValue})`;
  Calculator.currentValue = null;
  Calculator.isOperating = true;
  return;
}

function createNegateListener() {
  const negateBtn = CALC_BUTTONS.querySelector("#negate");
  negateBtn.addEventListener("mousedown", () => updateNegate());
  document.addEventListener("keydown", (event) => {
    if (event.key !== "n") return;
    const digitalNegateKey = document.querySelector("#negate");
    if (digitalNegateKey) {
      const mousedownEvent = new MouseEvent("mousedown");
      digitalNegateKey.dispatchEvent(mousedownEvent);
      digitalNegateKey.classList.add("active-grey");
    }
  });
  document.addEventListener("keyup", (event) => {
    if (event.key !== "n") return;
    const digitalNegateKey = document.querySelector("#negate");
    if (digitalNegateKey) {
      const mouseupEvent = new MouseEvent("mouseup");
      // digitalNegateKey.dispatchEvent(mouseupEvent);
      digitalNegateKey.classList.remove("active-grey");
    }
  });
}

function updateEqual() {
  if (Calculator.isError) {
    Display.updateClear();
    return;
  }
  Calculator.currentValue = convertToNumber(currentNumber.textContent);
  console.log("hi");
  if (Calculator.operator === null) return;
  if (Calculator.isOperating && Calculator.currentValue === null) return;
  if (Calculator.storedValue === null) return;

  calcHistory.textContent = `${Calculator.storedValue} ${
    Calculator.operatorText
  } ${Calculator.currentValue} = 
  ${(Calculator.storedValue = operate(
    Calculator.operator,
    Calculator.currentValue,
    Calculator.storedValue
  ))}`;
  currentNumber.textContent = `${Calculator.storedValue}`;

  if (Calculator.storedValue === "cmon cuh") {
    Display.updateClear(); //make a display error message
    currentNumber.textContent = "cmon cuh";
    Calculator.isError = true;
    return;
  }

  Calculator.currentValue = null;
  Calculator.storedValue = null;
  Calculator.isOperating = true;
  Calculator.operator = null;
  return;
}

function createEqualListener() {
  const equalBtn = CALC_BUTTONS.querySelector("#equal");
  equalBtn.addEventListener("mousedown", () => updateEqual());
  document.addEventListener("keydown", (event) => {
    if (event.key !== "=" && event.key !== "Enter") return;
    const digitalEqualKey = document.querySelector("#equal");
    if (digitalEqualKey) {
      const mousedownEvent = new MouseEvent("mousedown");
      digitalEqualKey.dispatchEvent(mousedownEvent);
      digitalEqualKey.classList.add("active-grey");
    }
  });
  document.addEventListener("keyup", (event) => {
    if (event.key !== "=" && event.key !== "Enter") return;
    const digitalEqualKey = document.querySelector("#equal");
    if (digitalEqualKey) {
      const mouseupEvent = new MouseEvent("mouseup");
      // digitalEqualKey.dispatchEvent(mouseupEvent);
      digitalEqualKey.classList.remove("active-grey");
    }
  });
}

function updateOperator(btnId) {
  if (Calculator.isError) {
    Display.updateClear();
    return;
  }
  Calculator.currentValue = convertToNumber(currentNumber.textContent);

  if (isNaN(Calculator.currentValue)) return;
  if (Calculator.operator === null) Calculator.operator = getOperator(btnId)[0];

  if (Calculator.storedValue === null) {
    Calculator.storedValue = Calculator.currentValue;
    Calculator.operator = getOperator(btnId)[0];
    Calculator.operatorText = getOperator(btnId)[1];
    Calculator.currentValue = null;
    calcHistory.textContent = `${Calculator.storedValue} ${Calculator.operatorText}`;
    currentNumber.textContent = `${Calculator.storedValue}`;
    Calculator.isOperating = true;
    return;
  }

  if (Calculator.currentValue === null) return;

  if (Calculator.isOperating) {
    Calculator.operator = getOperator(btnId)[0];
    Calculator.operatorText = getOperator(btnId)[1];
    calcHistory.textContent = `${Calculator.storedValue} ${Calculator.operatorText}`;
    return;
  }

  Calculator.storedValue = operate(
    Calculator.operator,
    Calculator.currentValue,
    Calculator.storedValue
  );

  if (Calculator.storedValue === "cmon cuh") {
    Display.updateClear(); //make a display error message
    currentNumber.textContent = "cmon cuh";
    Calculator.isError = true;
    return;
  }

  Calculator.currentValue = null;
  currentNumber.textContent = `${Calculator.storedValue}`;
  Calculator.isOperating = true;
  Calculator.operator = getOperator(btnId)[0];
  Calculator.operatorText = getOperator(btnId)[1];
  calcHistory.textContent = `${Calculator.storedValue} ${Calculator.operatorText}`;
}

function createOperatorListener() {
  const operatorBtn = CALC_BUTTONS.querySelectorAll(".operation");
  operatorBtn.forEach((btn) => {
    btn.addEventListener("mousedown", (event) =>
      updateOperator(event.target.id)
    );
  });

  document.addEventListener("keydown", (event) => {
    const digitalOperatorId = getOperatorId(event.key);
    const digitalOperatorKey = document.getElementById(digitalOperatorId);
    if (digitalOperatorKey) {
      const mousedownEvent = new MouseEvent("mousedown");
      digitalOperatorKey.dispatchEvent(mousedownEvent);
      digitalOperatorKey.classList.add("active-grey");
    }
  });
  document.addEventListener("keyup", (event) => {
    const digitalOperatorId = getOperatorId(event.key);
    const digitalOperatorKey = document.getElementById(digitalOperatorId);
    if (digitalOperatorKey) {
      const mouseupEvent = new MouseEvent("mouseup");
      // digitalOperatorKey.dispatchEvent(mouseupEvent);
      digitalOperatorKey.classList.remove("active-grey");
    }
  });
}

function getOperatorId(operatorKey) {
  switch (operatorKey) {
    case "+":
      return "add";
      break;
    case "-":
      return "subtract";
      break;
    case "*":
      return "multiply";
      break;
    case "x":
      return "multiply";
      break;
    case "/":
      return "divide";
      break;
    case "e":
      return "exponentiate";
      break;
    default:
      return false;
      break;
  }
}

const Calculator = {
  activateListeners: () => {
    createNumberListener();
    createDecimalListener();
    createDeleteListener();
    createClearListener();
    createOperatorListener();
    createNegateListener();
    createEqualListener();
  },
  currentValue: null,
  storedValue: null,
  operator: null,
  operatorText: null,
  isOperating: false,
  isError: false,
};

Calculator.activateListeners();
