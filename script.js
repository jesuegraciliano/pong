const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

let ball = {
  x : canvas.width / 2,
  y : canvas.height / 2,
  radius : 10,
  velocityX : 5,
  velocityY : 5,
  speed : 7,
  color : 'WHITE'
};

let paddle1 = {
  x : 0,
  y : canvas.height / 2 - 35,
  width : 10,
  height : 70,
  color : 'YELLOW',
  score : 0
};

let paddle2 = {
  x : canvas.width - 10,
  y : canvas.height / 2 - 35,
  width : 10,
  height : 70,
  color : 'GREEN',
  score : 0
};

const paddleSpeed = 10;
let wPressed = false;
let sPressed = false;
let upArrowPressed = false;
let downArrowPressed = false;

document.addEventListener('keydown', (event) => {
  switch(event.key) {
    case 'w': wPressed = true; break;
    case 's': sPressed = true; break;
    case 'ArrowUp': upArrowPressed = true; break;
    case 'ArrowDown': downArrowPressed = true; break;
  }
});

document.addEventListener('keyup', (event) => {
  switch(event.key) {
    case 'w': wPressed = false; break;
    case 's': sPressed = false; break;
    case 'ArrowUp': upArrowPressed = false; break;
    case 'ArrowDown': downArrowPressed = false; break;
  }
});

function drawPaddle(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

function drawBall(x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI*2, false);
  context.closePath();
  context.fill();
}

function drawScore(player1, player2) {
  context.fillStyle = 'WHITE';
  context.font = '35px Arial';
  context.fillText(player1, canvas.width / 4, 50);
  context.fillText(player2, 3 * canvas.width / 4, 50);
}

function drawCenterLine() {
  context.beginPath();
  context.setLineDash([5, 5]);
  context.moveTo(canvas.width / 2, 0);
  context.lineTo(canvas.width / 2, canvas.height);
  context.strokeStyle = 'WHITE';
  context.stroke();
}

function movePaddles() {
  if (wPressed && paddle1.y > 0) paddle1.y -= paddleSpeed;
  if (sPressed && paddle1.y < canvas.height - paddle1.height) paddle1.y += paddleSpeed;
  if (upArrowPressed && paddle2.y > 0) paddle2.y -= paddleSpeed;
  if (downArrowPressed && paddle2.y < canvas.height - paddle2.height) paddle2.y += paddleSpeed;
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = -ball.velocityX;
  ball.speed = 7;
}

function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0)
    ball.velocityY = -ball.velocityY;

  if (ball.x - ball.radius < 0) {
    paddle2.score++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    paddle1.score++;
    resetBall();
  }

  if (ball.x - ball.radius < paddle1.x + paddle1.width &&
      ball.y > paddle1.y &&
      ball.y < paddle1.y + paddle1.height)
    ball.velocityX = -ball.velocityX;

  if (ball.x + ball.radius > paddle2.x &&
      ball.y > paddle2.y &&
      ball.y < paddle2.y + paddle2.height)
    ball.velocityX = -ball.velocityX;

  movePaddles();
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle(paddle1.x, paddle1.y, paddle1.width, paddle1.height, paddle1.color);
  drawPaddle(paddle2.x, paddle2.y, paddle2.width, paddle2.height, paddle2.color);
  drawBall(ball.x, ball.y, ball.radius, ball.color);
  drawScore(paddle1.score, paddle2.score);
  drawCenterLine();
}

function gameLoop() {
  update();
  render();
}

setInterval(gameLoop, 1000 / 50);
