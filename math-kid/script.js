const shapes = document.querySelectorAll(".shapes span");
const nextBtn = document.querySelector(".section-one-btn");
const step1 = document.querySelector("#step1");
const step2 = document.querySelector("#step2");
const step3 = document.querySelector("#step3");
const step2Title = document.querySelector("#step2 .section-title");
const calculateBtn = document.querySelector(".section-two-btn");
const calculateInputField = document.querySelector("#step2 .input-field");
const step3Shape = document.querySelector("#step3 .section-shape");
const step3Title = document.querySelector("#step3 .section-title");
// const sideMiddle = document.querySelector("#side .middle");
const sideRight = document.querySelector("#side .right-side");
const areaMiddle = document.querySelector("#area .middle");
const areaRight = document.querySelector("#area .right-side");
const perimeterMiddle = document.querySelector("#perimeter .middle");
const perimeterRight = document.querySelector("#perimeter .right-side");
const startAgainBtn = document.querySelector("#step3 .section-three-btn");
const shapesData = {
  circle: {
    name: "Circle",
    area: (r) => Math.PI * r * r,
    perimeter: (r) => 2 * Math.PI * r,
    side: (s) => `${s}`,
    formulaArea: "πr²",
    formulaPerimeter: "2πr",
  },

  square: {
    name: "Square",
    area: (s) => s * s,
    perimeter: (s) => 4 * s,
    formulaArea: "s × s",
    formulaPerimeter: "4 × s",
  },

  triangle: {
    name: "Equilateral Triangle",
    area: (a) => (Math.sqrt(3) / 4) * a * a,
    perimeter: (a) => 3 * a,
    formulaArea: "0.433 × s x s",
    formulaPerimeter: "3 × s",
  },
};
step2.style.display = "none";
step3.style.display = "none";

let selectedShape = null;

shapes.forEach((shape) => {
  shape.addEventListener("click", () => {
    shapes.forEach((s) => s.classList.remove("selected"));

    shape.classList.add("selected");
    selectedShape = shape.className.split(" ")[0];

    nextBtn.style.display = "inline-block";
  });
});

nextBtn.addEventListener("click", () => {
  step1.style.display = "none";
  step2.style.display = "flex";
  console.log("Inside btn Listener", selectedShape);
  if (selectedShape === "circle") {
    step2Title.textContent = "2.Enter Radius";
  } else if (selectedShape === "triangle") {
    step2Title.textContent = "2.Enter Side (Base & Height)";
  } else {
    step2Title.textContent = "2.Enter Side";
  }
});

calculateBtn.addEventListener("click", () => {
  const stringValue = calculateInputField.value;

  if (stringValue === "" || stringValue === null) {
    alert("Enter the value");
    return;
  }

  const side = Number(stringValue);

  if (isNaN(side)) {
    alert("Invalid input.");
    return;
  }

  step2.style.display = "none";

  step3Shape.classList.remove("section-shape");
  step3Shape.classList.add(selectedShape);
  step3Title.textContent = shapesData[selectedShape].name;

  sideRight.textContent = side + " cm";

  areaMiddle.textContent = shapesData[selectedShape].formulaArea;
  areaRight.textContent =
    shapesData[selectedShape].area(side).toFixed(2) + "sq cm";

  perimeterMiddle.textContent = shapesData[selectedShape].formulaPerimeter;
  perimeterRight.textContent =
    shapesData[selectedShape].perimeter(side).toFixed(2) + " cm";

  step3.style.display = "flex";
});

startAgainBtn.addEventListener("click", () => {
  shapes.forEach((shape) => {
    shape.classList.remove("selected");
  });
  calculateInputField.value = null;
  side = "";
  step3Shape.classList.remove(selectedShape);
  step3Shape.classList.add("section-shape");
  selectedShape = null;
  step3.style.display = "none";
  step1.style.display = "flex";
});
