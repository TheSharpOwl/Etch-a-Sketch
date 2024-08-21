function createBoardSquare() {
  let rowElem = document.createElement("div");
  rowElem.style.backgroundColor = "#FFD700";
  rowElem.style.width = "100%";
  rowElem.style.height = "100%";
  rowElem.style.margin = 0;
  rowElem.style.border = "thin solid #000000"
  rowElem.onmouseover = function(){this.style.backgroundColor="#4B0082";}

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
  const boardContainerElem = document.getElementById("board-container");
  boardContainerElem.appendChild(rowsDiv);
};

generateBoard(16);
