let Borders = document.getElementById("addBorders");
let container = document.getElementById("container");

function makeRows(X) {
  container.replaceChildren();
  container.style.setProperty('--grid-rows', X);
  container.style.setProperty('--grid-cols', X);
    for (c = 0; c < (X * X); c++) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "gridItem";
    
    cell.addEventListener("mouseover", onMouseOver);

      function onMouseOver(e) {
      let hexInput = document.getElementById("hex").value;
      let randomColor = randomRGB();
      
      if (hexInput.includes("rainbow")) {
        colorValue = randomColor
        document.getElementById("hex").value = "rainbow" + " " + colorValue;
        colorPicker.style.setProperty("background", colorValue);
        e.target.style.setProperty("background", colorValue);
      }
      else {
        colorValue = hexInput;
        document.getElementById("hex").value = colorValue;
        colorPicker.style.setProperty("background", colorValue);
        e.target.style.setProperty("background", colorValue);
        rainbow.style.background = "white"
      }
    }
  }
}

////////////////////// GRID SIZE SLIDER
let rangeInput = document.querySelector("#myRange");
let sizeInput = document.querySelector("#gridSizeTextbox");
rangeInput.addEventListener("input", myRangeSize);
rangeInput.addEventListener("change", RangeSize);

function myRangeSize() {
  let size = rangeInput.value;
  sizeInput.value = (size + " x " + size)
}

function RangeSize() {
  let gridSize = rangeInput.value;
if (gridSize > 100) {
  gridSize = 100;
  makeRows(gridSize);
}
else {
  makeRows(gridSize);
};

let nodes = document.getElementById('container').childNodes;

if (Borders.style.background == "lightblue"){

  for(var i=0; i<nodes.length; i++) {
      if (nodes[i].nodeName.toLowerCase() == 'div') {
      nodes[i].style.border = "0.1px solid lightgrey";
      }
    }
  }
};

///////////////////////  COLOR PICKER
let colorInput = document.querySelector("#color");
let hexInput = document.querySelector("#hex");
let colorPicker = document.getElementById("color_front");
colorInput.addEventListener("input", operationColor);
colorInput.addEventListener("mouseover", colorPickerHoverIn);
colorInput.addEventListener("mouseout", colorPickerHoverOut);

function operationColor() {
  let color = colorInput.value;
  hexInput.value = color;
  colorPicker.style.setProperty("background", color);
  if (hexInput.value !== "#FFFFFF") {
    eraserButton.style.background = "white"
  }
}

function colorPickerHoverIn(){
  colorPicker.style.outline = "solid 5px white"
}
function colorPickerHoverOut(){
  colorPicker.style.outline = "none"
}

/////////////////////// RAINBOW MODE
function randomRGB() {
  let x = Math.floor(Math.random() * 256);
  let y = Math.floor(Math.random() * 256);
  let z = Math.floor(Math.random() * 256);
  return "rgba(" + x + "," + y + "," + z + ")";
}

let rainbow = document.getElementById("rainbowMode");
rainbow.addEventListener("click", rainbowMode, false);
function rainbowMode(){
  colorPicker.style.background = "conic-gradient(red,violet,blue,aqua,green,lime,yellow,orange,red)"
  document.getElementById('hex').value = "rainbow"
  rainbow.style.background = "lightblue"
  eraserButton.style.background = "white"
}

/////////////////////// ERASER
let eraserButton = document.getElementById("eraser");
eraserButton.addEventListener("click", eraser, false);
function eraser() {
  document.getElementById('hex').value = "#FFFFFF";
  colorPicker.style.setProperty("background", "#FFFFFF");
 eraserButton.style.background = "lightblue"
 rainbow.style.background = "white"
}


///////////////////////  DIALS
document.addEventListener("mousemove", eyeball);

function eyeball() {
  const eye = document.querySelectorAll(".circles");
  eye.forEach(function (eye) {
    let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
    let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;

    let radian = Math.atan2(event.pageX - x, event.pageY - y);
    let rotate = radian * (180 / Math.PI) * -1 + 270;
    eye.style.transform = "rotate(" + rotate + "deg)";
  });
}

////////////////////////// RESET
let resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", reset, false);

function reset() {
  let nodes = document.getElementById('container').childNodes;
for(var i=0; i<nodes.length; i++) {
    if (nodes[i].nodeName.toLowerCase() == 'div') {
         nodes[i].style.background = "white";
     }
}
}

/////////////////////////// BORDERS
Borders.addEventListener("click", showBorders, false);

function showBorders() {
  let nodes = document.getElementById('container').childNodes;
  if (Borders.style.background != "lightblue") {
    for(let i=0; i<nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'div') {
             nodes[i].style.border = "0.1px solid lightgrey";
        }
      }
    Borders.style.background = "lightblue"
  }
  else {
    for(let i=0; i<nodes.length; i++) {
      if (nodes[i].nodeName.toLowerCase() == 'div') {
           nodes[i].style.border = "none";
      }
    }
    Borders.style.background = "white"
  }
}

makeRows(50)
showBorders()