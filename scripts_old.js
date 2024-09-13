//Gameboard Factory Function
function Gameboard() {
    const rows = 3;
    const columns = 3;
    const gameboard = [];

    for (let i = 0; i < rows; i++) {
        gameboard[i] = [];
        for (let j = 0; j < columns; j++) {
            gameboard[i][j] = Cell.getValue;
        }
    }

    console.log("This is cell: " + Cell());
    const getBoard = () => gameboard;

    const placeMark = (rows, columns, player) => {
        const availableCell = gameboard[row][column].getValue() === 0;
        if (availableCells != 0) return;

        else {
            gameboard[row][column].addToken(player);
        }
    }

    const printBoard = () => {
        const boardWithCellValues = gameboard.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

    console.log(gameboard);
    
    return {getBoard, placeMark, printBoard}
}

function Cell() {
    let value = 0;
  
    const addMarker = (player) => {
      value = player;
    };
  
    const getValue = () => value;
    console.log("====The value is: " + getValue());
  
    return {
      addMarker,
      getValue
    };
  }

function GameController(player1, player2) {
    const board = Gameboard();

    const players = [
        createPlayer("minglee", 1),
        createPlayer("Player Two", 0)
    ];

    let activePlayer = players[0];
}

//createPlayer factory function
function createPlayer (name, firstPlayer) {
    let marker;
    firstPlayer ? marker = "O" : marker = "X";

    console.log(name + ": " + marker);

    return { name, firstPlayer, marker};
}

Gameboard();