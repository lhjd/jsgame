var refBoard = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, null],
    // [13, 14, 15, null]
];

// get the board with the empty square swapped with the current movable square
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

// get the current square location
var getCurrentSquareLocation = function(squareNumber, board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === squareNumber) {
                return [i, j];
            }
        }
    }
};

// get the location of the empty square
var getEmptySquareLocation = function(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === null) {
                return [i, j];
            }
        }
    }
};

// check if a square is movable
var checkMovableSquare = function(squareNumber, board) {
    var emptSqLoc = getEmptySquareLocation(board);
    var currSqLoc = getCurrentSquareLocation(squareNumber, board);
    var emptSqLocX = emptSqLoc[0];
    var emptSqLocY = emptSqLoc[1];
    var currSqLocX = currSqLoc[0];
    var currSqLocY = currSqLoc[1];

    // if the current square is on the left or the right side of the empty square
    if (emptSqLocX === currSqLocX && (emptSqLocY === currSqLocY + 1 || emptSqLocY === currSqLocY - 1)) {
        return true;
        // or if the current square is on the top or the bottom of the empty square
    } else if (emptSqLocY === currSqLocY && (emptSqLocX === currSqLocX + 1 || emptSqLocX === currSqLocX - 1)) {
        return true;
    } else {
        return false;
    }
};

// get board after a square is moved
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

// get reference board
var getRefBoard = function() {
    var board = [];
    board = refBoard.map(row => row.slice());

    return board;
};

// check for winning state
var checkWinState = function(board) {
    var refBoard = getRefBoard();
    var currBoardString = board.toString();
    var refBoardString = refBoard.toString();

    if (currBoardString === refBoardString) {
        return true;
    }
};

var animateSquare = function(event, board) {
    // debugger;
    var emptSqLoc = getEmptySquareLocation(board);
    var emptSqLocX = emptSqLoc[0];
    var emptSqLocY = emptSqLoc[1];

    var squareNumber = parseInt(event.target.innerText);

    // if empty square is clicked, do nothing
    if (!squareNumber) {
        return;
    }

    var currentSquareDiv = event.target;

    var currSqLoc = getCurrentSquareLocation(squareNumber, board);
    var currSqLocX = currSqLoc[0];
    var currSqLocY = currSqLoc[1];


    var boardWidth = board[0].length;
    var boardHeight = board.length;

        // if current square is on the left of the empty square
    if (emptSqLocX === currSqLocX && emptSqLocY === currSqLocY + 1) {
        currentSquareDiv.classList.add("move-right");        // emptySquareDiv.classList.add("move-left");
        // if current square is on the right of the empty square
    } else if (emptSqLocX === currSqLocX && emptSqLocY === currSqLocY - 1) {
        currentSquareDiv.classList.add("move-left");
        // if current square is on top of the empty square
    } else if (emptSqLocY === currSqLocY && emptSqLocX === currSqLocX + 1) {
        currentSquareDiv.classList.add("move-bottom");
        // if current square is on bottom of the empty square
    } else if (emptSqLocY === currSqLocY && emptSqLocX === currSqLocX - 1) {
        currentSquareDiv.classList.add("move-top");
    } else {
        currentSquareDiv.classList.add("shake");
    }



};

// event listener when a square is clicked
var handleSquareClick = function(event, board) {
    var squareNumber = parseInt(event.target.innerText);

    animateSquare(event, board);

    var movedBoard = getMovedBoard(squareNumber, board);

    setTimeout(function() { renderBoard(movedBoard); }, 300)

    var hasWon = checkWinState(board);
    if (hasWon) {
        setTimeout(function() { alert("You Won!"); }, 0);
    }
};

// output board object to HTML
var renderBoard = function(board) {
    var boardDiv = document.createElement("div");
    boardDiv.classList.add("board");

    for (var i = 0; i < board.length; i++) {
        var rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        for (var j = 0; j < board[0].length; j++) {
            var squareDiv = document.createElement("div");
            squareDiv.classList.add("square");
            if (board[i][j] === null) {
                squareDiv.classList.add("empty");
            }
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

// get a random integer between min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// get a scrambled board
var getScrambledBoard = function(startingBoard) {
    var boardWidth = startingBoard.length;
    var boardHeight = startingBoard[0].length;

    // get a random number between 1 and the number before null
    var randomSquareNumber = getRandomInt(1, (boardWidth * boardHeight) - 1);
    var scrambledBoard = getMovedBoard(randomSquareNumber, startingBoard);

    for (var i = 0; i < 500; i++) {
        randomSquareNumber = getRandomInt(1, (boardWidth * boardHeight) - 1);
        scrambledBoard = getMovedBoard(randomSquareNumber, scrambledBoard);
    }

    return scrambledBoard;
};

// set up a new game
var startNewGame = function() {
    // get a copy of refBoard
    var startingBoard = getRefBoard();

    // get a scrambled board
    var scrambledBoard = getScrambledBoard(startingBoard);

    // render the scrambled board
    renderBoard(scrambledBoard);
};

// add event listener to the new game button
var newGameBtn = document.querySelector("#new-game-btn");
newGameBtn.addEventListener("click", startNewGame);