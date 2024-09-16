const createGameBoard = (() => {
    const gameCont = document.querySelector(".game-container");
    const roundScore = document.querySelector("#round");
    const player1Score = document.querySelector("#player1");
    const player2Score = document.querySelector("#player2");
    const gameMessage = document.querySelector(".game-message");
    const btn_continue = document.querySelector(".continue");
    const gameEnd = document.querySelector(".game-end");
    const gameEndMsg = document.querySelector(".game-end-msg");
    const btn_reset = document.querySelector("#reset");
    const form = document.querySelector(".form");
    const btn_name = document.querySelector(".nameButton");

    let board = new Array(9);
    let activePlayer = 0; //Player1 starts if true
    let round =  1;
    let gameOver = false;

    //Player factory, need to update to prompt for name in a form.
    const Player = (name, score) => {
        return {name, score};
    }

    player1 = Player("Player 1", 0);
    player2 = Player("Player 2", 0);

    const initializeGameBoard = () => {                     //"startGameBoard"
        scoreboard();
        activePlayer = 0;
        marker = "X";
        message("It is " + player1.name + "'s turn.");
        gameOver = false;
        
        board = new Array(9);
        for (let i = 0; i < board.length; i++) {
            board[i] = " ";
        }
    }

    const getGameBoard = () => {                          //"showGameBoard"
        gameCont.innerHTML = "";
        board.forEach((item, index) => {                  //need to reference player.marker here
            const cell = document.createElement("div");
            cell.classList.add('cell');
            cell.textContent = item;
            cell.id = index;
            cell.addEventListener("click", addMarker);
            gameCont.appendChild(cell);
        });
    }

    const addMarker = (e) => {                               //"scrnUpdate"
            let id = e.target.id;
            if (board[id] == " ") {
                board[id] = marker;
                getGameBoard();
                checkWin();
            }
    }

    const switchPlayer = () => {
        if (activePlayer == 0) {
            activePlayer = 1
            marker = "O";
            message("It is " + player2.name + "'s turn.");
        }

        else if (activePlayer == 1) {
            activePlayer = 0
            marker = "X"
            message("It is " + player1.name + "'s turn.");
        }
    }

    const checkWin = () => {
        if  ((board[0] !== " " && board[0] == board[1] && board[1] == board[2] ) ||
        (board[3] !== " " && board[3] == board[4] && board[4] == board[5] ) ||
        (board[6] !== " " && board[6] == board[7] && board[7] == board[8] ) ||
        (board[0] !== " " && board[0] == board[3] && board[3] == board[6] ) ||
        (board[1] !== " " && board[1] == board[4] && board[4] == board[7] ) ||
        (board[2] !== " " && board[2] == board[5] && board[5] == board[8] ) ||
        (board[0] !== " " && board[0] == board[4] && board[4] == board[8] ) ||
        (board[2] !== " " && board[2] == board[4] && board[4] == board[6] )) {
            
            if (activePlayer == 0) {
                message(player1.name + " wins this round!");
                gameEndMsg.textContent = player1.name + " wins this round!"
                gameEnd.showModal();
                player1.score++;
            }
    
            else if (activePlayer == 1) {
                message(player2.name + " wins this round!");
                gameEndMsg.textContent = player2.name + " wins this round!"
                gameEnd.showModal();
                player2.score++;
            }

            round++;
            scoreboard();
            initializeGameBoard();
            getGameBoard();
        }

        else if (!board.includes(" ")) {
            message("Tie!");
            gameEndMsg.textContent = "It's a tie!"
            gameEnd.showModal();
            round++;
            scoreboard();
            initializeGameBoard();
            getGameBoard();
        }

        else {
            switchPlayer();
        }
    };

    const scoreboard = () => {
        roundScore.textContent = "Round: " + round;
        player1Score.textContent = player1.name + ": " + player1.score;
        player2Score.textContent = player2.name + ": " + player2.score;
    }

    const message = (msg) => {
        gameMessage.textContent = msg;
    }

    btn_continue.addEventListener("click", () => {
        gameEnd.close();
    });

    btn_reset.addEventListener("click", () => {
        player1.score = 0;
        player2.score = 0;
        round = 1;
        scoreboard();
        initializeGameBoard();
        getGameBoard();
    });

    return {initializeGameBoard, getGameBoard}
})();

createGameBoard.initializeGameBoard();
createGameBoard.getGameBoard();

// //Player factory, need to update to prompt for name in a form.
// const Player = (name, marker) => {
//     return {name, marker};
// }
// const player1 = Player("Player 1", "X");
// const player2 = Player("Player 2", "O");

// //Gameboard module which contains all functions for controlling the board
// const Gameboard = (() => {
//     const row = 3;
//     let board = new Array(9);

//     const getBoard = () => board;

//     const resetBoard = () => {
//         board = Array.from({length: 9}, () => Array(9).fill(' '));
//     };

//     const addMarker = (marker, space) => {
//         if (board[space] === " ") {
//             board[space] = marker;
//             return true;
//         }

//         return false;
//     }

//     return {getBoard, resetBoard, addMarker};
// })();

// //DOM controller module which contains all functions that manipulate the DOM
// const DOMController = ((gameboard) => {
//     const boardElement = document.getElementById("game-board");
//     const message = document.getElementById("message");

//     const initializeBoard = (game) => {
//         const board = gameboard.getBoard();

//         boardElement.innerhtml = "";

//         for (let i = 0; i < board.length; i++) {
//                 const cell = document.createElement('div');
//                 cell.classList.add('cell');
//                 // cell.dataset.row = i;
//                 cell.addEventListener('click', () => game.playTurn(i));
//                 cell.textContent = i;
//                 boardElement.appendChild(cell);
//         }
//     }

//     const updateBoard = (space, marker) => {
//         const cell = boardElement.querySelector(".cell");
//         cell.textContent = marker;
//     }

//     const setMessage = (message) => {
//         message.textContent = message;
//     }

//     const resetButton = (game) => {
//         const btn_reset = document.querySelector("#reset-button");

//         btn_reset.addEventListener("click", () => game.resetGame());
//     }

//     return {initializeBoard, updateBoard, setMessage, resetButton};

// })(Gameboard);

// //Game controller module which contains all functions for controlling the gameflow
// const GameController = ((player1, player2, gameboard, domController) => {
//     let activePlayer = player1; //Initialize activePlayer as the first player.
//     let gameOver = false;

//     const switchPlayer = () => {
//         activePlayer === player1 ? activePlayer = player2 : activePlayer = player1;
//     }

//     const checkWin = (board, marker) => {
//         if  ((board[0] !== " " && board[0] == board[1] && board[1] == board[2] ) ||
//         (board[3] !== " " && board[3] == board[4] && board[4] == board[5] ) ||
//         (board[6] !== " " && board[6] == board[7] && board[7] == board[8] ) ||
//         (board[0] !== " " && board[0] == board[3] && board[3] == board[6] ) ||
//         (board[1] !== " " && board[1] == board[4] && board[4] == board[7] ) ||
//         (board[2] !== " " && board[2] == board[5] && board[5] == board[8] ) ||
//         (board[0] !== " " && board[0] == board[4] && board[4] == board[8] ) ||
//         (board[2] !== " " && board[2] == board[4] && board[4] == board[6] )) {
//             return true;
//         }

//         else if (!board.includes(" ")) {
//             return true;
//         }

//         else {
//             return false;
//         }
//     };

//     const checkTie = (board, marker) => {
//         if (!board.includes(" ")) {
//             return true;
//         }
//     };

//     const playTurn = (space) => {
//         if (gameOver) return;

//         if (gameboard.addMarker(activePlayer.marker, space)) {
//             const board = gameboard.getBoard();

//             domController.updateBoard(activePlayer.marker, space)

//             if (checkWin(board, activePlayer.marker)) {
//                 domController.setMessage(`${activePlayer.name} wins!`)
//                 gameOver = true;
//                 return;
//             }

//             if (checkTie(board, activePlayer.marker)) {
//                 domController.setMessage("It's a tie!")
//                 gameOver = true;
//                 return;

//             }

//             switchPlayer();
//             domController.setMessage(`It's ${currentPlayer.name}'s turn.`);
//         }
//     }

//     const resetGame = () => {
//         gameboard.resetBoard();
//         domController.initializeBoard(GameController);
//         domController.setMessage(`It's ${player1.name}'s turn`);
//         currentPlayer = player1;
//         gameOver = false;
//     }

//     return {playTurn, resetGame};

// })(player1, player2, Gameboard, DOMController);

// DOMController.initializeBoard(GameController);
// DOMController.setMessage(`It's ${player1.name} turn`);
// DOMController.resetButton(GameController);