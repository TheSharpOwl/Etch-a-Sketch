
const buttonsMap = new Map([
  ["brush", document.getElementById("brush")],
  ["palette", document.getElementById("palette")],
  ["eraser", document.getElementById("eraser")]
]);

const selectedPadding = "5px"
const nonSelectedPadding = "10px"
const menuSelectionColor = "yellow"


let brushColor = "#4B0082"
let backgroundColor = "#FFD700"


function copyDimensionsAndSpaces(sourceElement, targetElement) {
  // Get the computed styles of the source element
  const computedStyles = window.getComputedStyle(sourceElement);

  // Copy only the desired properties
  targetElement.style.width = computedStyles.width;
  targetElement.style.height = computedStyles.height;
  targetElement.style.margin = computedStyles.margin;
  targetElement.style.padding = computedStyles.padding;
}


function createBoardSquare() {
  let rowElem = document.createElement("div");
  rowElem.style.backgroundColor = backgroundColor;
  rowElem.style.width = "100%";
  rowElem.style.height = "100%";
  rowElem.style.margin = 0;
  rowElem.style.border = "thin solid #000000"
  rowElem.onmouseover = function(){this.style.backgroundColor=brushColor;}

  return rowElem;
}

function createBoardRow(n) {
  let rowRef = document.createElement("div");
  rowRef.className = "board-row";
  rowRef.style.width = "100%";
  rowRef.style.height = "100%";
  rowRef.style.margin = 0;
  for (let i = 0; i < n; i++) {
    rowElem = createBoardSquare();
    rowRef.appendChild(rowElem);
  }

  return rowRef;
}

const generateBoard = (n) => {
  // inside of this div we will make many rows and align them like a column
  const rowsDiv = document.getElementById("board-container");
  rowsDiv.className = "board-column";
  let rowRefs = [];

  for (let j = 0; j < n; j++) {
    let rowRef = createBoardRow(n);
    rowRefs.push(rowRef);
    rowsDiv.appendChild(rowRef);
  }
  // const boardContainerElem = document.getElementById("board-container");
  // boardContainerElem.appendChild(rowsDiv);
};


function resizeImages() {
  const img1 = document.getElementById("anna-img")
  const img2 = document.getElementById("koshi-img")
  const minWidth = Math.min(img1.width, img2.width)
  img1.style.width = img2.style.width = minWidth + "px"
}

function markSelected(buttonName) {
  for (let [name, element] of buttonsMap) {
    if (name != buttonName) {
      element.style.padding = nonSelectedPadding;
      element.style.border = "none";
      continue;
    }

    element.style.border =  `${selectedPadding} solid ${menuSelectionColor}`;
    element.style.padding = selectedPadding;
  }
}
function adjustComponentsAndMarkBrush() {
  resizeImages()
  markSelected("brush")
  menuSetup()
}

function menuSetup() {
  // setup clicking events
  buttonsMap.get("eraser").addEventListener('click', () => {brushColor = backgroundColor; markSelected("eraser")});
  buttonsMap.get("brush").addEventListener('click', () => {markSelected("brush")});
  // when we select the palette we actually click on the hidden color input
  buttonsMap.get("palette").addEventListener('click', () => {document.getElementById('color-input').click(); markSelected("palette")});

  // setup color input (hidden from the UI)
  let colorInputComponent = document.getElementById('color-input');
  colorInputComponent.addEventListener('input', (event) => {
    brushColor = event.target.value;
    colorRect.style.backgroundColor = brushColor;
  });
  // because it will be a brush but selection is stuck on the palette
  colorInputComponent.addEventListener('change', () => {
      markSelected("brush");
  });


  // show the selected color
  let menuDiv = document.getElementById("menu");
  // create the div that will show the selected color
  let colorRect = document.createElement("div");
  copyDimensionsAndSpaces(buttonsMap.get("eraser"), colorRect);
  // at the start the palette is not selected so we can copy its style to the color rectangle
  colorRect.style.backgroundColor = brushColor;
  menuDiv.appendChild(colorRect)
}

generateBoard(16);
// adjust the images sizes to make the board be in the middle (when image finishes loading otherwise the width will be 0)
window.onload = adjustComponentsAndMarkBrush;
