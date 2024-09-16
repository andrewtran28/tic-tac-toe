//Player factory, need to update to prompt for name in a form.
const Player = (name, marker) => {
    return {name, marker};
}
const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

//Gameboard module which contains all functions for controlling the board
const Gameboard = (() => {
    const row = 3;
    let board = new Array(9);

    const getBoard = () => board;

    const resetBoard = () => {
        board = Array.from({length: 9}, () => Array(9).fill(' '));
    };

    const addMarker = (marker, space) => {
        if (board[space] === "-") {
            board[space] = marker;
            return true;
        }

        return false;
    }

    return {getBoard, resetBoard, addMarker};
})();

//DOM controller module which contains all functions that manipulate the DOM
const DOMController = ((gameboard) => {
    const boardElement = document.getElementById("game-board");
    const message = document.getElementById("message");

    const initializeBoard = (game) => {
        const board = gameboard.getBoard();

        boardElement.innerhtml = "";

        for (let i = 0; i < board.length; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                // cell.dataset.row = i;
                cell.addEventListener('click', () => game.playTurn(i));
                cell.textContent = i;
                boardElement.appendChild(cell);
        }
    }

    const updateBoard = (space, marker) => {
        const cell = boardElement.querySelector(".cell");
        cell.textContent = marker;
    }

    const setMessage = (message) => {
        message.textContent = message;
    }

    const resetButton = (game) => {
        const btn_reset = document.querySelector("#reset-button");

        btn_reset.addEventListener("click", () => game.resetGame());
    }

    return {initializeBoard, updateBoard, setMessage, resetButton};

})(Gameboard);

//Game controller module which contains all functions for controlling the gameflow
const GameController = ((player1, player2, gameboard, domController) => {
    let activePlayer = player1; //Initialize activePlayer as the first player.
    let gameOver = false;

    const switchPlayer = () => {
        activePlayer === player1 ? activePlayer = player2 : activePlayer = player1;
    }

    const checkWin = (board, marker) => {
        if  ((board[0] !== "-" && board[0] == board[1] && board[1] == board[2] ) ||
        (board[3] !== "-" && board[3] == board[4] && board[4] == board[5] ) ||
        (board[6] !== "-" && board[6] == board[7] && board[7] == board[8] ) ||
        (board[0] !== "-" && board[0] == board[3] && board[3] == board[6] ) ||
        (board[1] !== "-" && board[1] == board[4] && board[4] == board[7] ) ||
        (board[2] !== "-" && board[2] == board[5] && board[5] == board[8] ) ||
        (board[0] !== "-" && board[0] == board[4] && board[4] == board[8] ) ||
        (board[2] !== "-" && board[2] == board[4] && board[4] == board[6] )) {
            return true;
        }

        else if (!board.includes("-")) {
            return true;
        }

        else {
            return false;
        }
    };

    const checkTie = (board, marker) => {
        if (!board.includes("-")) {
            return true;
        }
    };

    const playTurn = (space) => {
        if (gameOver) return;

        if (gameboard.addMarker(activePlayer.marker, space)) {
            const board = gameboard.getBoard();

            domController.updateBoard(activePlayer.marker, space)

            if (checkWin(board, activePlayer.marker)) {
                domController.setMessage(`${activePlayer.name} wins!`)
                gameOver = true;
                return;
            }

            if (checkTie(board, activePlayer.marker)) {
                domController.setMessage("It's a tie!")
                gameOver = true;
                return;

            }

            switchPlayer();
            domController.setMessage(`It's ${currentPlayer.name}'s turn.`);
        }
    }

    const resetGame = () => {
        gameboard.resetBoard();
        domController.initializeBoard(GameController);
        domController.setMessage(`It's ${player1.name}'s turn`);
        currentPlayer = player1;
        gameOver = false;
    }

    return {playTurn, resetGame};

})(player1, player2, Gameboard, DOMController);

DOMController.initializeBoard(GameController);
DOMController.setMessage(`It's ${player1.name} turn`);
DOMController.resetButton(GameController);