// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function parseRow(rowText, expectedCount) {
  const row = rowText
    .trim()
    .split(' ')
    .map(Number)
    .filter(value => !Number.isNaN(value));

  if (row.length !== expectedCount) {
    return null;
  }

  return row;
}

function readMatrix(rows, cols) {
  const matrix = [];

  for (let r = 0; r < rows; r += 1) {
    const line = readlineSync.question(`Enter row ${r + 1}: `);
    const parsed = parseRow(line, cols);

    if (parsed === null) {
      console.log('Error: row must contain the correct number of values.');
      return null;
    }

    matrix.push(parsed);
  }

  return matrix;
}

function printMatrix(matrix) {
  for (let r = 0; r < matrix.length; r += 1) {
    const row = matrix[r];
    const formatted = row.map(value => String(value).padStart(4, ' ')).join('');
    console.log(formatted);
  }
}

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let c = 0; c < cols; c += 1) {
    const newRow = [];
    for (let r = 0; r < rows; r += 1) {
      newRow.push(matrix[r][c]);
    }
    result.push(newRow);
  }

  return result;
}

function addMatrices(matrixA, matrixB) {
  const rows = matrixA.length;
  const cols = matrixA[0].length;
  const result = [];

  for (let r = 0; r < rows; r += 1) {
    const newRow = [];
    for (let c = 0; c < cols; c += 1) {
      newRow.push(matrixA[r][c] + matrixB[r][c]);
    }
    result.push(newRow);
  }

  return result;
}

function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const colsB = matrixB[0].length;
  const result = [];

  for (let r = 0; r < rowsA; r += 1) {
    const newRow = [];
    for (let c = 0; c < colsB; c += 1) {
      let sum = 0;
      for (let k = 0; k < colsA; k += 1) {
        sum += matrixA[r][k] * matrixB[k][c];
      }
      newRow.push(sum);
    }
    result.push(newRow);
  }

  return result;
}

function main() {
  console.log('Matrix Transpose');
  const rowsA = readlineSync.questionInt('Enter number of rows: ');
  const colsA = readlineSync.questionInt('Enter number of columns: ');

  if (rowsA <= 0 || colsA <= 0) {
    console.log('Error: row and column counts must be positive.');
    return;
  }

  const matrixA = readMatrix(rowsA, colsA);
  if (matrixA === null) {
    return;
  }

  console.log('\nOriginal Matrix:');
  printMatrix(matrixA);

  const transposed = transposeMatrix(matrixA);
  console.log('\nTransposed Matrix:');
  printMatrix(transposed);

  console.log('\nMatrix Addition');
  const rowsB = readlineSync.questionInt('Enter number of rows: ');
  const colsB = readlineSync.questionInt('Enter number of columns: ');

  if (rowsA !== rowsB || colsA !== colsB) {
    console.log('Error: Matrices must have the same dimensions for addition.');
    return;
  }

  const matrixB = readMatrix(rowsB, colsB);
  if (matrixB === null) {
    return;
  }

  const sumMatrix = addMatrices(matrixA, matrixB);
  console.log('\nSum of matrices:');
  printMatrix(sumMatrix);

  console.log('\nMatrix Multiplication');
  const rowsC = readlineSync.questionInt('Enter rows for matrix A: ');
  const colsC = readlineSync.questionInt('Enter columns for matrix A: ');
  const rowsD = readlineSync.questionInt('Enter rows for matrix B: ');
  const colsD = readlineSync.questionInt('Enter columns for matrix B: ');

  if (rowsC <= 0 || colsC <= 0 || rowsD <= 0 || colsD <= 0) {
    console.log('Error: row and column counts must be positive.');
    return;
  }

  if (colsC !== rowsD) {
    console.log('Error: Number of columns in A must match number of rows in B.');
    return;
  }

  const matrixC = readMatrix(rowsC, colsC);
  if (matrixC === null) {
    return;
  }

  const matrixD = readMatrix(rowsD, colsD);
  if (matrixD === null) {
    return;
  }

  const product = multiplyMatrices(matrixC, matrixD);
  console.log('\nProduct matrix:');
  printMatrix(product);
}

main();

