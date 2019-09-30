var refBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, null]
    // [13, 14, 15, null]
];

var getBoardWithSquaresSwapped = function(squareNumber, board) {
    var emptSqLoc = getEmptySquareLocation(board);
    var currSqLoc = getCurrentSquareLocation(squareNumber, board);

    var emptSqLocX = emptSqLoc[0];
    var emptSqLocY = emptSqLoc[1];
    var currSqLocX = currSqLoc[0];
    var currSqLocY = currSqLoc[1];

    board[emptSqLocX][emptSqLocY] = squareNumber;
    board[currSqLocX][currSqLocY] = null;

    return board;
};

var getCurrentSquareLocation = function(squareNumber, board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === squareNumber) {
                return [i, j];
            }
        }
    }
};

var getEmptySquareLocation = function(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === null) {
                return [i, j];
            }
        }
    }
};

var checkMovableSquare = function(squareNumber, board) {
    var emptSqLoc = getEmptySquareLocation(board);
    var currSqLoc = getCurrentSquareLocation(squareNumber, board);
    var emptSqLocX = emptSqLoc[0];
    var emptSqLocY = emptSqLoc[1];
    var currSqLocX = currSqLoc[0];
    var currSqLocY = currSqLoc[1];

    if (emptSqLocX === currSqLocX && (emptSqLocY === currSqLocY + 1 || emptSqLocY === currSqLocY - 1)) {
        return true;
    } else if (emptSqLocY === currSqLocY && (emptSqLocX === currSqLocX + 1 || emptSqLocX === currSqLocX - 1)) {
        return true;
    } else {
        return false;
    }
};

var getMovedBoard = function(squareNumber, board) {

    if (squareNumber) {
        var isMovableSquare = checkMovableSquare(squareNumber, board);
        if (isMovableSquare) {
            var movedBoard = getBoardWithSquaresSwapped(squareNumber, board);
            return movedBoard;
        } else {
            return board;
        }
    } else {
        return board;
    }
};


var getRefBoard = function() {
    var board = [];
    board = refBoard.map(row => row.slice());

    return board;
};

var checkWinState = function(board) {
    var refBoard = getRefBoard();
    var currBoardString = board.toString();
    var refBoardString = refBoard.toString();

    if (currBoardString === refBoardString) {
        return true;
    }
};

var handleSquareClick = function(event, board) {
    var squareNumber = parseInt(event.target.innerText);

    var movedBoard = getMovedBoard(squareNumber, board);

    renderBoard(movedBoard);

    var hasWon = checkWinState(board);
    if (hasWon) {
        setTimeout(function() { alert("You Won!"); }, 0);
    }
};

var renderBoard = function(board) {
    var boardDiv = document.createElement("div");
    boardDiv.classList.add("board");

    for (var i = 0; i < board.length; i++) {
        var rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        for (var j = 0; j < board[0].length; j++) {
            var squareDiv = document.createElement("div");
            squareDiv.classList.add("square");
            squareDiv.innerText = board[i][j];
            squareDiv.addEventListener("click", function(event) {
                handleSquareClick(event, board);
            });
            rowDiv.appendChild(squareDiv);
        }
        boardDiv.appendChild(rowDiv);
    }

    var interfaceDiv = document.querySelector(".interface");
    interfaceDiv.innerHTML = "";

    var restartButton = document.createElement("button");
    restartButton.innerText = "Restart";
    restartButton.id = "restart-game-btn";
    restartButton.addEventListener("click", startNewGame);

    interfaceDiv.appendChild(boardDiv);
    interfaceDiv.appendChild(restartButton);
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getScrambledBoard = function(startingBoard) {
    var boardSize = startingBoard.length;
    var randomSquareNumber = getRandomInt(1, (startingBoard.length * startingBoard[0].length) - 1);
    var scrambledBoard = getMovedBoard(randomSquareNumber, startingBoard);

    for (var i = 0; i < 500; i++) {
        randomSquareNumber = getRandomInt(1, (startingBoard.length * startingBoard[0].length) - 1);
        scrambledBoard = getMovedBoard(randomSquareNumber, scrambledBoard);
    }

    return scrambledBoard;
};

// set up a new game
var startNewGame = function() {
    var startingBoard = getRefBoard();
    var scrambledBoard = getScrambledBoard(startingBoard);
    renderBoard(scrambledBoard);
};

var newGameBtn = document.querySelector("#new-game-btn");
newGameBtn.addEventListener("click", startNewGame);