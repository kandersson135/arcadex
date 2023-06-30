$(document).ready(function() {
  var confirmSound = new Audio('audio/confirm.wav');
  var selectSound = new Audio('audio/select.wav');
  confirmSound.volume = 0.3;
  selectSound.volume = 0.3;

  // Fade in game screen contents
  $('#game-screen').contents().hide().fadeIn(1300);

  var gameBoard = $('#game-screen');
  var paddleWidth = 75;
  var paddleHeight = 10;
  var paddleX = (gameBoard.width() - paddleWidth) / 2;

  var brickRowCount = 5;
  var brickColumnCount = 9;
  var brickWidth = 80;
  var brickHeight = 20;
  var brickPadding = 10;
  var brickOffsetTop = 30;
  var brickOffsetLeft = 30;

  var bricks = [];
  for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  var ballRadius = 10;
  var ballX = gameBoard.width() / 2;
  var ballY = gameBoard.height() - 30;
  var dx = 4;
  var dy = -4;

  var rightPressed = false;
  var leftPressed = false;

  $(document).keydown(keyDownHandler);
  $(document).keyup(keyUpHandler);

  function keyDownHandler(event) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
      rightPressed = true;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
      leftPressed = true;
    }
  }

  function keyUpHandler(event) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
      rightPressed = false;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
      leftPressed = false;
    }
  }

  function drawBall() {
    var ball = $('<div class="ball"></div>');
    ball.css({
      left: `${ballX - ballRadius}px`,
      top: `${ballY - ballRadius}px`,
      width: `${ballRadius * 2}px`,
      height: `${ballRadius * 2}px`,
    });
    gameBoard.append(ball);
  }

  function drawPaddle() {
    var paddle = $('<div class="paddle"></div>');
    paddle.css({
      left: `${paddleX}px`,
      top: `${gameBoard.height() - paddleHeight}px`,
      width: `${paddleWidth}px`,
      height: `${paddleHeight}px`,
    });
    gameBoard.append(paddle);
  }

  function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status === 1) {
          var brick = $('<div class="brick"></div>');
          var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
          var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
          brick.css({
            left: `${brickX}px`,
            top: `${brickY}px`,
            width: `${brickWidth}px`,
            height: `${brickHeight}px`,
          });
          gameBoard.append(brick);
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
        }
      }
    }
  }

  function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        var brick = bricks[c][r];
        if (brick.status === 1) {
          if (
            ballX > brick.x &&
            ballX < brick.x + brickWidth &&
            ballY > brick.y &&
            ballY < brick.y + brickHeight
          ) {
            confirmSound.play();
            dy = -dy;
            brick.status = 0;
            $('.brick').eq(c * brickRowCount + r).remove();
          }
        }
      }
    }
  }

  function draw() {
    gameBoard.empty();
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();

    if (ballX + dx > gameBoard.width() - ballRadius || ballX + dx < ballRadius) {
      dx = -dx;
    }
    if (ballY + dy < ballRadius) {
      dy = -dy;
    } else if (ballY + dy > gameBoard.height() - ballRadius) {
      if (ballX > paddleX && ballX < paddleX + paddleWidth) {
        dy = -dy;
        selectSound.play();
      } else {
        alert('Game Over');
        location.reload();
      }
    }

    if (rightPressed && paddleX < gameBoard.width() - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    ballX += dx;
    ballY += dy;

    requestAnimationFrame(draw);
  }

  draw();

  // Handle keydown event for slide navigation
  $(document).keydown(function(event) {
    if (event.keyCode === 8 || event.keyCode === 46) {
      setTimeout(function(){
        window.location = "index.html";
      },200);
    }
  });
});
