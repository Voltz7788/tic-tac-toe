const myGameboard = (() => {

    let gameboardArray = []

    // const getGameboardArray = () => {
    //     return gameboardArray;
    // }

    const createGridTile = () => {
        tileStatus = "";

        const setToPlayer1 = function () {
            tileStatus = "p1";
            console.log(`Tile set to: ${tileStatus}`)
        }

        const setToPlayer2 = function () {
            tileStatus = "p2";
            console.log(`Tile set to: ${tileStatus}`)
        }

        const resetTile = function () {
            tileStatus = "";
            console.log(`Tile reset`)
        }

        return { setToPlayer1, setToPlayer2, resetTile }
    }

    const populateGameboard = () => {
        for (let i = 1; i <= 9; i++) {
            gameboardArray.push(createGridTile())
        };
    };

    return { populateGameboard, gameboardArray };
})();

const createPlayer = (name, marker) => {

    const getName = () => name;
    const getMarker = () => marker;
    return { getName, getMarker };
};

const player1 = createPlayer("Yannis", "x");
const player2 = createPlayer("Andy", "o");


