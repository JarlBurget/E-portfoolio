const board = document.getElementById('board');
const pieces = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
};

let chessBoard, selectedPiece = null, isWhiteTurn = true;

function resetBoard() {
  chessBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  ];
  selectedPiece = null;
  isWhiteTurn = true;
  createBoard();
}

function createBoard() {
  board.innerHTML = '';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.classList.add('square', (row + col) % 2 === 0 ? 'white' : 'black');
      square.dataset.row = row;
      square.dataset.col = col;
      if (chessBoard[row][col] !== ' ') {
        square.textContent = pieces[chessBoard[row][col]];
      }
      square.addEventListener('click', handleMove);
      board.appendChild(square);
    }
  }
}

function handleMove(event) {
  const square = event.target;
  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);

  if (!selectedPiece) {
    if (
      chessBoard[row][col] !== ' ' &&
      ((isWhiteTurn && chessBoard[row][col] === chessBoard[row][col].toUpperCase()) ||
       (!isWhiteTurn && chessBoard[row][col] === chessBoard[row][col].toLowerCase()))
    ) {
      selectedPiece = square;
      square.classList.add('highlighted');
    }
    return;
  }

  const startRow = parseInt(selectedPiece.dataset.row);
  const startCol = parseInt(selectedPiece.dataset.col);
  const piece = chessBoard[startRow][startCol];

  // Validate move (including knights)
  if (isValidMove(piece, startRow, startCol, row, col)) {
    chessBoard[row][col] = piece;
    chessBoard[startRow][startCol] = ' ';
    isWhiteTurn = !isWhiteTurn; // Toggle turn
  }

  selectedPiece.classList.remove('highlighted');
  selectedPiece = null;
  createBoard();

  if (!isWhiteTurn) {
    blackMove();
  }
}

function isValidMove(piece, startRow, startCol, row, col) {
  const direction = isWhiteTurn ? -1 : 1;

  // Pawn movement
  if (piece.toUpperCase() === 'P') {
    if (col === startCol && chessBoard[row][col] === ' ') {
      if (row === startRow + direction) return true;
      if ((isWhiteTurn && startRow === 6 || !isWhiteTurn && startRow === 1) && row === startRow + 2 * direction) {
        return chessBoard[startRow + direction][col] === ' ';
      }
    }
    if (Math.abs(col - startCol) === 1 && row === startRow + direction && chessBoard[row][col] !== ' ') {
      return true;
    }
  }

  // Knight movement (L-shape)
  if (piece.toUpperCase() === 'N') {
    const rowDiff = Math.abs(row - startRow);
    const colDiff = Math.abs(col - startCol);
    if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
      return true;
    }
  }

  return false;
}

function blackMove() {
  const kingRow = 7, kingCol = 4; // White King position
  const queenRow = 0, queenCol = 3; // Black Queen position
  chessBoard[kingRow][kingCol] = 'q'; // Black Queen takes the White King
  chessBoard[queenRow][queenCol] = ' '; // Remove Queen from initial position
  createBoard();

  setTimeout(() => {
    alert("Black Queen takes the White King. Game Over! You lost!");
    if (confirm("Would you like to play again?")) resetBoard();
  }, 100);
}

resetBoard();
