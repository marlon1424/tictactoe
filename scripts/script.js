const Player = (name, marker, turn) => {
    const playerName = name;
    const playerMarker = marker;
    const playerTurn = turn;
    return {playerName, playerMarker, playerTurn};
}

const playerOne = Player('Player One', 'X', true);
const playerTwo = Player('Player Two', 'O', false);

const GameBoard = (function(doc, playerOneMarker, playerTwoMarker, playerOneTurn, playerTwoTurn){
    const gameBoard = [null, null, null, null, null, null, null, null, null];
    const gridSpaces = doc.querySelectorAll('div[data-grid]');
    const playerPrompt = doc.getElementById('playerPrompt');
    const message = doc.getElementById('message');
    playerPrompt.innerHTML = "Player One's Turn";
    let gameWon = false;

    return {gameBoard, gridSpaces, playerPrompt, message, gameWon};
})(document, playerOne.playerMarker, playerTwo.playerMarker, playerOne.playerTurn, playerTwo.playerTurn);


const RunGame = (function(gameBoard, playerOneMarker, playerTwoMarker, playerOneTurn, playerTwoTurn, gridSpaces, playerPrompt, message, gameWon) {
    let playerOneWin = false;
    let playerTwoWin = false;

    const winningCombinations = [
        [0, 1, 2], //first row
        [3, 4, 5], //second row
        [6, 7, 8], //third row
        [0, 3, 6], //first column
        [1, 4, 7], //second column
        [2, 5, 8], //third column
        [0, 4, 8], //diagonal from top-left to bottom-right
        [2, 4, 6] //diagonal from top-right to bottom-left
    ];

    const checkForWin = (playerMarker) => {
        for (let combination of winningCombinations){
            const [pos1, pos2, pos3] = combination;
            if(gameBoard[pos1] === playerMarker && gameBoard[pos2] === playerMarker && gameBoard[pos3] === playerMarker) {
                return true;
            }
        }
        return false;
    };


    const checkForTie = () => {
        return gameBoard.filter((value) => value !== null).length === gameBoard.length;
    };


   const playGame = () => {
    gridSpaces.forEach((gridSpace, index) => {
        gridSpace.setAttribute('id', 'gridSpace');
        gridSpace.addEventListener('click', () => {
            if (gameWon){
                return;
            }

            const gridLocation = parseInt(gridSpace.getAttribute('data-grid'), 10);
            if (playerOneTurn === true){
                playerPrompt.innerHTML = "Player Two's Turn";
                if (gridSpace.innerHTML === ""){
                    message.innerHTML = '';
                    gameBoard.splice(gridLocation, 1, playerOneMarker);
                    gridSpace.innerHTML = gameBoard[gridLocation];
                } else{
                    message.innerHTML = "A player has already played in that location";
                }
                playerOneTurn = false;
                playerTwoTurn = true;
                if(checkForWin(playerOneMarker)){
                    playerPrompt.innerHTML = '';
                    message.innerHTML = 'Player One has won the game!';
                    gameWon = true;
                } else if(checkForTie()){
                    playerPrompt.innerHTML = '';
                    message.innerHTML = 'The game is tied.';
                    gameWon = true;
                }
            } else {
                playerPrompt.innerHTML = "Player One's Turn";
                if (gridSpace.innerHTML === ""){
                    message.innerHTML = '';
                    gameBoard.splice(gridLocation, 1, playerTwoMarker);
                    gridSpace.innerHTML = gameBoard[gridLocation];
                } else{
                    message.innerHTML = "A player has already played in that location";
                }
                playerTwoTurn = false;
                playerOneTurn = true;
                if(checkForWin(playerTwoMarker)){
                    playerPrompt.innerHTML = '';
                    message.innerHTML = 'Player Two has won the game!';
                    gameWon = true;
                } else if(checkForTie()){
                    playerPrompt.innerHTML = '';
                    message.innerHTML = 'The game is tied.';
                    gameWon = true;
                }
            }
        });
    });
   };
   return {playGame};
})(GameBoard.gameBoard, playerOne.playerMarker, playerTwo.playerMarker, playerOne.playerTurn, playerTwo.playerTurn,
    GameBoard.gridSpaces, GameBoard.playerPrompt, GameBoard.message, GameBoard.gameWon);


RunGame.playGame();


