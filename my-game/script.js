console.log("Let the game begin!");

var board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, null]
];

var boardSize = 3;

var updateBoardElements = function(board) {

};


var getUpdatedBoard = function(squareNumber, board) {
    console.log("going to move square!");
    var emptSqLoc = checkEmptySquareLocation(board);
    console.log("empty square location: ", emptSqLoc);
    var currSqLoc = checkCurrentSquareLocation(squareNumber, board);
    console.log("current square location: ", currSqLoc);

    var emptSqLocX = emptSqLoc[0];
    var emptSqLocY = emptSqLoc[1];
    var currSqLocX = currSqLoc[0];
    var currSqLocY = currSqLoc[1];

    board[emptSqLocX][emptSqLocY] = squareNumber;
    board[currSqLocX][currSqLocY] = null;

    return board;
};


var checkCurrentSquareLocation = function(squareNumber, board) {
    console.log("checking current square location!");
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j] === squareNumber) {
                // debugger;
                return [ i, j];
            }
        }
    }
};

var checkEmptySquareLocation = function(board) {
    console.log("checking empty square location!");
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j] === null) {
                // debugger;
                return [ i, j];
            }
        }
    }
};


var checkMovableSquare = function(squareNumber, board) {
    console.log("checking whether square is movable!");
    var emptSqLoc = checkEmptySquareLocation(board);
    console.log("empty square location: ", emptSqLoc);
    var currSqLoc = checkCurrentSquareLocation(squareNumber, board);
    console.log("current square location: ", currSqLoc);

    var emptSqLocX = emptSqLoc[0];
    var emptSqLocY = emptSqLoc[1];
    var currSqLocX = currSqLoc[0];
    var currSqLocY = currSqLoc[1];

    if (emptSqLocX === currSqLocX && (emptSqLocY === currSqLocY + 1 || emptSqLocY === currSqLocY - 1) ) {
        return true;
    } else if (emptSqLocY === currSqLocY && (emptSqLocX === currSqLocX + 1 || emptSqLocX === currSqLocX - 1 )) {
        return true;
    } else {
        return false;
    }
};

var moveSquare = function(squareNumber, board) {
    console.log("trying to moving square!");

    if (squareNumber) {
        var isMovableSquare = checkMovableSquare(squareNumber, board);
        console.log("square is movable: ", isMovableSquare);
        if (isMovableSquare) {
            console.log("going to update board!");
            var updatedBoard = getUpdatedBoard(squareNumber, board);
            console.log("updated board: ", updatedBoard);
            createBoardElements(updatedBoard);
        } else {
            console.log("square is not movable!");
        }

    } else {
        console.log("empty square is clicked, nothing is going move!");
    }

};


var handleSquareClick = function(event, board) {
    // console.log("event: ", event);
    var squareNumber = parseInt(event.target.innerText);
    console.log("square number " + squareNumber + " is clicked!");

    moveSquare(squareNumber, board);

};



var createBoardElements = function(board) {
    console.log("creating board elements!");
    //create board
    var boardDiv = document.createElement("div");
    boardDiv.classList.add("board");

    for (var i = 0; i < board.length; i++) {
        var rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        for (var j = 0; j < board.length; j++) {
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
    interfaceDiv.appendChild(boardDiv);

};

// set up a new game
var startNewGame = function(board, boardSize) {
    console.log("start new game!");

    createBoardElements(board);


};


var newGameBtn = document.querySelector("#new-game-btn");
newGameBtn.addEventListener("click", function() { startNewGame(board, boardSize); });