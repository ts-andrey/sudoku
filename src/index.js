const checkRow = (sudoku, row, value) => {
  for (let i = 0; i < sudoku[row].length; i++) {
    if (sudoku[row][i] === value) return false;
  }
  return true;
};
const checkColumn = (sudoku, column, value) => {
  for (let i = 0; i < sudoku.length; i++) {
    if (sudoku[i][column] === value) return false;
  }
  return true;
};
const checkSquare = (sudoku, row, column, value) => {
  let leftCornerRow = 0;
  let leftCornerColumn = 0;
  const squareSize = 3;

  while (column >= leftCornerColumn + squareSize) {
    leftCornerColumn += squareSize;
  }

  while (row >= leftCornerRow + squareSize) {
    leftCornerRow += squareSize;
  }

  for (let i = leftCornerRow; i < leftCornerRow + squareSize; i++) {
    for (let j = leftCornerColumn; j < leftCornerColumn + squareSize; j++) {
      if (sudoku[i][j] === value) return false;
    }
  }
  return true;
};

const comboChecker = (sudoku, row, column, value) => {
  if (checkRow(sudoku, row, value) && checkColumn(sudoku, column, value) && checkSquare(sudoku, row, column, value)) {
    return true;
  } else return false;
};

const findEmptyPlaces = matrix => {
  const coords = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] === 0 ? coords.push([i, j]) : false;
    }
  }
  return coords;
};

const solver = (matrix, zeroCoords) => {
  let row;
  let column;
  let value;
  let found;

  for (i = 0; i < zeroCoords.length; ) {
    found = false;
    [row, column] = zeroCoords[i];
    value = matrix[row][column] + 1;
    while (!found && value < 10) {
      if (comboChecker(matrix, row, column, value)) {
        found = true;
        matrix[row][column] = value;
        i++;
      } else {
        value++;
      }
    }
    if (!found) {
      matrix[row][column] = 0;
      i--;
    }
  }

  return matrix;
};

module.exports = function solveSudoku(matrix) {
  const zeroCoords = findEmptyPlaces(matrix);
  return solver(matrix, zeroCoords);
};