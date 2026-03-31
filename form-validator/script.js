const form = document.querySelector(".form");
// validators and error messages for each input fields
const validators = {
  firstName: {
    validate: (value) => /^[A-Za-z]{1,30}$/.test(value),
    message: {
      empty: "First Name is required",
      invalid: "First Name is not valid",
    },
  },
  lastName: {
    validate: (value) => /^[A-Za-z]{1,30}$/.test(value),
    message: {
      empty: "Last Name is required",
      invalid: "Last Name is not valid",
    },
  },
  email: {
    validate: (value) =>
      /^[A-Za-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,}/i.test(value),
    message: {
      empty: "Email Address is required",
      invalid: "Email Address is not valid",
    },
  },
  contactNumber: {
    validate: (value) => /^[6-9]\d{9}$/.test(value),
    message: {
      empty: "Contact Number is required",
      invalid: "Contact Number is not valid",
    },
  },
  pinCode: {
    validate: (value) => /^\d{6}$/.test(value),
    message: {
      empty: "PIN Code is required",
      invalid: "PIN Code is not valid",
    },
  },
  cardNumber: {
    validate: (value) => /^\d{16}$/.test(value),
    message: {
      empty: "Card Number is required",
      invalid: "Card Number is not valid",
    },
  },
  cardExpiry: {
    validate: (value) => {
      const currentYear = new Date().getFullYear();
      return /^\d{4}$/.test(value) && Number(value) >= currentYear;
    },
    message: {
      empty: "Card Expiry is required",
      invalid: "Card Expiry is not valid",
    },
  },
  cvv: {
    validate: (value) => /^\d{3,4}$/.test(value),
    message: {
      empty: "CVV is required",
      invalid: "CVV is not valid",
    },
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
    showError(input, errorText, validators[name].message.empty);
    return;
  }
  if (!validators[name].validate(value)) {
    showError(input, errorText, validators[name].message.invalid);
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
