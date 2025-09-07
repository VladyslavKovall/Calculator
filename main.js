const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let result = "";

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const subtraction = (a, b) => a - b;

// Парсить вираз та обчислює дотримуючись порядку дій
function calculate(expression) {
  const tokens = expression.match(/\d+(\.\d+)?|[+\-*/]/g);
  const firstElem = tokens[0];
  if (!tokens) {
    return 0;
  } 
  if (firstElem === "-") {
    tokens.splice(0, 2, "-" + tokens[1]);
  }

  // Шукаємо в масиві "*" або "/" і виконуємо з ними обчислення
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "*" || tokens[i] === "/") {
      const a = parseFloat(tokens[i - 1]);
      const b = parseFloat(tokens[i + 1]);
      const res = tokens[i] === "*" ? multiply(a, b) : divide(a, b);
      tokens.splice(i - 1, 3, res.toString());
      i--;
    }
  }
 
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "+" || tokens[i] === "-") {
      const a = parseFloat(tokens[i - 1]);
      const b = parseFloat(tokens[i + 1]);
      const res = tokens[i] === "+" ? add(a, b) : subtraction(a, b);
      tokens.splice(i - 1, 3, res.toString());
      i--;
    }
  }

  return parseFloat(tokens[0]);
}

// Логіка обробки натискань на кнопки
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    if (value === "C") {
      currentInput = "";
      display.textContent = "0";
    } else if (value === "=") {
      const firstChar = currentInput[0];

      if (firstChar === "*" || firstChar === "/") {
        display.textContent = "Error";
        return;
      }
      result = calculate(currentInput);
      display.textContent = result;
      currentInput = result.toString();
    } else if (value === "⌫") {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || "0";
    } else {
      if (display.textContent === "0") {display.textContent = "";}
      currentInput += value;
      display.textContent += value;
    }
  });
});
