function calculate(firstOperand, secondOperand, operator) {
  const formulas = {
    "+": (first, second) => first + second,
    "-": (first, second) => first - second,
    "*": (first, second) => first * second,
    "/": (first, second) => first / second,
  };
  const first = parseFloat(firstOperand);
  const second = parseFloat(secondOperand);

  return formulas[operator](first, second);
}

function calculateResult() {
  secondOperand = display.textContent;
  const result = calculate(firstOperand, secondOperand, operator);
  display.textContent = result;
  firstOperand = null;
  needNext = false;
  secondOperand = null;
  operator = null;
}

function calculateResultInOperator(newOperator) {
  // operator 사용시 기존 연산이 있을 경우 처리
  secondOperand = display.textContent;
  const result = calculate(firstOperand, secondOperand, operator);
  display.textContent = result;
  firstOperand = result;
  operator = newOperator;
  needNext = true;
}

function saveFirstOperand(newOperator) {
  firstOperand = display.textContent;
  operator = newOperator;
  needNext = true;
}

function clearDisplay() {
  display.textContent = "0";
  firstOperand = null;
  needNext = false;
  secondOperand = null;
  operator = null;
}

function addDot() {
  if (display.textContent.includes(".")) return;
  display.textContent += ".";
}

function addNumber(number) {
  if (display.textContent === "0") {
    display.textContent = number;
  } else {
    display.textContent += number;
  }
}

function handleOperator(btnText) {
  if (firstOperand && operator) {
    // 기존 연산이 있을 경우 처리
    calculateResultInOperator(btnText);
  } else if (!needNext) {
    saveFirstOperand(btnText);
  }
  console.log("First Operand: ", firstOperand);
  console.log("Operator: ", operator);
}

function btnClickHandler(e) {
  console.log(e.target.textContent);
  const btnText = e.target.textContent;

  switch (btnText) {
    case "C":
      clearDisplay();
      break;
    case ".":
      addDot();
      break;
    case "=":
      calculateResult();
      break;
    default:
      if (e.target.classList.contains("number")) {
        if (needNext) {
          display.textContent = "0";
          needNext = false;
        }
        addNumber(btnText);
      }
      if (e.target.classList.contains("operator")) {
        handleOperator(btnText);
      }
      break;
  }
}

const display = document.querySelector(".display-container");
const buttonElems = document.querySelectorAll(".button");

let firstOperand = null;
let secondOperand = null;
let operator = null;
let needNext = false;

buttonElems.forEach((button) => {
  button.addEventListener("click", btnClickHandler);
});
