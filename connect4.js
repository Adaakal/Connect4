/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
const value = 'Container';

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  board = Array.apply(null, { length: HEIGHT }).map(el => {
    return Array.apply(null, { length: WIDTH }).map(element => {
      return value;
    });
  });
  return board;
}



/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.querySelector("#board");
  // TODO: add comment for this code
  //this makes the top row of the board 
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //the amount of rows we'll have; then the width of each row; labeling each cell; appending each cell to the row;appending each row to the board
  for (let y = 0; y < HEIGHT; y++) {
    let row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  //if this y has a class of p1 || or p2 then the y becomes y++ ; unless it makes y = 6 then the row would be full
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (board[y][x] === value) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let tableToTraverse = document.getElementById("board");
  let ids = `${y}-${x}`;

  let numAfterDash = ids.split('-')[1];
 
  //counts the very top row that is not part of the game
  let allRows = tableToTraverse.getElementsByTagName('tr');
  


  let aRow = allRows[y+1];
  
  let cell = aRow.children[numAfterDash];
 

  let tdDiv = document.createElement("div");
  tdDiv.classList.add('piece');

  cell.appendChild(tdDiv);
  if (currPlayer == 1) {

    tdDiv.classList.add('p1');

  } else {

    tdDiv.classList.add('p2');

  }

  //Handle if there is already a classlist, meaning that the spot is taken.
  console.log(currPlayer);
  return cell;



}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  console.log(`X is ${x}`);

  console.log(`Event-target is ${evt.target}`);
  console.log(evt.target);
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  console.log(`This is Y ${y}`);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  //updated in-memory board in the placeInTable() function
  placeInTable(y, x);



  if (board[y][x] === value) {
    if (currPlayer == 1) {


      board[y][x] = currPlayer;
      console.log(board[y][x]);

      currPlayer = 2;


    } else {
     
      board[y][x] = currPlayer;

      currPlayer = 1;
    }
  }



  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  /**NEED TO COME BACK TO THIS */
  board.every(val => {
    if (val == 1 || val == 2) {
      endGame();
    }
  });


  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    //the current play just filled all the boxes so return all the boxes and the one that was just filled
    return cells.every( //basically saying, return the entire board.
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  //Checking to see if four of the same color connects horizonatally, vertically, diagnonally - right and left
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
