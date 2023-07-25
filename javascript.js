const myGameboard = (() => {

    let gameboardArray = []
    let turn = true;
    let winner = "";

    const setWinner = function(marker) {
        if (marker === "x") {
            winner = player1.getName();
        } else if (marker === "o") {
            winner = player2.getName();
        }
    }

    const getWinner = function() {
        return winner;
    }

    const resetTurn = function() {
        turn = true;
    }

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
            console.log(`Tile reset`)
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

    const addButtonToTile = function () {
        for (let index in myGameboard.gameboardArray) {
            const tile = document.getElementById(`tile${index}`);
            tile.addEventListener("click", () => {
                if (myGameboard.gameboardArray[index].getTileStatus() === "") {
                    trackMove(`tile${index}`, index);
                    if (checkWin("x") || checkWin("o") || checkDraw()) {
                        console.log("Game over")
                        displayController.removeTileButtons();
                        displayController.addPlayAgainButton();
                        console.log(turn)
                    }
                    swapTurn();
                }

            });
        };
    };

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
            console.log(myGameboard.gameboardArray[index].getTileStatus())

        } else {
            myGameboard.gameboardArray[index].setToO();
            displayController.markAsO(id);
            console.log(myGameboard.gameboardArray[index].getTileStatus())
        };
    };

    const gameReset = function () {
        for (let index in myGameboard.gameboardArray) {
            displayController.resetTile(`tile${index}`);
            myGameboard.gameboardArray[index].resetTile();
        }
    };

    return { resetTurn, populateGameboard, addButtonToTile, gameReset, getWinner, gameboardArray };
})();

const displayController = (() => {
    const markAsX = function (id) {
        const tile = document.getElementById(id);
        tile.textContent = "X";
    };

    const markAsO = function(id) {
        const tile = document.getElementById(id);
        tile.textContent = "O";
    };

    const resetTile = function(id) {
        const tile = document.getElementById(id);
        tile.textContent = "";
    };

    const showDraw = function() {
        const gameContainer = document.querySelector(".gameContainer");
        const drawMessage = document.createElement("h1")
        drawMessage.textContent = "It's a draw!";
        gameContainer.appendChild(drawMessage);
    };

    const addPlayAgainButton = function() {
        const gameContainer = document.querySelector(".gameContainer");
        const button = document.createElement("button");
        button.textContent = "Play again";
        const message = document.querySelector("h1");
        const player1Label = document.getElementById("player1");
        const player2Label = document.getElementById("player2");

        button.addEventListener("click", () => {
            myGameboard.gameReset();
            myGameboard.addButtonToTile();
            gameContainer.removeChild(button);
            gameContainer.removeChild(player1Label);
            gameContainer.removeChild(player2Label);
            gameContainer.removeChild(message);
            
            myGameboard.resetTurn();
            nameSetup();
        });

        gameContainer.appendChild(button);
    };

    const removeTileButtons = function() {
        for (let index in myGameboard.gameboardArray) {
            const gridContainer = document.querySelector(".gridContainer");
            const tile = document.getElementById(`tile${index}`);
            const newTile = tile.cloneNode(true);
            gridContainer.replaceChild(newTile, tile);
        }

    };

    const addPlayerNames = function() {
        const gameContainer = document.querySelector(".gameContainer");
        const player1Label = document.createElement("p");
        const player2Label = document.createElement("p");
        player1Label.textContent = `${player1.getName()} = X`
        player2Label.textContent = `${player2.getName()} = O`
        player1Label.setAttribute("id", "player1");
        player2Label.setAttribute("id", "player2");

        gameContainer.appendChild(player1Label);
        gameContainer.appendChild(player2Label);
    }

    const showWinner = function() {
        const gameContainer = document.querySelector(".gameContainer");
        const winMessage = document.createElement("h1");
        winMessage.textContent = `${myGameboard.getWinner()} has won!`;
        gameContainer.appendChild(winMessage);
    }

    return { markAsX, markAsO, resetTile, showDraw, showWinner, addPlayAgainButton, removeTileButtons, addPlayerNames };
})();

const createPlayer = (num, marker) => {

    let name = "";

    const setName = function() {
        name = prompt("Enter your name:")
        if (!name) {
            name = `Player ${num}`
        }
    }

    const getName = function() {
        return name
    };
    const getMarker = function() {
        return marker;
    }
    return { getName, getMarker, setName };
};

function nameSetup() {
    player1.setName()
    player2.setName()
    displayController.addPlayerNames()
}

const player1 = createPlayer(1, "x");
const player2 = createPlayer(2, "o");

nameSetup();
myGameboard.populateGameboard();
myGameboard.addButtonToTile()



