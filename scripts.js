const GameBoard = (() => {

    const gameCont = document.querySelector(".game-container");
    const roundScore = document.querySelector("#round");
    const player1Score = document.querySelector("#player1");
    const player2Score = document.querySelector("#player2");
    const gameMessage = document.querySelector(".game-message");
    const btn_continue = document.querySelector(".continue");
    const dialog_gameEnd = document.querySelector(".game-end");
    const gameEndMsg = document.querySelector(".game-end-msg");
    const btn_reset = document.querySelector("#reset-button");
    const btn_name = document.querySelector("#name-button");
    const dialog_name = document.querySelector(".name-change");
    const form = document.querySelector(".name-form");

    let board = new Array(9);
    let activePlayer = 0; //Player1 starts if '0'
    let round =  1;

    //Player factory, need to update to prompt for name in a form.
    const Player = (name, score) => {
        return {name, score};
    }

    player1 = Player("Player 1", 0);
    player2 = Player("Player 2", 0);

    const initializeGameBoard = () => {
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

    const getGameBoard = () => {
        gameCont.innerHTML = "";
        board.forEach((item, index) => {
            const cell = document.createElement("div");
            cell.classList.add('cell');
            cell.textContent = item;
            cell.id = index;
            cell.addEventListener("click", addMarker);
            gameCont.appendChild(cell);
        });
    }

    const addMarker = (e) => {
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
                gameEndMsg.textContent = player1.name + " wins this round!"
                dialog_gameEnd.showModal();
                player1.score++;
            }
    
            else if (activePlayer == 1) {
                gameEndMsg.textContent = player2.name + " wins this round!"
                dialog_gameEnd.showModal();
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
            dialog_gameEnd.showModal();
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
        dialog_gameEnd.close();
        dialog_name.close();
    });

    btn_name.addEventListener("click", () => {
        dialog_name.showModal();
    });

    btn_reset.addEventListener("click", () => {
        console.log("TEST");
        player1.score = 0;
        player2.score = 0;
        round = 1;
        scoreboard();
        initializeGameBoard();
        getGameBoard();
    });

    form.addEventListener("submit", () => {
        const player1_input = document.querySelector("#player1-name").value;
        const player2_input = document.querySelector("#player2-name").value;

        if (player1_input != "" && player2_input != "") {
            player1.name = player1_input;
            player2.name = player2_input;

            if (activePlayer == 0) {
                message("It is " + player1.name + "'s turn.");
            }
    
            else if (activePlayer == 1) {
                message("It is " + player2.name + "'s turn.");
            }

            scoreboard();
        }
    });

    return {initializeGameBoard, getGameBoard}
})();

const DOMController = (() => {

})(GameBoard);

GameBoard.initializeGameBoard();
GameBoard.getGameBoard();