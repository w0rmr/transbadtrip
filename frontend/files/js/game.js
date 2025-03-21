export   function initializeGame() {
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1500;
canvas.height = 700;

const paddleWidth = 11;
const paddleHeight = 100;
const ballSize = 20;

let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 12;
let ballSpeedY = 12;

const paddleSpeed = 8;

let lastTime = 0;

const keys = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false,
};

function drawPaddles() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawCenterCircle() 
{
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2); 
    ctx.strokeStyle = "#fff"; 
    ctx.lineWidth = 2; 
    ctx.stroke(); 
    ctx.closePath();
}

function drawCenterLines() 
{
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;


    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 50); 
    ctx.lineTo(centerX, 0);
    ctx.strokeStyle = "#fff"; 
    ctx.lineWidth = 2; 
    ctx.stroke(); 
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 50); 
    ctx.lineTo(centerX, canvas.height);
    ctx.strokeStyle = "#fff"; 
    ctx.lineWidth = 2; 
    ctx.stroke(); 
    ctx.closePath();
}

function updateCanvas(timestamp) 
{
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddles();
    drawBall();
    drawCenterCircle(); 
    drawCenterLines(); 

    ballX += ballSpeedX * (deltaTime / 16);
    ballY += ballSpeedY * (deltaTime / 16);

    if (ballY - ballSize / 2 <= 0 || ballY + ballSize / 2 >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (
        ballX - ballSize / 2 <= paddleWidth &&
        ballY >= leftPaddleY &&
        ballY <= leftPaddleY + paddleHeight
    ) {
        ballSpeedX = Math.abs(ballSpeedX);
    }

    if (
        ballX + ballSize / 2 >= canvas.width - paddleWidth &&
        ballY >= rightPaddleY &&
        ballY <= rightPaddleY + paddleHeight
    ) {
        ballSpeedX = -Math.abs(ballSpeedX);
    }

    if (ballX - ballSize / 2 <= 0 || ballX + ballSize / 2 >= canvas.width) 
    {
        resetBall();
    }

    if (keys.w && leftPaddleY > 0) 
    {
        leftPaddleY -= paddleSpeed;
    }
    if (keys.s && leftPaddleY < canvas.height - paddleHeight) 
    {
        leftPaddleY += paddleSpeed;
    }
    if (keys.ArrowUp && rightPaddleY > 0) 
    {
        rightPaddleY -= paddleSpeed;
    }
    if (keys.ArrowDown && rightPaddleY < canvas.height - paddleHeight) 
    {
        rightPaddleY += paddleSpeed;
    }

    requestAnimationFrame(updateCanvas);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 12;
    ballSpeedY = 12;
}

document.addEventListener("keydown", (event) => 
{
    if (event.key in keys) 
    {
        keys[event.key] = true;
    }
});

document.addEventListener("keyup", (event) => 
{
    if (event.key in keys) 
    {
        keys[event.key] = false;
    }
});

requestAnimationFrame(updateCanvas);
}