const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let paddleHeight = 100;
let paddleWidth = 10;
let paddleY = (canvas.height - paddleHeight) / 2;
let upPressed = false;
let downPressed = false;

const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 2;
let dy = -2;
let speedMultiplier = 1.05;
let colorIndex = 0;

const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(canvas.width - paddleWidth, paddleY, paddleWidth, paddleHeight);
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

    drawPaddle();
    drawBall();

    if (upPressed && paddleY > 0) {
        paddleY -= 7;
    } else if (downPressed && paddleY < canvas.height - paddleHeight) {
        paddleY += 7;
    }

    if (x + dx > canvas.width - ballRadius - paddleWidth && y > paddleY && y < paddleY + paddleHeight) {
        dx = -dx * speedMultiplier;
        dy *= speedMultiplier;
        colorIndex++;
        document.body.style.backgroundColor = colors[colorIndex % colors.length];
    } else if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx;
    }

    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy;
    }

    x += dx;
    y += dy;
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
