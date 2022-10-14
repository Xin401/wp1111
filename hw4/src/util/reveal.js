/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount, boardSize) => {
  if (board[x][y].revealed === true) {
    return { board, newNonMinesCount };
  }
  else {
    let tmp;
    board[x][y].revealed = true;
    newNonMinesCount--;

    if (board[x][y].value === 0) {
      if (x > 0) {
        if (y > 0) {
          tmp = revealed(board, x - 1, y - 1, newNonMinesCount, boardSize);
          board = tmp.board;
          newNonMinesCount = tmp.newNonMinesCount;
        }
        tmp = revealed(board, x - 1, y, newNonMinesCount, boardSize);
        board = tmp.board;
        newNonMinesCount = tmp.newNonMinesCount;
        if (y < boardSize - 1) {
          tmp = revealed(board, x - 1, y + 1, newNonMinesCount, boardSize);
          board = tmp.board;
          newNonMinesCount = tmp.newNonMinesCount;
        }
      }
      if (y > 0) {
        tmp = revealed(board, x, y - 1, newNonMinesCount, boardSize);
        board = tmp.board;
        newNonMinesCount = tmp.newNonMinesCount;
      }
      if (y < boardSize - 1) {
        tmp = revealed(board, x, y + 1, newNonMinesCount, boardSize);
        board = tmp.board;
        newNonMinesCount = tmp.newNonMinesCount;
      }
      if (x < boardSize - 1) {
        if (y > 0) {
          tmp = revealed(board, x + 1, y - 1, newNonMinesCount, boardSize);
          board = tmp.board;
          newNonMinesCount = tmp.newNonMinesCount;
        }
        tmp = revealed(board, x + 1, y, newNonMinesCount, boardSize);
        board = tmp.board;
        newNonMinesCount = tmp.newNonMinesCount;
        if (y < boardSize - 1) {
          tmp = revealed(board, x + 1, y + 1, newNonMinesCount, boardSize);
          board = tmp.board;
          newNonMinesCount = tmp.newNonMinesCount;
        }
      }
    }
    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
    return { board, newNonMinesCount };
  }
}
