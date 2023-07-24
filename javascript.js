const myGameboard = (() => {

    let gameboardArray = []
    let turn = true;

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
                    }
                    // checkWin("x");
                    // checkWin("o");
                    // checkDraw();
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

        // Check horizontal win
        if ((resultsArray[0] == marker && resultsArray[1] == marker && resultsArray[2] == marker)
            || (resultsArray[3] == marker && resultsArray[4] == marker && resultsArray[5] == marker)
            || (resultsArray[6] == marker && resultsArray[7] == marker && resultsArray[8] == marker)) {
            console.log("win");
            return true;
        } else if ((resultsArray[0] == marker && resultsArray[3] == marker && resultsArray[6] == marker)
            || (resultsArray[1] == marker && resultsArray[4] == marker && resultsArray[7] == marker)
            || (resultsArray[2] == marker && resultsArray[5] == marker && resultsArray[8] == marker)) {
            console.log("win");
            return true;
        } else if ((resultsArray[0] == marker && resultsArray[4] == marker && resultsArray[8] == marker)
            || (resultsArray[2] == marker && resultsArray[4] == marker && resultsArray[6] == marker)) {
            console.log("win");
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
            console.log("draw")
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

    return { populateGameboard, addButtonToTile, gameReset, gameboardArray };
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

    const addPlayAgainButton = function() {
        const gameContainer = document.querySelector(".gameContainer");
        const button = document.createElement("button");
        button.textContent = "Play again";

        button.addEventListener("click", () => {
            myGameboard.gameReset();
            myGameboard.addButtonToTile();
            gameContainer.removeChild(button);
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

    return { markAsX, markAsO, resetTile, addPlayAgainButton, removeTileButtons };
})();

const createPlayer = (name, marker) => {

    const getName = () => name;
    const getMarker = () => marker;
    return { getName, getMarker };
};

const player1 = createPlayer("Yannis", "x");
const player2 = createPlayer("Andy", "o");








myGameboard.populateGameboard();

myGameboard.addButtonToTile()