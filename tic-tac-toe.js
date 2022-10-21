var currentPlayer; // string
var keepPlaying; // bool
var row, col; // int
var board;

const ticTacToeContainer = document.getElementById("tic-tac-toe-container");
let playerIdstatment = document.getElementById("current-player");
const xs_and_os = document.getElementById("xs-and-os");
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');

function main() {
    currentPlayer = "X";
    keepPlaying = true;
    playerIdstatment.innerHTML = currentPlayer;
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
}

function showNotification() {
    notification.classList.add("show");
    setTimeout(function(){
        notification.classList.remove("show");
    }, 2000);
}

function switchPlayer() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
        playerIdstatment.innerHTML = currentPlayer;
    }
    else if (currentPlayer == "O") {
        currentPlayer = "X";
        playerIdstatment.innerHTML = currentPlayer;
    }
}

playAgainBtn.addEventListener('click', function () {
    keepPlaying = true;
    xs_and_os.textContent = "";
    popup.style.display = 'none';
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = "X";
    playerIdstatment.innerHTML = currentPlayer;

});

function getRowCol(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    // Row 0
    if (x >= 0 && x <= 73 && y >= 0 && y <= 73) {
        row = 0;
        col = 0;
    }
    else if (x >= 77 && x <= 148 && y >= 0 && y <= 73) {
        row = 0;
        col = 1;
    }
    else if (x >= 152 && x <= 225 && y >= 0 && y <= 73) {
        row = 0;
        col = 2;
    }
    // row 1
    else if (x >= 0 && x <= 73 && y >= 77 && y <= 148) {
        row = 1;
        col = 0;
    }
    else if (x >= 77 && x <= 148 && y >= 77 && y <= 148) {
        row = 1;
        col = 1;
    }
    else if (x >= 152 && x <= 225 && y >= 77 && y <= 148) {
        row = 1;
        col = 2;
    }
    // row 2
    else if (x >= 0 && x <= 73 && y >= 152 && y <= 225) {
        row = 2;
        col = 0;
    }
    else if (x >= 77 && x <= 148 && y >= 152 && y <= 225) {
        row = 2;
        col = 1;
    }
    else if (x >= 152 && x <= 225 && y >= 152 && y <= 225) {
        row = 2;
        col = 2;
    }
    else {
        row = -1;
        col = -1;
    }
    return row, col;
}

function markBoard(row, col) {
    var marked = false;
    if (row >= 0 && col >= 0) {
        if (board[row][col] === "") {
            board[row][col] = currentPlayer;
            drawMark(row, col);
            marked = true;
            checkWinner();
        } 
        else {
            
        }
    }
    return marked;
}

function drawMark(row, col) {
    if (currentPlayer === "X") {
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", 15 + (col * 75));
        line1.setAttribute("y1", 15 + (row * 75));
        line1.setAttribute("x2", 60 + (col * 75));
        line1.setAttribute("y2", 60 + (row * 75));
        line2.setAttribute("x1", 15 + (col * 75));
        line2.setAttribute("y1", 60 + (row * 75));
        line2.setAttribute("x2", 60 + (col * 75));
        line2.setAttribute("y2", 15 + (row * 75));
        xs_and_os.appendChild(line1);
        xs_and_os.appendChild(line2);
    } else {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", 37 + (col * 75));
        circle.setAttribute("cy", 37 + (row * 75));
        circle.setAttribute("r", 25);
        xs_and_os.appendChild(circle);
    }
}

ticTacToeContainer.addEventListener("click", function (event) {
    row, col = getRowCol(event);
    marked = markBoard(row, col);
    if (marked) {
        switchPlayer();
    }else {
        showNotification();
    }
});

function checkWinner() {
    var winner = false;
    var tie = false;
    // horizontal matching
    if (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][0] !== "") {
        winner = true;
        keepPlaying = false;
    }
    if (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][0] !== "") {
        winner = true;
        keepPlaying = false;
    }
    if (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][0] !== "") {
        winner = true;
        keepPlaying = false;
    }
    // vertical matching
    if (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0] !== "") {
        winner = true;
        keepPlaying = false;
    }
    if (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1] !== "") {
        winner = true;
        keepPlaying = false;
    }
    if (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[0][2] !== "") {
        winner = true;
        keepPlaying = false;
    }
    // cross matching
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
        winner = true;
        keepPlaying = false;

    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
        winner = true;
        keepPlaying = false;

    }
    // horizontal matching
    if (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][0] !== "") {
        winner = true;
        keepPlaying = false;
    }
    if (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][0] !== "") {
        winner = true;
        keepPlaying = false;
    }
    if (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][0] !== "") {
        winner = true;
        keepPlaying = false;
    }
    // vertical matching
    if (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0] !== "") {
        winner = true;
        keepPlaying = false;
    }
    if (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1] !== "") {
        winner = true;
        keepPlaying = false;
    }
    if (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[0][2] !== "") {
        winner = true;
        keepPlaying = false;
    }
    // cross matching
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
        winner = true;
        keepPlaying = false;

    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
        winner = true;
        keepPlaying = false;

    }

    if (winner === true) {
        const finalMessage = document.getElementById('final-message');
        finalMessage.innerHTML = 'Congratulations ' + currentPlayer + '!<br>You won! 😃';

        popup.style.display = 'flex';
        keepPlaying = false;
    }
    else if (board[0][0] != '' && board[0][1] != '' && board[0][2] != '' &&
        board[1][0] != '' && board[1][1] != '' && board[1][2] != '' &&
        board[2][0] != '' && board[2][1] != '' && board[2][2] != '') {
        tie = true;

    }
    if (tie === true) {
        const finalMessage = document.getElementById('final-message');
        finalMessage.innerHTML = 'Its a draw!';
        popup.style.display = 'flex';
        keepPlaying = false;
    }
}

ticTacToeContainer.addEventListener("click", function (event) {
    if (keepPlaying === true) {
        row, col = getRowCol(event);
        marked = markBoard(row, col);
        if (marked) {
            switchPlayer();
        }
    }
});


main();