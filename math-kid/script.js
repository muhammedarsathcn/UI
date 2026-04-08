// Query selectors for all elements
const shapeContainer = document.querySelector(".shapes");
const shapes = document.querySelectorAll(".shapes .shape");
const nextBtn = document.querySelector(".section-one-btn");
const step1 = document.querySelector("#step1");
const step2 = document.querySelector("#step2");
const step3 = document.querySelector("#step3");
const step2Title = document.querySelector("#step2 .section-title");
const calculateBtn = document.querySelector(".section-two-btn");
const calculateInputField = document.querySelector("#step2 .input-field");
const step3Shape = document.querySelector("#step3 .section-shape");
const step3Title = document.querySelector("#step3 .section-title");
const sideMiddle = document.querySelector("#side .middle");
const sideRight = document.querySelector("#side .right-side");
const areaMiddle = document.querySelector("#area .middle");
const areaRight = document.querySelector("#area .right-side");
const perimeterMiddle = document.querySelector("#perimeter .middle");
const perimeterRight = document.querySelector("#perimeter .right-side");
const startAgainBtn = document.querySelector("#step3 .section-three-btn");
//shape's data
const shapesData = {
  circle: {
    name: "circle1",
    baseShape: "circle",
    title: "2. Enter Radius",
    area: (r) => Math.PI * r * r,
    perimeter: (r) => 2 * Math.PI * r,
    side: (s) => `${s}`,
    formulaArea: "πr²",
    formulaPerimeter: "2πr",
    formulaSide: "r",
  },
  circle1: {
    name: "circle2",
    baseShape: "circle",
    title: "2. Enter Radius",
    area: (r) => Math.PI * r * r,
    perimeter: (r) => 2 * Math.PI * r,
    side: (s) => `${s}`,
    formulaArea: "πr²",
    formulaPerimeter: "2πr",
    formulaSide: "r",
  },
  square: {
    name: "Square",
    baseShape: "square",
    title: "2. Enter Side",
    area: (s) => s * s,
    perimeter: (s) => 4 * s,
    side: (s) => `${s}`,
    formulaArea: "s * s",
    formulaPerimeter: "4 * s",
    formulaSide: "s",
  },
  triangle: {
    name: "Equilateral Triangle",
    baseShape: "triangle",
    title: "2. Enter Side (Base & Height)",
    area: (a) => (Math.sqrt(3) / 4) * a * a,
    perimeter: (a) => 3 * a,
    formulaArea: "0.433 * s * s",
    formulaPerimeter: "3 * s",
    formulaSide: "s",
  },
};
// initially step2 and step3 hide
step2.style.display = "none";
step3.style.display = "none";
let shapeName = "";
// Helper functions for session storage
const saveState = () => {
  sessionStorage.setItem("shapeName",shapeName)
  sessionStorage.setItem("selectedShape", selectedShape);
  sessionStorage.setItem("inputValue", calculateInputField.value);
};

const restoreState = () => {
  const shapeName = sessionStorage.getItem("shapeName")
  const savedShape = sessionStorage.getItem("selectedShape");
  const savedInputValue = sessionStorage.getItem("inputValue");
  const savedStep = sessionStorage.getItem("currentStep");
  if (savedShape) {
    selectedShape = savedShape;
   document.querySelectorAll(".shape").forEach((shape) => {
  if (
    shape.firstElementChild.classList.contains(savedShape) 
    && shape.firstElementChild.classList.contains(shapeName)
  ) {
    shape.classList.add("selected");
  }
});
    // document.querySelectorAll(".shape").forEach((shape) => {
   
    // });
    nextBtn.style.display = "inline-block";
  }

  if (savedInputValue) {
    calculateInputField.value = savedInputValue;
  }
  if (savedStep === "step2" && selectedShape) {
    step1.style.display = "none";
    step2.style.display = "flex";
    step2Title.textContent = shapesData[selectedShape].title;
  } else if (savedStep === "step3" && selectedShape && savedInputValue) {
    const side = Number(savedInputValue);
    step1.style.display = "none";
    step2.style.display = "none";
    step3.style.display = "flex";
    step3Shape.classList.remove("section-shape");
    step3Shape.classList.add(selectedShape);
    step3Shape.style.display = "block";
    step3Shape.style.position = "relative";
    step3Title.textContent = shapesData[selectedShape].name;
    sideMiddle.textContent = shapesData[selectedShape].formulaSide;
    sideRight.textContent = `${side} cm`;
    areaMiddle.textContent = shapesData[selectedShape].formulaArea;
    areaRight.textContent = `${shapesData[selectedShape].area(side).toFixed(2)} sq cm`;
    perimeterMiddle.textContent = shapesData[selectedShape].formulaPerimeter;
    perimeterRight.textContent = `${shapesData[selectedShape].perimeter(side).toFixed(2)}  cm`;
  }
};


Object.entries(shapesData).forEach((key) => {
  const shapeDiv = document.createElement("div");
  shapeDiv.classList.add("shape");
  shapeDiv.innerHTML = `<div class="${key[1].baseShape} ${key[1].name}">
   <i class="tick"></i>
  </div>`;
  shapeDiv.addEventListener("click", () => {
    document
      .querySelectorAll(".shape")
      .forEach((s) => s.classList.remove("selected"));
    shapeDiv.classList.add("selected");
    selectedShape = key[1].baseShape;
     shapeName = key[1].name;
    saveState();
    nextBtn.style.display = "inline-block";
  });
  shapeContainer.appendChild(shapeDiv);
});

// to select the shape which is selected by the user
let selectedShape = null;
shapes.forEach((shape) => {
  shape.addEventListener("click", () => {
    shapes.forEach((s) => s.classList.remove("selected"));
    shape.classList.add("selected");
    selectedShape = shape.firstElementChild.className;
   
    saveState();
    nextBtn.style.display = "inline-block";
  });
});

// event listener for the next button to show the input section
nextBtn.addEventListener("click", () => {
  step1.style.display = "none";
  step2.style.display = "flex";
  sessionStorage.setItem("currentStep", "step2");
  step2Title.textContent = shapesData[selectedShape].title;
});

calculateInputField.addEventListener("input", () => {
  sessionStorage.setItem("inputValue", calculateInputField.value);
});

// event listener for the calculate button to calculate radius, perimeter and area
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
  if (side == 0) {
    alert("Side cannot be zero, because it is not a shape if side is zero");
    return;
  }
  // Save state before moving to step3
  saveState();
  sessionStorage.setItem("currentStep", "step3");
  restoreState();
  step3Shape.classList.remove("section-shape");
  step3Shape.classList.add(selectedShape);
  step3Shape.style.display = "block";
  step3Shape.style.position = "relative";
  step3Title.textContent = shapesData[selectedShape].name;
  sideMiddle.textContent = shapesData[selectedShape].formulaSide;
  sideRight.textContent = `${side} cm`;
  areaMiddle.textContent = shapesData[selectedShape].formulaArea;
  areaRight.textContent = `${shapesData[selectedShape].area(side).toFixed(2)} sq cm`;
  perimeterMiddle.textContent = shapesData[selectedShape].formulaPerimeter;
  perimeterRight.textContent = `${shapesData[selectedShape].perimeter(side).toFixed(2)}  cm`;
  step3.style.display = "flex";
});

// event listener for cleaning all stored data and start again from the first section
startAgainBtn.addEventListener("click", () => {
  document.querySelectorAll(".shape").forEach((shape) => {
    shape.classList.remove("selected");
  });
  calculateInputField.value = null;
  side = "";
  step3Shape.classList.remove(selectedShape);
  step3Shape.classList.add("section-shape");
  selectedShape = null;
  step3.style.display = "none";
  step1.style.display = "flex";
  sessionStorage.removeItem("selectedShape");
  sessionStorage.removeItem("inputValue");
  sessionStorage.removeItem("currentStep");
  sessionStorage.removeItem("shapeName")
});

restoreState();
