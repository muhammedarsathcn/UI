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
  division: function (a, b) {
    if (b === 0) {
      const response = confirm( "If denominator is zero the value will be Infinity" );
      if (response) {
        if (a === 0 && b === 0) {
          return "0 divided by 0 is undefined";
        }
        return a / b;
      } else {
        return "Enter the numbers again...";
      }
    }
    return a / b;
  },
};
//function to check the input is valid
function getValidInput(message) {
  let value;
  while (true) {
    value = prompt(message);
    if (value === null || value.trim() === "") {
      alert("You must enter the number");
      continue;
    }
    return Number(value);
  }
}
//implementation
const number1 = getValidInput("Enter the number 1");
const number2 = getValidInput("Enter the number 2");
if (isNaN(number1) || isNaN(number2)) {
  console.log("Invalid Input. Enter numbers to calculate...");
} else {
  console.log(calculator.addition(number1, number2));
  console.log(calculator.subtraction(number1, number2));
  console.log(calculator.multiplication(number1, number2));
  console.log(calculator.division(number1, number2));
}
