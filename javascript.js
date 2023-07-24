const myGameboard = (() => {

    let gameboardArray = []
    let turn = true;

    const createGridTile = () => {
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

        const getTileStatus = function() {
            return tileStatus;
        }

        return { setToX, setToO, resetTile, getTileStatus }
    }

    const populateGameboard = () => {
        for (let i = 1; i <= 9; i++) {
            gameboardArray.push(createGridTile())
        };
    };

    function addButtonToTile() {
        for (let index in myGameboard.gameboardArray) {
            const tile = document.getElementById(`tile${index}`);
            tile.addEventListener("click", () => {
                console.log(`tile${index}`);
                console.log(turn);

                if (myGameboard.gameboardArray[index].getTileStatus() === "") {
                    markTile(`tile${index}`, index);
                    swapTurn();
                }
                
            });
        };
    };

    function swapTurn() {
        turn = !turn;
    }

    function markTile(id, index) {
        const tile = document.getElementById(id)
            if (turn) {
                myGameboard.gameboardArray[index].setToX();
                tile.textContent = "X";
                console.log(myGameboard.gameboardArray[index].getTileStatus())
                
            } else {
                myGameboard.gameboardArray[index].setToO();
                tile.textContent = "O";
                console.log(myGameboard.gameboardArray[index].getTileStatus())
            }; 
    }

    return { populateGameboard, addButtonToTile, gameboardArray };
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