const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const botoes = [
  { texto: "CAMPANHA", y: 300 },
  { texto: "OPÇÕES",   y: 380 },
  { texto: "CREDITO",  y: 460 },
  { texto: "SAIR",     y: 540 }
];

const larguraBotao = 200;
const alturaBotao = 50;
const xBotao = canvas.width / 2 - larguraBotao / 2;

// Desenhar tudo
function desenharMenu() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Título
  ctx.fillStyle = "#fff";
  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText("PING PONG", canvas.width / 2, 120);

  // Subtítulo
  ctx.font = "20px Arial";
  ctx.fillText("CODEFORGE", canvas.width / 2, 160);

  // Caixa do menu
  ctx.fillStyle = "#6b3fa0";
  ctx.fillRect(xBotao - 20, 260, larguraBotao + 40, 360);
  ctx.fillStyle = "#fff";

  // Botões
  ctx.font = "20px Arial";
  botoes.forEach((botao) => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(xBotao, botao.y, larguraBotao, alturaBotao);

    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText(botao.texto, canvas.width / 2, botao.y + 32);
  });
}

// Detectar clique
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  botoes.forEach((botao) => {
    if (
      mouseX >= xBotao &&
      mouseX <= xBotao + larguraBotao &&
      mouseY >= botao.y &&
      mouseY <= botao.y + alturaBotao
    ) {
      alert(`Você clicou em: ${botao.texto}`);
      if (botao.texto === "SAIR") {
        window.close(); // não funciona em todos os navegadores
      }
    }
  });
});

desenharMenu();
