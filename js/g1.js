$(document).ready(function() {
  var collectSound = new Audio('audio/collect.wav');
  var damageSound = new Audio('audio/damage.wav');
  collectSound.volume = 0.3;
  damageSound.volume = 0.3;

  $('#game-screen').contents().hide().fadeIn(1300);

  var gameBoard = $('#game-screen');
  var gameBoardWidth = parseInt(gameBoard.css('width'));
  var gameBoardHeight = parseInt(gameBoard.css('height'));
  var gridSize = 20;
  var gridWidth = gameBoardWidth / gridSize;
  var gridHeight = gameBoardHeight / gridSize;

  var snake = [{ x: 4, y: 4 }];
  var food = generateFood();

  var direction = 'right';
  var isMoving = false;
  var score = 0;

  var gameLoop;

  function draw() {
    gameBoard.html('');

    snake.forEach((part) => {
      var snakePart = $('<div class="snake-part"></div>');
      snakePart.css('left', `${part.x * gridSize}px`);
      snakePart.css('top', `${part.y * gridSize}px`);
      gameBoard.append(snakePart);
    });

    var foodElement = $('<div class="food"></div>');
    foodElement.css('left', `${food.x * gridSize}px`);
    foodElement.css('top', `${food.y * gridSize}px`);
    gameBoard.append(foodElement);
  }

  function update() {
    var head = { ...snake[0] };

    if (direction === 'right') head.x += 1;
    if (direction === 'left') head.x -= 1;
    if (direction === 'up') head.y -= 1;
    if (direction === 'down') head.y += 1;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 10;
      $('#score span').text(score);
      food = generateFood();
      collectSound.play();
    } else {
      snake.pop();
    }

    if (isCollision()) {
      clearInterval(gameLoop);
      damageSound.play();
      alert(`Game Over! Your score: ${score}`);
      resetGame();
      return;
    }

    isMoving = false;
    draw();
  }

  function changeDirection(event) {
    if (isMoving) return;

    if (event.key === 'ArrowRight' && direction !== 'left') {
      direction = 'right';
      isMoving = true;
    } else if (event.key === 'ArrowLeft' && direction !== 'right') {
      direction = 'left';
      isMoving = true;
    } else if (event.key === 'ArrowUp' && direction !== 'down') {
      direction = 'up';
      isMoving = true;
    } else if (event.key === 'ArrowDown' && direction !== 'up') {
      direction = 'down';
      isMoving = true;
    }
  }

  function isCollision() {
    var head = snake[0];
    var hitBody = snake.some((part, index) => index !== 0 && part.x === head.x && part.y === head.y);
    var hitWall =
      head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight;

    return hitBody || hitWall;
  }

  // function generateFood() {
  //   var food = {
  //     x: Math.floor(Math.random() * gridWidth),
  //     y: Math.floor(Math.random() * gridHeight),
  //   };
  //
  //   if (snake.some((part) => part.x === food.x && part.y === food.y)) {
  //     return generateFood();
  //   }
  //
  //   return food;
  // }

  function generateFood() {
    var food = {
      x: Math.floor(Math.random() * (gridWidth - 2)) + 1, // Ensures x is between 1 and gridWidth - 2
      y: Math.floor(Math.random() * (gridHeight - 2)) + 1, // Ensures y is between 1 and gridHeight - 2
    };

    // Ensure food doesn't spawn on the snake
    if (snake.some((part) => part.x === food.x && part.y === food.y)) {
      return generateFood(); // Recurse if food is on the snake
    }

    return food;
  }


  function resetGame() {
    snake = [{ x: 4, y: 4 }];
    food = generateFood();
    direction = 'right';
    isMoving = false;
    score = 0;
    $('#score span').text('0');
    gameLoop = setInterval(update, 80);
  }

  $(document).on('keydown', changeDirection);

  resetGame();

  // Handle keydown event for slide navigation
  $(document).keydown(function(event) {
    if (event.keyCode === 8 || event.keyCode === 46) {
      setTimeout(function(){
        window.location = "index.html";
      },200);
    }
  });
});
