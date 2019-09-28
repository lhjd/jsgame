console.log("Let the game begin!");

var boardSize = 3;

var refBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, null]
];

var startingBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, null]
];

// console.log("original refBoard", refBoard);

var getUpdatedBoard = function(squareNumber, board) {
    // console.log("going to move square!");
    var emptSqLoc = checkEmptySquareLocation(board);
    // console.log("empty square location: ", emptSqLoc);
    var currSqLoc = checkCurrentSquareLocation(squareNumber, board);
    // console.log("current square location: ", currSqLoc);
    // debugger;

    var emptSqLocX = emptSqLoc[0];
    var emptSqLocY = emptSqLoc[1];
    var currSqLocX = currSqLoc[0];
    var currSqLocY = currSqLoc[1];

    board[emptSqLocX][emptSqLocY] = squareNumber;
    board[currSqLocX][currSqLocY] = null;

    return board;
};


var checkCurrentSquareLocation = function(squareNumber, board) {
    // console.log("checking current square location!");
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j] === squareNumber) {
                // debugger;
                return [i, j];
            }
        }
    }
};

var checkEmptySquareLocation = function(board) {
    // console.log("checking empty square location!");
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j] === null) {
                // debugger;
                return [i, j];
            }
        }
    }
};


var checkMovableSquare = function(squareNumber, board) {
    // console.log("checking whether square is movable!");
    var emptSqLoc = checkEmptySquareLocation(board);
    // console.log("empty square location: ", emptSqLoc);
    var currSqLoc = checkCurrentSquareLocation(squareNumber, board);
    // console.log("current square location: ", currSqLoc);

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

var moveSquare = function(squareNumber, board) {
    // console.log("trying to moving square!");
    if (squareNumber) {
        var isMovableSquare = checkMovableSquare(squareNumber, board);
        // console.log("square is movable: ", isMovableSquare);
        if (isMovableSquare) {
            // console.log("going to update board!");
            var updatedBoard = getUpdatedBoard(squareNumber, board);
            // console.log("updated board: ", updatedBoard);
            createBoardElements(updatedBoard);
        } else {
            // console.log("square is not movable!");
            return board;
        }

    } else {
        console.log("empty square is clicked, nothing is going move!");
    }

};

var moveRandomSquare = function(randomSquareNumber, board) {
    // console.log("trying to move random square!");
    // console.log("refBoard: ", refBoard);

    var isMovableSquare = checkMovableSquare(randomSquareNumber, board);
    // console.log("square is movable: ", isMovableSquare);
    if (isMovableSquare) {
        // console.log("going to move random square!");
        // console.log(JSON.stringify(refBoard));
        var updatedBoard = getUpdatedBoard(randomSquareNumber, board);
        // console.log("updated board: ", updatedBoard);
        // console.log(JSON.stringify(refBoard));
        return updatedBoard;
        // createBoardElements(updatedBoard);
    } else {
        // console.log("square is not movable!");
        return board;
    }
};

var checkWinState = function(board) {
    // console.log("checking win state!");
    // console.log("refBoard", refBoard);
    var currBoardString = board.toString();
    var refBoardString = refBoard.toString();

    // console.log(currBoardString);
    // console.log(refBoardString);

    if (currBoardString === refBoardString) {
        return true;
    }

};

var handleSquareClick = function(event, board) {
    // console.log("event: ", event);
    var squareNumber = parseInt(event.target.innerText);
    // console.log("square number " + squareNumber + " is clicked!");

    moveSquare(squareNumber, board);

    var hasWon = checkWinState(board);
    if (hasWon) {
        setTimeout(function() { alert("You Won!"); }, 2000);
    }
};

var restartGame = function() {
    // console.log("restarting game!");
    var randomBoard = createRandomBoard(boardSize);


    createBoardElements(randomBoard);
};

var createBoardElements = function(board) {
    // console.log("creating board elements!");
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

    var restartButton = document.createElement("button");
    restartButton.innerText = "Restart";
    restartButton.id = "restart-game-btn";
    restartButton.addEventListener("click", restartGame);

    document.querySelector(".board").after(restartButton);

};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var createRandomBoard = function(boardSize) {
    // console.log("creating random board!");
    // console.log("refBoard: ", refBoard);

    var randomSquareNumber = getRandomInt(1, (boardSize * boardSize) - 1);

    // console.log("random square number: ", randomSquareNumber);

//     var startingBoard =  [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, null]
// ];

    var randomBoard = moveRandomSquare(randomSquareNumber, startingBoard);

    for (var i = 0; i < 500; i++) {
        randomSquareNumber = getRandomInt(1, (boardSize * boardSize) - 1);
        randomBoard = moveRandomSquare(randomSquareNumber, randomBoard);
    }

    // console.log("random board: ", randomBoard);

    return randomBoard;

};



// set up a new game
var startNewGame = function(boardSize) {
    // console.log("start new game!");

    // var board = [
    //     [1, 2, 3],
    //     [4, 5, 6],
    //     [7, 8, null]
    // ];



    var randomBoard = createRandomBoard(boardSize);


    createBoardElements(randomBoard);
};


var newGameBtn = document.querySelector("#new-game-btn");
newGameBtn.addEventListener("click", function() { startNewGame(boardSize); });