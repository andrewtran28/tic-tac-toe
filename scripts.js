//global variables that will eventually be put in a factory
const rows = 3;
const columns = 3;
const board = [];
const grid = new Array(9);
let turns = 0;
let activePlayer = 0;
let row, col;

function initializeBoard() {
    turns = 0;
    activePlayer = 0;
    let index = 0;
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = "-";
            grid[index] = {
                row: `${[i]}`,
                col: `${[j]}`
            }
            index++;
        }
    }
}

//function for printing game to console (Will change to UI after functioning)
function printBoard() {
    let print = "";

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            print += board[i][j] + " ";
        }
        print += "\n";
    }
    console.log(print);
}

function createPlayer (name, firstPlayer) {
    let marker;
    firstPlayer ? marker = "O" : marker = "X";
    console.log(name + ": " + marker);

    return {name, marker};
}

function roundStart(){
    initializeBoard();
}

function chooseSpace() {
    activePlayer ? marker = "X" : marker = "O";

    let space = window.prompt("You are " + marker +". Pick a space (Number between 1-9).");
    checkSpace(marker, space);

}

function checkSpace(marker, space) {
    space -= 1;
    // if (space === "-") {
        board[grid[space].row][grid[space].col] = marker;
        console.log("THIS IS YOUR MARKER: " + board[grid[space].row][grid[space].col])
        printBoard();
    // }

}

function checkWin() {
    if (turn >4 && turn <=9) {
    }
}

player1 = createPlayer("Player1", 1);
player2 = createPlayer("Player2", 0);
initializeBoard();
printBoard();

chooseSpace();

// console.log(grid);
// console.log(grid[4].column);
