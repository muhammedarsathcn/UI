// funtion to show number 1 to 100
function showNumbersFrom1to100() {
  for (let i = 1; i <= 100; i++) {
    console.log(i);
  }
}
// function to display today's date in DD/MM/YYYY format.
function displayDate() {
  const todayDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  console.log(todayDate);
}
//function to convert celcius to fahrenheit
function convertCelciusToFahrenheit(celcius) {
  try {
    return (celcius * 9) / 5 + 32;
  } catch (e) {
    if (e instanceof TypeError) {
      console.log("Input type is mismatched");
    } else {
      console.log(e);
    }
  }
}
// function which accepts an array of numbers as parameter and return the average of those numbers.
function calculateAverage(numbers) {
  try {
    const sum = numbers.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    return sum / numbers.length;
  } catch (e) {
    if (e instanceof TypeError) {
      console.log("Input type is mismatched");
    } else {
      console.log(e);
    }
  }
}
// Create a function to reverse a given string
function reverseString(word) {
  try {
    const charArray = word.split("");
    let start = 0;
    let end = charArray.length - 1;
    while (start < end) {
      const temp = charArray[start];
      charArray[start] = charArray[end];
      charArray[end] = temp;
      start++;
      end--;
    }
    return charArray.join("");
  } catch (e) {
    if (e instanceof TypeError) {
      console.log("Input type is mismatched");
    } else {
      console.log(e);
    }
  }
}

// functions callings
showNumbersFrom1to100();
displayDate();
const fahrenheit = convertCelciusToFahrenheit(36);
console.log(fahrenheit, "F");
const numbers = [1, 2, 3, 4, 5];
console.log(calculateAverage(numbers));
console.log(reverseString("Hello,World"));
