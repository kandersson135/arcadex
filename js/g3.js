$(document).ready(function() {
  var confirmSound = new Audio('audio/confirm.wav');
  var selectSound = new Audio('audio/select.wav');
  confirmSound.volume = 0.3;
  selectSound.volume = 0.3;

  // Fade in game screen contents
  $('#game-screen').contents().hide().fadeIn(1300);

  var gameBoard = $('#game-screen');
  var gameBoardWidth = parseInt(gameBoard.css('width'));
  var gameBoardHeight = parseInt(gameBoard.css('height'));
  var paddleHeight = 80;
  var paddleWidth = 10;
  var ballSize = 10;

  var paddleLeftY = gameBoardHeight / 2 - paddleHeight / 2;
  var paddleRightY = gameBoardHeight / 2 - paddleHeight / 2;
  var ballX = gameBoardWidth / 2 - ballSize / 2;
  var ballY = gameBoardHeight / 2 - ballSize / 2;
  var ballSpeedX = -3;
  var ballSpeedY = -3;

  function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= gameBoardHeight - ballSize) {
      ballSpeedY = -ballSpeedY;
    }

    if (ballX <= paddleWidth && ballY + ballSize >= paddleLeftY && ballY <= paddleLeftY + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      confirmSound.play();
    }

    if (ballX + ballSize >= gameBoardWidth - paddleWidth && ballY + ballSize >= paddleRightY && ballY <= paddleRightY + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      selectSound.play();
    }

    if (ballX <= 0 || ballX + ballSize >= gameBoardWidth) {
      resetGame();
      return;
    }

    movePaddleLeft();
    movePaddleRight();

    draw();
  }

  function movePaddleLeft() {
    var paddleSpeed = 2;
    if (paddleLeftY + paddleHeight / 2 < ballY + ballSize / 2) {
      paddleLeftY += paddleSpeed;
    } else {
      paddleLeftY -= paddleSpeed;
    }
  }

  function movePaddleRight() {
    $(window).on('mousemove', function(event) {
      var mouseY = event.clientY - gameBoard.offset().top - paddleHeight / 2;
      if (mouseY >= 0 && mouseY + paddleHeight <= gameBoardHeight) {
        paddleRightY = mouseY;
      }
    });
  }

  function draw() {
    gameBoard.empty();

    var paddleLeft = $('<div></div>').addClass('paddle');
    paddleLeft.css({
      left: '0px',
      top: `${paddleLeftY}px`,
    });
    gameBoard.append(paddleLeft);

    var paddleRight = $('<div></div>').addClass('paddle');
    paddleRight.css({
      right: '0px',
      top: `${paddleRightY}px`,
    });
    gameBoard.append(paddleRight);

    var ball = $('<div></div>').addClass('ball');
    ball.css({
      left: `${ballX}px`,
      top: `${ballY}px`,
    });
    gameBoard.append(ball);
  }

  function resetGame() {
    paddleLeftY = gameBoardHeight / 2 - paddleHeight / 2;
    paddleRightY = gameBoardHeight / 2 - paddleHeight / 2;
    ballX = gameBoardWidth / 2 - ballSize / 2;
    ballY = gameBoardHeight / 2 - ballSize / 2;
    ballSpeedX = -2;
    ballSpeedY = -2;
  }

  setInterval(update, 10);

  // Handle keydown event for slide navigation
  $(document).keydown(function(event) {
    if (event.keyCode === 8 || event.keyCode === 46) {
      setTimeout(function(){
        window.location = "index.html";
      },200);
    }
  });
});
