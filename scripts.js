const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

const paddleHeight = 100;
const paddleWidth = 10;
const playerPaddleX = 0;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
const computerPaddleX = canvas.width - paddleWidth;
let computerPaddleY = (canvas.height - paddleHeight) / 2;

let upPressed = false;
let downPressed = false;

const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = -2;
let speedMultiplier = 1.05;
let colorIndex = 0;

let playerLives = 3;
let computerLives = 3;

const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];

function drawPaddle(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, paddleWidth, paddleHeight);
    ctx.fillStyle = colors[colorIndex % colors.length];
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = colors[colorIndex % colors.length];
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle(playerPaddleX, playerPaddleY);
    drawPaddle(computerPaddleX, computerPaddleY);
    drawBall();

    if (upPressed && playerPaddleY > 0) {
        playerPaddleY -= 7;
    } else if (downPressed && playerPaddleY < canvas.height - paddleHeight) {
        playerPaddleY += 7;
    }

    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy;
    }

    if (x + dx < ballRadius + paddleWidth) {
        if (y > playerPaddleY && y < playerPaddleY + paddleHeight) {
            dx = -dx * speedMultiplier;
            dy *= speedMultiplier;
            colorIndex++;
        } else {
            computerLives--;
            resetBall();
        }
    } else if (x + dx > canvas.width - ballRadius - paddleWidth) {
        if (y > computerPaddleY && y < computerPaddleY + paddleHeight) {
            dx = -dx * speedMultiplier;
            dy *= speedMultiplier;
            colorIndex++;
        } else {
            playerLives--;
            resetBall();
        }
    }

    x += dx;
    y += dy;

    moveComputerPaddle();

    if (playerLives === 0 || computerLives === 0) {
        endGame();
    }
}

function moveComputerPaddle() {
    if (computerPaddleY + paddleHeight / 2 < y) {
        computerPaddleY += 4;
    } else if (computerPaddleY + paddleHeight / 2 > y) {
        computerPaddleY -= 4;
    }
}

function resetBall() {
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = -dx;
    dy = -dy;
}

function endGame() {
    alert(`Game Over! ${playerLives === 0 ? "Computer" : "Player"} wins!`);
    document.location.reload();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

setInterval(draw, 10);
