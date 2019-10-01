var level = 0;

// get the board with the empty square swapped with the current movable square
var getBoardWithSquaresSwapped = function(squareIcon, board, currSqLoc) {
    var emptSqLoc = getEmptySquareLocation(board);

    var emptSqLocX = emptSqLoc[0];
    var emptSqLocY = emptSqLoc[1];
    var currSqLocX = currSqLoc[0];
    var currSqLocY = currSqLoc[1];

    board[emptSqLocX][emptSqLocY] = squareIcon;
    board[currSqLocX][currSqLocY] = null;

    return board;
};

// get the current square location
var getCurrentSquareLocation = function(squareIcon, board) {
    var boardHeight = board.length;
    var boardWidth = board[0].length;

    for (var i = 0; i < boardHeight; i++) {
        for (var j = 0; j < boardWidth; j++) {
            if (board[i][j] === squareIcon) {
                return [i, j];
            }
        }
    }
};

// get the location of the empty square
var getEmptySquareLocation = function(board) {
    var boardHeight = board.length;
    var boardWidth = board[0].length;

    for (var i = 0; i < boardHeight; i++) {
        for (var j = 0; j < boardWidth; j++) {
            if (board[i][j] === null) {
                return [i, j];
            }
        }
    }
};

// check if a square is movable
var checkMovableSquare = function(currSqLoc, board) {
    var emptSqLoc = getEmptySquareLocation(board);
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
var getMovedBoard = function(squareIcon, board, currSqLoc) {
    if (squareIcon) {
        var isMovableSquare = checkMovableSquare(currSqLoc, board);
        if (isMovableSquare) {
            var movedBoard = getBoardWithSquaresSwapped(squareIcon, board, currSqLoc);
            return movedBoard;
        } else {
            return board;
        }
    } else {
        return board;
    }
};

// check for winning state
var checkWinState = function(board) {
    var refBoard = getBoardforLevel();
    var currBoardString = board.toString();
    var refBoardString = refBoard.toString();

    if (currBoardString === refBoardString) {
        return true;
    } else {
        return false;
    }
};

// animate the swapping of squares by adding CSS classes
var animateSquare = function(squareIcon, board, currSqLoc) {
    // empty square location is where null is
    var emptSqLoc = getEmptySquareLocation(board);
    var emptSqLocX = emptSqLoc[0];
    var emptSqLocY = emptSqLoc[1];

    // if empty square is clicked, do nothing
    if (!squareIcon) {
        return;
    }

    var currSqLocX = currSqLoc[0];
    var currSqLocY = currSqLoc[1];

    // retrieve the current square div using game-row id and game-square id
    var currentSquareDiv = document.querySelectorAll(".game-row")[currSqLocX].childNodes[currSqLocY];

    var boardWidth = board[0].length;
    var boardHeight = board.length;

    var emptyDiv = document.querySelector(".empty");

    // Add CSS classes that animate a div
    // if current square is on the left of the empty square
    if (emptSqLocX === currSqLocX && emptSqLocY === currSqLocY + 1) {
        currentSquareDiv.classList.add("move-right");
        emptyDiv.classList.add("move-left");
        // if current square is on the right of the empty square
    } else if (emptSqLocX === currSqLocX && emptSqLocY === currSqLocY - 1) {
        currentSquareDiv.classList.add("move-left");
        emptyDiv.classList.add("move-right");
        // if current square is on top of the empty square
    } else if (emptSqLocY === currSqLocY && emptSqLocX === currSqLocX + 1) {
        currentSquareDiv.classList.add("move-bottom");
        emptyDiv.classList.add("move-top");
        // if current square is on bottom of the empty square
    } else if (emptSqLocY === currSqLocY && emptSqLocX === currSqLocX - 1) {
        currentSquareDiv.classList.add("move-top");
        emptyDiv.classList.add("move-bottom");
    } else {
        currentSquareDiv.classList.add("shake");
    }
};

// animate the clearing of plates
var animateClearTable = function() {
    var plates = document.querySelectorAll(".game-square");

    for (var i = 0; i < plates.length; i++) {
        plates[i].classList.add("serve");
    }
};

// event listener when a square is clicked
var handleSquareClick = function(event, board) {
    var squareIcon = event.target.innerText;

    var currSqLocX = parseInt(event.target.parentNode.id);
    var currSqLocY = parseInt(event.target.id);
    var currSqLoc = [currSqLocX, currSqLocY];

    animateSquare(squareIcon, board, currSqLoc);

    var movedBoard = getMovedBoard(squareIcon, board, currSqLoc);

    setTimeout(function() { renderBoard(movedBoard); }, 300)

    var hasWon = checkWinState(board);
    if (hasWon) {
        timer.stop()
        level++;
        setTimeout(function() { animateClearTable(); }, 500);
        setTimeout(function() {
            Swal.fire({
                type: 'success',
                title: 'yay!',
                text: 'lunch is ready!',
                onClose: startNewGame,
            })
        }, 2000);
    }
};

// output board object to HTML
var renderBoard = function(board) {
    var boardWidth = board[0].length;
    var boardHeight = board.length;

    var boardDiv = document.createElement("div");
    boardDiv.classList.add("board");
    boardDiv.style.cursor = "url('img/ketchup.cur'), auto";

    for (var i = 0; i < boardHeight; i++) {
        // create row div
        var rowDiv = document.createElement("div");
        rowDiv.classList.add("game-row");
        // add id to row div
        rowDiv.id = i.toString();

        for (var j = 0; j < boardWidth; j++) {
            // create square div
            var squareDiv = document.createElement("div");
            squareDiv.classList.add("game-square");
            squareDiv.innerText = board[i][j];

            // replace null with emoji
            if (board[i][j] === null) {
                squareDiv.classList.add("empty");
                squareDiv.innerText = "🍴";
            }

            // add id to square div
            squareDiv.id = j.toString();
            squareDiv.addEventListener("click", function(event) {
                handleSquareClick(event, board);
            });
            rowDiv.appendChild(squareDiv);
        }
        boardDiv.appendChild(rowDiv);
    }

    // clear interface div
    var interfaceDiv = document.querySelector(".interface");
    interfaceDiv.innerHTML = "";

    // create row div for restart and hint buttons
    var btnRowDiv = document.createElement("div");
    btnRowDiv.classList.add("btn-row");

    // create restart button
    var restartButton = document.createElement("button");
    restartButton.innerText = "restart";
    restartButton.id = "restart-game-btn";
    restartButton.addEventListener("click", startNewGame);

    // create hint button
    var hintButton = document.createElement("button");
    hintButton.innerText = "hint";
    hintButton.id = "hint-btn";
    // set attributes according to Bootstrap modal
    hintButton.setAttribute("data-toggle", "modal");
    hintButton.setAttribute("data-target", "#exampleModal");

    interfaceDiv.appendChild(boardDiv);

    btnRowDiv.appendChild(restartButton);
    btnRowDiv.appendChild(hintButton);
    interfaceDiv.appendChild(btnRowDiv);

    // get a board for use in hint modal
    var hintBoard = getBoardforLevel();

    // create divs for use in hint modal
    var hintBoardDiv = document.createElement("div");
    hintBoardDiv.classList.add("board");

    for (var i = 0; i < hintBoard.length; i++) {
        var hintRowDiv = document.createElement("div");
        hintRowDiv.classList.add("hint-game-row");
        hintRowDiv.id = i.toString();
        for (var j = 0; j < hintBoard[0].length; j++) {
            var hintSquareDiv = document.createElement("div");
            hintSquareDiv.classList.add("hint-game-square");
            hintSquareDiv.innerText = hintBoard[i][j];

            if (hintBoard[i][j] === null) {
                hintSquareDiv.classList.add("empty");
                hintSquareDiv.innerText = "🍴";
            }
            hintRowDiv.appendChild(hintSquareDiv);
        }
        hintBoardDiv.appendChild(hintRowDiv);
    }

    // clear hint modal window and show hint board
    var modalBodyDiv = document.querySelector(".modal-body");
    modalBodyDiv.innerHTML = "";
    modalBodyDiv.appendChild(hintBoardDiv);
};

// get a random integer between min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// get a scrambled board
var getScrambledBoard = function(startingBoard) {
    var boardHeight = startingBoard.length;
    var boardWidth = startingBoard[0].length;

    var randomSquareLocX = getRandomInt(0, boardHeight - 1);
    var randomSquareLocY = getRandomInt(0, boardWidth - 1);
    var randomSquareLoc = [randomSquareLocX, randomSquareLocY];
    var randomSquareIcon = startingBoard[randomSquareLocX][randomSquareLocY];

    var scrambledBoard = getMovedBoard(randomSquareIcon, startingBoard, randomSquareLoc);

    for (var i = 0; i < 500; i++) {
        // randomSquareNumber = getRandomInt(1, (boardWidth * boardHeight) - 1);
        randomSquareLocX = getRandomInt(0, boardHeight - 1);
        randomSquareLocY = getRandomInt(0, boardWidth - 1);
        randomSquareLoc = [randomSquareLocX, randomSquareLocY];
        randomSquareIcon = startingBoard[randomSquareLocX][randomSquareLocY];

        scrambledBoard = getMovedBoard(randomSquareIcon, scrambledBoard, randomSquareLoc);
    }

    return scrambledBoard;
};

// get board after keyboard has moved the icon
var getKeyboardMovedBoard = function(squareIcon, board, currSqLoc) {
    if (squareIcon) {
        var isMovableSquare = checkMovableSquare(currSqLoc, board);
        if (isMovableSquare) {
            var movedBoard = getBoardWithSquaresSwapped(squareIcon, board, currSqLoc);
            return movedBoard;
        } else {
            return board;
        }
    } else {
        return board;
    }
};

// move icon using keyboard
var moveIcon = function(event, board) {
    var key = event.key;
    var emptySqLoc = getEmptySquareLocation(board);
    var currSqLoc = [];
    var squareIcon = null;
    var movedBoard = [];
    var boardHeight = board.length;
    var boardWidth = board[0].length;

    if (key === "ArrowLeft") {
        currSqLoc[0] = emptySqLoc[0];
        currSqLoc[1] = emptySqLoc[1] - 1;
        if (currSqLoc.some(index => index < 0)) {
            return;
        } else {
            squareIcon = board[currSqLoc[0]][currSqLoc[1]];
            animateSquare(squareIcon, board, currSqLoc);
            movedBoard = getMovedBoard(squareIcon, board, currSqLoc);
        }
    } else if (key === "ArrowRight") {
        currSqLoc[0] = emptySqLoc[0];
        currSqLoc[1] = emptySqLoc[1] + 1;
        if (currSqLoc.some(index => index > boardWidth - 1)) {
            return;
        } else {
            squareIcon = board[currSqLoc[0]][currSqLoc[1]];
            animateSquare(squareIcon, board, currSqLoc);
            movedBoard = getMovedBoard(squareIcon, board, currSqLoc);
        }
    } else if (key === "ArrowUp") {
        currSqLoc[1] = emptySqLoc[1];
        currSqLoc[0] = emptySqLoc[0] - 1;
        if (currSqLoc.some(index => index < 0)) {
            return;
        } else {
            squareIcon = board[currSqLoc[0]][currSqLoc[1]];
            animateSquare(squareIcon, board, currSqLoc);
            movedBoard = getMovedBoard(squareIcon, board, currSqLoc);
        }
    } else if (key === "ArrowDown") {
        currSqLoc[1] = emptySqLoc[1];
        currSqLoc[0] = emptySqLoc[0] + 1;
        if (currSqLoc.some(index => index > boardHeight - 1)) {
            return;
        } else {
            squareIcon = board[currSqLoc[0]][currSqLoc[1]];
            animateSquare(squareIcon, board, currSqLoc);
            movedBoard = getMovedBoard(squareIcon, board, currSqLoc);
        }
    } else {
        return;
    }

    // animateSquare(squareIcon, board, currSqLoc);
    setTimeout(function() { renderBoard(movedBoard); }, 300)
    var hasWon = checkWinState(board);
    if (hasWon) {
        timer.stop();
        level++;
        // document.removeEventListener("keydown", function(event) { moveIcon(event); });
        setTimeout(function() { animateClearTable(); }, 500);
        setTimeout(function() {
            Swal.fire({
                type: 'success',
                title: 'Yay!',
                text: 'Lunch is ready!',
                onClose: startNewGame,
            });
        }, 2000);
    }
};

// get board according to current level
var getBoardforLevel = function() {
    // console.log("getting board for this level!");
    // console.log("board for this level: ", levels[level]);
    var board = [];
    board = levels[level].map(row => row.slice());

    return board;
};

// set up a new game
var startNewGame = function() {
    startTimer();

    var startingBoard = getBoardforLevel();

    // get a scrambled board
    var scrambledBoard = getScrambledBoard(startingBoard);

    // document.addEventListener("keydown", function(event) { moveIcon(event, scrambledBoard); });

    // render the scrambled board
    renderBoard(scrambledBoard);
};

// add event listener to the new game button
var newGameBtn = document.querySelector("#new-game-btn");
newGameBtn.addEventListener("click", startNewGame);

var timer = new easytimer.Timer();

var startTimer = function() {
    timer.stop();
    // debugger;
    timer.start({ countdown: true, startValues: { seconds: 60 } });
    $('#countdownExample .values').html(timer.getTimeValues().toString());
    timer.addEventListener('secondsUpdated', function(e) {
        $('#countdownExample .values').html(timer.getTimeValues().toString());
    });
    timer.addEventListener('targetAchieved', function(e) {
        timer.stop();
        $('#countdownExample .values').html('lunch is over!');
        Swal.fire({
            type: 'error',
            title: 'oops...',
            text: 'lunch is over!',
            onClose: startNewGame,
            // footer: '<a href>Why do I have this issue?</a>'
        })

    });
};

// credits
// ketchup cursor from
// http://www.cursors-4u.com/

// emoji from
// https://emojipedia.org/

// timer from
// https://albert-gonzalez.github.io/easytimer.js/
// https://github.com/albert-gonzalez/easytimer.js