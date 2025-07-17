const canvas = document.getElementById("ping");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const paddleWidth = 15;
const paddleHeight = 100;
const leftPaddle = {
  x: 10,
  y: canvas.height / 2 - paddleHeight / 2,
  speed: 6,
  score: 0,
};
const rightPaddle = {
  x: canvas.width - paddleWidth - 10,
  y: canvas.height / 2 - paddleHeight / 2,
  speed: 6,
  score: 0,
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 8,
  dx: 5,
  dy: 5,
};

const keys = {};
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function movePaddles() {
  if (keys["w"] && leftPaddle.y > 0) leftPaddle.y -= leftPaddle.speed;
  if (keys["s"] && leftPaddle.y + paddleHeight < canvas.height) leftPaddle.y += leftPaddle.speed;
  if (keys["ArrowUp"] && rightPaddle.y > 0) rightPaddle.y -= rightPaddle.speed;
  if (keys["ArrowDown"] && rightPaddle.y + paddleHeight < canvas.height) rightPaddle.y += rightPaddle.speed;
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.dy *= -1;
  }

  // Colisão com raquete esquerda
  if (
    ball.x - ball.radius < leftPaddle.x + paddleWidth &&
    ball.y > leftPaddle.y &&
    ball.y < leftPaddle.y + paddleHeight
  ) {
    ball.dx *= -1;
    ball.x = leftPaddle.x + paddleWidth + ball.radius;
  }

  // Colisão com raquete direita
  if (
    ball.x + ball.radius > rightPaddle.x &&
    ball.y > rightPaddle.y &&
    ball.y < rightPaddle.y + paddleHeight
  ) {
    ball.dx *= -1;
    ball.x = rightPaddle.x - ball.radius;
  }

  // Pontuação e reset
  if (ball.x < 0) {
    rightPaddle.score++;
    resetBall();
  } else if (ball.x > canvas.width) {
    leftPaddle.score++;
    resetBall();
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx *= -1;
  ball.dy = 5 * (Math.random() > 0.5 ? 1 : -1);
}

function drawRoundedPaddle(x, y, width, height, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

function drawScore() {
  ctx.fillStyle = "#fff";
  ctx.font = "60px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${leftPaddle.score}   ✦   ${rightPaddle.score}`, canvas.width / 2, 300);

}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

drawRoundedPaddle(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight, 10, "#6d45c2");
drawRoundedPaddle(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight, 10, "#1b3ae7");


  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 999);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();

  drawScore();
}

function gameLoop() {
  movePaddles();
  moveBall();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
