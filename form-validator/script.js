const form = document.querySelector(".form");
// validators for each input fields
const validators = {
  firstName: (value) => /^[A-Za-z]{1,30}$/.test(value),
  lastName: (value) => /^[A-Za-z]{1,30}$/.test(value),
  email: (value) => /^[A-Za-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,}/i.test(value),
  contactNumber: (value) => /^[6-9]\d{9}$/.test(value),
  pinCode: (value) => /^\d{6}$/.test(value),
  cardNumber: (value) => /^\d{16}$/.test(value),
  cardExpiry: (value) => {
    const currentYear = new Date().getFullYear();
    return /^\d{4}$/.test(value) && Number(value) >= currentYear;
  },
  cvv: (value) => /^\d{3,4}$/.test(value),
};
//messages
const message = {
  firstName: {
    empty: "First Name is required",
    invalid: "First Name is not valid",
  },
  lastName: {
    empty: "Last Name is required",
    invalid: "Last Name is not valid",
  },
  email: {
    empty: "Email Address is required",
    invalid: "Email Address is not valid",
  },
  contactNumber: {
    empty: "Contact Number is required",
    invalid: "Contact Number is not valid",
  },
  pinCode: {
    empty: "PIN Code is required",
    invalid: "PIN Code is not valid",
  },
  cardNumber: {
    empty: "Card Number is required",
    invalid: "Card Number is not valid",
  },
  cardExpiry: {
    empty: "Card Expiry is required",
    invalid: "Card Expiry is not valid",
  },
  cvv: {
    empty: "CVV is required",
    invalid: "CVV is not valid",
  },
};
// event listener for the form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputs = document.querySelectorAll(".input-field");
  inputs.forEach((input) => {
    validateInputField(input);
  });
});
// to validate the inputs
function validateInputField(input) {
  const value = input.value.trim();
  const name = input.name;
  const errorText = input.nextElementSibling;
  if (value === "") {
    showError(input, errorText, message[name].empty);
    return;
  }
  if (!validators[name](value)) {
    showError(input, errorText, message[name].invalid);
    return;
  }
  clearErrorMsg(input, errorText);
}
// to show errors
function showError(input, errorText, message) {
  errorText.textContent = message;
  input.classList.add("error-border");
}
//clearance of the error
function clearErrorMsg(input, error) {
  error.textContent = "";
  input.classList.remove("error-border");
}
//dynamic input validation
document.querySelectorAll(".input-field").forEach((input) => {
  input.addEventListener("input", function () {
    validateInputField(input);
  });
});
