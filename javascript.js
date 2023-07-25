const createPlayer = (num) => {

    let name = "";

    const setName = function () {
        name = prompt("Enter your name:")
        if (!name) {
            name = `Player ${num}`;
        };
    };

    const getName = function () {
        return name;
    };
    return { getName, setName };
};

const playerSetup = (() => {
    const player1 = createPlayer(1);
    const player2 = createPlayer(2);

    return { player1, player2 }
})();


const myGameboard = (() => {

    let gameboardArray = []

    const createGridTile = function () {
        let tileStatus = "";

        const setToX = function () {
            tileStatus = "x";
        }

        const setToO = function () {
            tileStatus = "o";
        }

        const resetTile = function () {
            tileStatus = "";
        }

        const getTileStatus = function () {
            return tileStatus;
        }

        return { setToX, setToO, resetTile, getTileStatus }
    }

    const populateGameboard = function () {
        for (let i = 1; i <= 9; i++) {
            gameboardArray.push(createGridTile())
        };
    };




    return { populateGameboard, gameboardArray };
})();

const gameLogic = (() => {
    let winner = "";
    let turn = true;

    const setWinner = function (marker) {
        if (marker === "x") {
            winner = playerSetup.player1.getName();
        } else if (marker === "o") {
            winner = playerSetup.player2.getName();
        }
    }

    const getWinner = function () {
        return winner;
    }

    const resetTurn = function () {
        turn = true;
    }

    const checkWin = function (marker) {
        let resultsArray = [];
        for (let tile of myGameboard.gameboardArray) {
            resultsArray.push(tile.getTileStatus())
        }

        if ((resultsArray[0] == marker && resultsArray[1] == marker && resultsArray[2] == marker)
            || (resultsArray[3] == marker && resultsArray[4] == marker && resultsArray[5] == marker)
            || (resultsArray[6] == marker && resultsArray[7] == marker && resultsArray[8] == marker)) {
            setWinner(marker)
            displayController.showWinner();
            return true;
        } else if ((resultsArray[0] == marker && resultsArray[3] == marker && resultsArray[6] == marker)
            || (resultsArray[1] == marker && resultsArray[4] == marker && resultsArray[7] == marker)
            || (resultsArray[2] == marker && resultsArray[5] == marker && resultsArray[8] == marker)) {
            setWinner(marker)
            displayController.showWinner();
            return true;
        } else if ((resultsArray[0] == marker && resultsArray[4] == marker && resultsArray[8] == marker)
            || (resultsArray[2] == marker && resultsArray[4] == marker && resultsArray[6] == marker)) {
            setWinner(marker)
            displayController.showWinner();
            return true;
        }

    };

    const checkDraw = function () {
        let counter = 0
        for (let tile of myGameboard.gameboardArray) {
            if (tile.getTileStatus() != "") {
                counter++
            }
        }

        if (counter == 9) {
            displayController.showDraw();
            return true;
        }
    };

    const swapTurn = function () {
        turn = !turn;
    };

    const trackMove = function (id, index) {
        if (turn) {
            myGameboard.gameboardArray[index].setToX();
            displayController.markAsX(id)

        } else {
            myGameboard.gameboardArray[index].setToO();
            displayController.markAsO(id);
        };
    };

    const gameReset = function () {
        for (let index in myGameboard.gameboardArray) {
            displayController.resetTile(`tile${index}`);
            myGameboard.gameboardArray[index].resetTile();
        }
    };

    const nameSetup = function () {
        playerSetup.player1.setName()
        playerSetup.player2.setName()
        displayController.addPlayerNames()
    };

    return { getWinner, resetTurn, checkWin, checkDraw, swapTurn, trackMove, gameReset, nameSetup }
})();

const displayController = (() => {
    const markAsX = function (id) {
        const tile = document.getElementById(id);
        tile.textContent = "X";
    };

    const markAsO = function (id) {
        const tile = document.getElementById(id);
        tile.textContent = "O";
    };

    const resetTile = function (id) {
        const tile = document.getElementById(id);
        tile.textContent = "";
    };

    const showDraw = function () {
        const gameContainer = document.querySelector(".gameContainer");
        const drawMessage = document.createElement("h1")
        drawMessage.textContent = "It's a draw!";
        gameContainer.appendChild(drawMessage);
    };

    const addPlayAgainButton = function () {
        const gameContainer = document.querySelector(".gameContainer");
        const button = document.createElement("button");
        button.textContent = "Play again";
        const message = document.querySelector("h1");
        const player1Label = document.getElementById("player1");
        const player2Label = document.getElementById("player2");

        button.addEventListener("click", () => {
            gameLogic.gameReset();
            addButtonToTile();
            gameContainer.removeChild(button);
            gameContainer.removeChild(player1Label);
            gameContainer.removeChild(player2Label);
            gameContainer.removeChild(message);

            gameLogic.resetTurn();
            gameLogic.nameSetup();
        });

        gameContainer.appendChild(button);
    };

    const removeTileButtons = function () {
        for (let index in myGameboard.gameboardArray) {
            const gridContainer = document.querySelector(".gridContainer");
            const tile = document.getElementById(`tile${index}`);
            const newTile = tile.cloneNode(true);
            gridContainer.replaceChild(newTile, tile);
        }

    };

    const addPlayerNames = function () {
        const gameContainer = document.querySelector(".gameContainer");
        const player1Label = document.createElement("p");
        const player2Label = document.createElement("p");
        player1Label.textContent = `${playerSetup.player1.getName()} = X`
        player2Label.textContent = `${playerSetup.player2.getName()} = O`
        player1Label.setAttribute("id", "player1");
        player2Label.setAttribute("id", "player2");

        gameContainer.appendChild(player1Label);
        gameContainer.appendChild(player2Label);
    }

    const showWinner = function () {
        const gameContainer = document.querySelector(".gameContainer");
        const winMessage = document.createElement("h1");
        winMessage.textContent = `${gameLogic.getWinner()} has won!`;
        gameContainer.appendChild(winMessage);
    }

    const addButtonToTile = function () {
        for (let index in myGameboard.gameboardArray) {
            const tile = document.getElementById(`tile${index}`);
            tile.addEventListener("click", () => {
                if (myGameboard.gameboardArray[index].getTileStatus() === "") {
                    gameLogic.trackMove(`tile${index}`, index);
                    if (gameLogic.checkWin("x") || gameLogic.checkWin("o") || gameLogic.checkDraw()) {
                        displayController.removeTileButtons();
                        displayController.addPlayAgainButton();
                    }
                    gameLogic.swapTurn();
                }

            });
        };
    };


    return { markAsX, markAsO, resetTile, showDraw, showWinner, addButtonToTile, addPlayAgainButton, removeTileButtons, addPlayerNames };
})();

const startGame = (() => {

    gameLogic.nameSetup();
    myGameboard.populateGameboard();
    displayController.addButtonToTile()

})();









