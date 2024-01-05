import { toString } from "./Array.js";
import numberAssembler from "./compiled/number.js";
import Calculator from "./compiled/Calculator.js";

function uiInteraction(input) {
  switch (input) {
    case "1":
      calc.addToCurrent("1");
      break;
    case "2":
      calc.addToCurrent("2");
      break;
    case "3":
      calc.addToCurrent("3");
      break;
    case "4":
      calc.addToCurrent("4");
      break;
    case "5":
      calc.addToCurrent("5");
      break;
    case "6":
      calc.addToCurrent("6");
      break;
    case "7":
      calc.addToCurrent("7");
      break;
    case "8":
      calc.addToCurrent("8");
      break;
    case "9":
      calc.addToCurrent("9");
      break;
    case "0":
      calc.addToCurrent("0");
      break;
    case ".":
      calc.addToCurrent(".");
      break;
    case "+":
      if (!calc.operate) {
        calc.addOperation("+");
        calc.init();
      } else {
        calc.changeOperation("+");
      }
      break;
    case "-":
      if (!calc.operate) {
        calc.addOperation("-");
        calc.init();
      } else {
        calc.changeOperation("-");
      }
      break;
    case "*":
      if (!calc.operate) {
        calc.addOperation("*");
        calc.init();
      } else {
        calc.changeOperation("*");
        calc.brace("*");
      }
      break;
    case "/":
      if (!calc.operate) {
        calc.addOperation("/");
        calc.init();
      } else {
        calc.changeOperation("/");
        calc.brace("/");
      }
      break;
    case "Backspace":
      calc.delete();
      break;
    case "Enter":
      operationString.textContent = calc.toString(calc.result() + " =");
      resultString.textContent = calc.final();
      final = true;
      return;
    case "r":
      calc.reset();
      final = false;
      break;
    default:
      break;
  }

  if (!final) {
    operationString.textContent = calc.toString();
    resultString.textContent = calc.result();
  }
}

function rmClassList() {
  for (let i = 1; i < 4; i++) {
    document.body.classList.remove("color-scheme-" + i);
  }
}

Array.prototype.toString = toString;

const themeToggle = document.querySelector("[type=range]");
const operationString = document.querySelector(".operation-string");
const resultString = document.querySelector(".result-string");
const buttons = document.querySelectorAll(".button");

const calc = new Calculator(numberAssembler, toString);
let final = false;

themeToggle.addEventListener("input", function (event) {
  switch (event.target.value) {
    case "1":
      rmClassList();

      document.body.classList.add("color-scheme-1");
      break;
    case "2":
      rmClassList();

      document.body.classList.add("color-scheme-2");
      break;
    case "3":
      rmClassList();

      document.body.classList.add("color-scheme-3");
      break;
    default:
      console.log(document.body.classList);
  }
});

addEventListener("keydown", function (event) {
  let input = event.key;

  // imperial vs. metric
  if (input == ",") input = ".";

  uiInteraction(input);
});

buttons.forEach(b => {
  b.addEventListener("click", function () {
    const input = this.getAttribute("data-key");

    uiInteraction(input);
  });
});
