//calculator object
const calculator = {
  addition: function (a, b) {
    return a + b;
  },
  subtraction: function (a, b) {
    return a - b;
  },
  multiplication: function (a, b) {
    return a * b;
  },
  divison: function (a, b) {
    if (b === 0) {
      return "Cannot divided by zero";
    }
    return a / b;
  },
};

//implimenting the calculator object
const number1 = Number(prompt("Enter the Number 1"));
const number2 = Number(prompt("Enter the Number 2"));
if (isNaN(number1) || isNaN(number2)) {
  console.log("Invalid Input. Enter numbers to calculate...");
} else {
  console.log(calculator.addition(number1, number2));
  console.log(calculator.subtraction(number1, number2));
  console.log(calculator.multiplication(number1, number2));
  console.log(calculator.divison(number1, number2));
}
