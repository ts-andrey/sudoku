const checkRow = (sudoku, row, value) => {
  for (let i = 0; i < sudoku[row].length; i++) {
    if (sudoku[row] === value) return false;
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

  for (let i = 0; i < leftCornerRow + squareSize; i++) {
    for (let j = 0; j < leftCornerColumn + squareSize; j++) {
      if (sudoku[i][j] === value) return false;
    }
  }
  return true;
};
const comboChecker = (sudoku, row, column, value) => {
  if (checkRow(sudoku, row, value) && checkColumn(sudoku, column, value) && checkSquare(sudoku, row, column, value))
    return true;
  else return false;
};


const approve = line => {
  const metVal = [];
  for (let i = 0; i < line.length; i++) {
    if (metVal.includes(line[i]) && line[i] !== 0) return false;
    metVal.push(line[i]);
  }
  return true;
};

const isValid = ([row, column], matrix) => {
  const rowDigits = [];
  const columnDigits = [];
  for (let i = 0; i < matrix.length; i++) {
    rowDigits.push(matrix[row][i]);
    columnDigits.push(matrix[i][column]);
  }
  if (false === approve(rowDigits) || false === approve(columnDigits)) return false;
  return true;
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

module.exports = function solveSudoku(matrix) {
  // function solveSudoku(matrix) {
  const zeroCoords = findEmptyPlaces(matrix);

  for (let i = 0; i < zeroCoords.length; i++) {
    const [row, column] = zeroCoords[i];

    for (let num = matrix[row][column]; num <= 9; num++) {
      if (num + 1 <= 9) {
        matrix[row][column] = num + 1;
        if (isValid([row, column], matrix)) break;
      } else {
        matrix[row][column] = 0;
        i -= 1;
        break;
      }
    }
  }
  return matrix;
};

// const sudoku = [
//   [5, 3, 4, 6, 7, 8, 9, 0, 0],
//   [6, 7, 2, 1, 9, 5, 3, 4, 8],
//   [1, 9, 8, 3, 4, 2, 5, 6, 7],
//   [8, 5, 9, 7, 6, 1, 4, 2, 3],
//   [4, 2, 6, 8, 5, 3, 7, 9, 1],
//   [7, 1, 3, 9, 2, 4, 8, 5, 6],
//   [9, 6, 1, 5, 3, 7, 2, 8, 4],
//   [2, 8, 7, 4, 1, 9, 6, 3, 5],
//   [3, 4, 5, 2, 8, 6, 1, 7, 9],
// ];

// console.table(solveSudoku(sudoku));
