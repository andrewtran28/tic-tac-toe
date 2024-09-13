//global variables that will eventually be put in a factory
const rows = 3;
const columns = 3;
const gameboard = [];
const gameIndex = new Array(9);
let turns = 0;
let activePlayer = 0;
let row, column;

function initializeBoard() {
    turns = 0;
    activePlayer = 0;
    let index = 0;
    for (let i = 0; i < rows; i++) {
        gameboard[i] = [];
        for (let j = 0; j < columns; j++) {
            gameboard[i][j] = "-";
            gameIndex[index] = {
                row: `${[i]}`,
                column: `${[j]}`
            }
            index++;
        }
    }
}

//function fro printing game to console (Will change to UI after functioning)
function printBoard() {
    let print = "";

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            print += gameboard[i][j] + " ";
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
    //check whose turn, then they will select spot (change marker)
    //check if spot is available to place (if not, do nothing and still their turn)
    //place spot, check for winning condition (or tie); turn++, switch player

    activePlayer ? marker = "X" : marker = "O";

    let space = window.prompt("You are " + marker +". Pick a space (Number between 1-9).");
    checkSpace(marker, space);

}

function checkSpace(marker, space) {
    space -= 1;
    // if (space === "-") {
        gameboard[gameIndex[space].row][gameIndex[space].column] = marker;
        console.log("THIS IS THE MARKER YOU CHOSE: " + gameboard[gameIndex[space].row][gameIndex[space].column])
        printBoard();
    // }

}

player1 = createPlayer("Player1", 1);
player2 = createPlayer("Player2", 0);
initializeBoard();
printBoard();

chooseSpace();

// console.log(gameIndex);
// console.log(gameIndex[4].column);
