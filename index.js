const generateBoard = (n) => {
  // inside of this div we will make many rows and align them like a column
  const rowsDiv = document.getElementById("board-container");
  rowsDiv.className = "board-column";
  //   rowsDiv.style.width = "100%";
  //   rowsDiv.style.height = "100%";
  let rowRefs = [];

  for (let j = 0; j < n; j++) {
    let rowRef = document.createElement("div");
    rowRef.className = "board-row";
    rowRef.style.width = 20 + "%";
    rowRef.style.height = 20 + "%";
    rowRef.style.margin = 0;

    rowRefs.push(rowRef);
    for (let i = 0; i < n; i++) {
      let rowElem = document.createElement("div");
      rowElem.style.backgroundColor = (i + j) % 2 == 0 ? "green" : "blue";
      rowElem.style.width = 20 + "%";
      rowElem.style.height = 20 + "%";
      rowElem.style.margin = 0;
      // maybe add padding here for the size
      rowRef.appendChild(rowElem);
    }
    rowsDiv.appendChild(rowRef);
  }
  const boardContainerElem = document.getElementById("board-container");
  boardContainerElem.appendChild(rowsDiv);
};

// generateBoard(5);
