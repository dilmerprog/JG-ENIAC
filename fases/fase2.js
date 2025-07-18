// Obtém o canvas e contexto de desenho
const canvas = document.getElementById("ping");
const ctx = canvas.getContext("2d");

// Define o tamanho do canvas
canvas.width = 800;
canvas.height = 600;

// Tamanho das raquetes
const paddleWidth = 15;
const paddleHeight = 100;

// Raquete da esquerda (jogador)
const leftPaddle = {
  x: 10,
  y: canvas.height / 2 - paddleHeight / 2,
  speed: 6,
  score: 0,
};

// Raquete da direita (IA mais difícil)
const rightPaddle = {
  x: canvas.width - paddleWidth - 10,
  y: canvas.height / 2 - paddleHeight / 2,
  speed: 7.5, // Mais rápida que o jogador
  score: 0,
};

// Bola do jogo
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 8,
  dx: 6, // velocidade horizontal
  dy: 6, // velocidade vertical
};

// Teclas pressionadas
const keys = {};
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Movimento da raquete esquerda (jogador)
function movePaddles() {
  if (keys["w"] && leftPaddle.y > 0) {
    leftPaddle.y -= leftPaddle.speed;
  }
  if (keys["s"] && leftPaddle.y + paddleHeight < canvas.height) {
    leftPaddle.y += leftPaddle.speed;
  }

  // IA controla a raquete da direita
  moveRightPaddleAI();
}

// IA mais difícil: segue a bola com velocidade aumentada
function moveRightPaddleAI() {
  // A IA só reage se a bola estiver se movendo na direção dela
  if (ball.dx > 0) {
    const paddleCenter = rightPaddle.y + paddleHeight / 2;

    // Adiciona um "limiar" para suavizar o movimento (evita jitter)
    if (ball.y < paddleCenter - 10 && rightPaddle.y > 0) {
      rightPaddle.y -= rightPaddle.speed;
    } else if (ball.y > paddleCenter + 10 && rightPaddle.y + paddleHeight < canvas.height) {
      rightPaddle.y += rightPaddle.speed;
    }
  }
}

// Movimenta a bola e verifica colisões
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Rebater na parte superior/inferior
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.dy *= -1; // Inverte direção vertical
  }

  // Colisão com raquete esquerda
  if (
    ball.x - ball.radius < leftPaddle.x + paddleWidth &&
    ball.y > leftPaddle.y &&
    ball.y < leftPaddle.y + paddleHeight
  ) {
    ball.dx *= -1; // Inverte direção horizontal
    ball.x = leftPaddle.x + paddleWidth + ball.radius;
  }

  // Colisão com raquete direita (IA)
  if (
    ball.x + ball.radius > rightPaddle.x &&
    ball.y > rightPaddle.y &&
    ball.y < rightPaddle.y + paddleHeight
  ) {
    ball.dx *= -1;
    ball.x = rightPaddle.x - ball.radius;
  }

  // Pontuação e reinício
  if (ball.x < 0) {
    rightPaddle.score++;
    resetBall();
  } else if (ball.x > canvas.width) {
    leftPaddle.score++;
    resetBall();
  }
}

// Reseta a bola para o centro e muda a direção
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx *= -1;
  ball.dy = 6 * (Math.random() > 0.5 ? 1 : -1);
}

// Desenha uma raquete com cantos arredondados
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

// Desenha o placar no centro da tela
function drawScore() {
  ctx.fillStyle = "#fff";
  ctx.font = "60px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${leftPaddle.score}   ✦   ${rightPaddle.score}`, canvas.width / 2, 300);
}

// Desenha todos os elementos do jogo
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Raquetes
  drawRoundedPaddle(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight, 10, "#6d45c2");
  drawRoundedPaddle(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight, 10, "#1b3ae7");

  // Bola
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();

  // Placar
  drawScore();
}

// Loop principal do jogo (atualiza tudo a cada frame)
function gameLoop() {
  movePaddles();
  moveBall();
  draw();
  requestAnimationFrame(gameLoop); // Chama o próximo frame
}

// Inicia o jogo
gameLoop();

