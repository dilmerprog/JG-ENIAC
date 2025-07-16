const canvas = document.getElementById("ping"); // Mesa de ping pong
const leftPaddle = document.getElementById('leftPaddle'); // Raquete esquerda
const rightPaddle = document.getElementById('rightPaddle'); // Raquete direita
    

const pong = canvas.getContext("2d");

    // Define tamanho real do canvas baseado no tamanho exibido (CSS)
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    function desenharMesa() {
   // Fundo preto (mesa)
    pong.fillStyle = "black";
    pong.fillRect(0, 0, canvas.width, canvas.height);  

    // linha central branca
    pong.strokeStyle = "white"
    pong.lineWidth = 2;
    pong.beginPath();
    pong.moveTo(canvas.width / 2, 0);
    pong.lineTo(canvas.width / 2, canvas.height);
    pong.stroke()
    

    }

    desenharMesa(); // chama a função para desenhar

    const paddleSpeed = 7; // Aumentando a velocidade das raquetes
    const keys = {};

    document.addEventListener('keydown', (e) => keys[e.key] = true);
    document.addEventListener('keyup', (e) => keys[e.key] = false);

    function movePaddles() {
      const leftTop = parseInt(getComputedStyle(leftPaddle).top);
      const rightTop = parseInt(getComputedStyle(rightPaddle).top);

      // Movimento raquete esquerda
      if (keys['w'] && leftTop > 0) {
        leftPaddle.style.top = `${leftTop - paddleSpeed}px`;
      }
      if (keys['s'] && leftTop + leftPaddle.offsetHeight < areaHeight) {
        leftPaddle.style.top = `${leftTop + paddleSpeed}px`;
      }

      // Movimento raquete direita
      if (keys['ArrowUp'] && rightTop > 0) {
        rightPaddle.style.top = `${rightTop - paddleSpeed}px`;
      }
      if (keys['ArrowDown'] && rightTop + rightPaddle.offsetHeight < areaHeight) {
        rightPaddle.style.top = `${rightTop + paddleSpeed}px`;
      }

      requestAnimationFrame(movePaddles);
    }

    movePaddles();




