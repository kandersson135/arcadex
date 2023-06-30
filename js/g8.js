$(document).ready(function() {
  var jumpSound = new Audio('audio/jump.wav');
  var collectSound = new Audio('audio/collect.wav');
  jumpSound.volume = 0.3;
  collectSound.volume = 0.3;

  // Fade in game screen contents
  $('#game-screen').contents().hide().fadeIn(1300);

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const platform1 = {
    x: 100,
    y: 120,
    width: 100,
    height: 10
  };

  const platform2 = {
    x: 300,
    y: 180,
    width: 100,
    height: 10
  };

  const platform3 = {
    x: 200,
    y: 240,
    width: 75,
    height: 10
  };

  const platform4 = {
    x: 420,
    y: 320,
    width: 100,
    height: 10
  };

  const platform5 = {
    x: 200,
    y: 450,
    width: 75,
    height: 10
  };

  const platform6 = {
    x: 350,
    y: 480,
    width: 100,
    height: 10
  };

  const platform7 = {
    x: 600,
    y: 400,
    width: 100,
    height: 10
  };

  const platform8 = {
    x: 500,
    y: 430,
    width: 50,
    height: 10
  };

  const platform9 = {
    x: 100,
    y: 390,
    width: 50,
    height: 10
  };

  const platform10 = {
    x: 720,
    y: 330,
    width: 50,
    height: 10
  };

  const platform11 = {
    x: 650,
    y: 180,
    width: 100,
    height: 10
  };

  const platform12 = {
    x: 550,
    y: 260,
    width: 100,
    height: 10,
  };

  const player1 = {
    x: 50,
    y: 100,
    width: 30,
    height: 30,
    dx: 0,
    dy: 0,
    isJumping: false
  };

  const player2 = {
    x: 790,
    y: 150,
    width: 30,
    height: 30,
    dx: 0,
    dy: 0,
    isJumping: false
  };

  let timer = 60;
  let isPlayer1It = true;

  function drawPlatform(platform) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  }

  function drawPlayer(player, number) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = "#9bbc0f";
    ctx.font = "bold 16px Arial";
    ctx.fillText(number, player.x + player.width / 2 - 6, player.y + player.height / 2 + 6);
}

  function drawIndicator(isPlayer1It) {
    if (isPlayer1It) {
      const indicatorX = isPlayer1It.x + isPlayer1It.width / 2;
      const indicatorY = isPlayer1It.y - 5;

      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.beginPath();
      ctx.moveTo(indicatorX, indicatorY);
      ctx.lineTo(indicatorX - 10, indicatorY - 10);
      ctx.lineTo(indicatorX + 10, indicatorY - 10);
      ctx.closePath();
      ctx.fill();
    }
  }

  function drawTimer() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.font = "20px Arial";
    ctx.fillText("Timer: " + timer, canvas.width - 100, 30);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function update() {
    // Update player positions
    player1.x += player1.dx;
    player1.y += player1.dy;

    player2.x += player2.dx;
    player2.y += player2.dy;

    // Apply gravity to players
    player1.dy += 0.2;
    player2.dy += 0.2;

    // Check for collision with platforms
    /*
    if (isColliding(player1, platform1) || isColliding(player1, platform2) || isColliding(player1, platform3) || isColliding(player1, platform4) || isColliding(player1, platform5)|| isColliding(player1, platform6) || isColliding(player1, platform7) || isColliding(player1, platform8) || isColliding(player1, platform9) || isColliding(player1, platform10)) {
        player1.dy = 0;
        player1.isJumping = false;
    } else if (player1.y + player1.height > canvas.height) {
        player1.y = canvas.height - player1.height;
        player1.dy = 0;
        player1.isJumping = false;
    }
    */

    if (isColliding(player1, platform1)) {
        player1.y = platform1.y - player1.height;
        player1.dy = 0;
        player1.isJumping = false;
    } else if (isColliding(player1, platform2)) {
        player1.y = platform2.y - player1.height;
        player1.dy = 0;
        player1.isJumping = false;
    } else if (isColliding(player1, platform3)) {
        player1.y = platform3.y - player1.height;
        player1.dy = 0;
        player1.isJumping = false;
    } else if (isColliding(player1, platform4)) {
        player1.y = platform4.y - player1.height;
        player1.dy = 0;
        player1.isJumping = false;
    } else if (isColliding(player1, platform5)) {
        player1.y = platform5.y - player1.height;
        player1.dy = 0;
        player1.isJumping = false;
    } else if (isColliding(player1, platform6)) {
        player1.y = platform6.y - player1.height;
        player1.dy = 0;
        player1.isJumping = false;
    } else if (isColliding(player1, platform7)) {
        player1.y = platform7.y - player1.height;
        player1.dy = 0;
        player1.isJumping = false;
    } else if (isColliding(player1, platform8)) {
        player1.y = platform8.y - player1.height;
        player1.dy = 0;
        player1.isJumping = false;
    } else if (isColliding(player1, platform9)) {
        player1.y = platform9.y - player1.height;
        player1.dy = 0;
        player1.isJumping = false;
    } else if (isColliding(player1, platform10)) {
        player1.y = platform10.y - player1.height;
        player1.dy = 0;
        player1.isJumping = false;
    } else if (isColliding(player1, platform11)) {
        player1.y = platform11.y - player1.height;
        player1.dy = 0;
        player1.isJumping = false;
    } else if (isColliding(player1, platform12)) {
        player1.y = platform12.y - player1.height;
        player1.dy = 0;
        player1.isJumping = false;
    } else if (player1.y + player1.height > canvas.height) {
        player1.y = canvas.height - player1.height;
        player1.dy = 0;
        player1.isJumping = false;
    }

    if (isColliding(player2, platform1)) {
        player2.y = platform1.y - player2.height;
        player2.dy = 0;
        player2.isJumping = false;
    } else if (isColliding(player2, platform2)) {
        player2.y = platform2.y - player2.height;
        player2.dy = 0;
        player2.isJumping = false;
    } else if (isColliding(player2, platform3)) {
        player2.y = platform3.y - player2.height;
        player2.dy = 0;
        player2.isJumping = false;
    } else if (isColliding(player2, platform4)) {
        player2.y = platform4.y - player2.height;
        player2.dy = 0;
        player2.isJumping = false;
    } else if (isColliding(player2, platform5)) {
        player2.y = platform5.y - player2.height;
        player2.dy = 0;
        player2.isJumping = false;
    } else if (isColliding(player2, platform6)) {
        player2.y = platform6.y - player2.height;
        player2.dy = 0;
        player2.isJumping = false;
    } else if (isColliding(player2, platform7)) {
        player2.y = platform7.y - player2.height;
        player2.dy = 0;
        player2.isJumping = false;
    } else if (isColliding(player2, platform8)) {
        player2.y = platform8.y - player2.height;
        player2.dy = 0;
        player2.isJumping = false;
    } else if (isColliding(player2, platform9)) {
        player2.y = platform9.y - player2.height;
        player2.dy = 0;
        player2.isJumping = false;
    } else if (isColliding(player2, platform10)) {
        player2.y = platform10.y - player2.height;
        player2.dy = 0;
        player2.isJumping = false;
    } else if (isColliding(player2, platform11)) {
        player2.y = platform11.y - player2.height;
        player2.dy = 0;
        player2.isJumping = false;
    } else if (isColliding(player2, platform12)) {
        player2.y = platform12.y - player2.height;
        player2.dy = 0;
        player2.isJumping = false;
    } else if (player2.y + player2.height > canvas.height) {
        player2.y = canvas.height - player2.height;
        player2.dy = 0;
        player2.isJumping = false;
    }

    // Prevent players from going outside the game canvas
    if (player1.x < 0) {
        player1.x = 0;
    } else if (player1.x + player1.width > canvas.width) {
        player1.x = canvas.width - player1.width;
    }

    if (player2.x < 0) {
        player2.x = 0;
    } else if (player2.x + player2.width > canvas.width) {
        player2.x = canvas.width - player2.width;
    }

    // Check for collision between players
    if (isColliding(player1, player2)) {
        isPlayer1It = !isPlayer1It;
        collectSound.play();
    }

    clearCanvas();
    drawPlatform(platform1);
    drawPlatform(platform2);
    drawPlatform(platform3);
    drawPlatform(platform4);
    drawPlatform(platform5);
    drawPlatform(platform6);
    drawPlatform(platform7);
    drawPlatform(platform8);
    drawPlatform(platform9);
    drawPlatform(platform10);
    drawPlatform(platform11);
    drawPlatform(platform12);
    drawPlayer(player1, "1");
    drawPlayer(player2, "2");
    drawIndicator(isPlayer1It ? player1 : player2);
    drawTimer();

    requestAnimationFrame(update);
  }

  function isColliding(obj1, obj2) {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  }

  function handleKeyDown(event) {
    const key = event.key.toLowerCase();

    if (key === "w" && !player1.isJumping) {
      player1.dy = -5;
      player1.isJumping = true;
      jumpSound.play();
    } else if (key === "s") {
      player1.dy = 6;
    } else if (key === "a") {
      player1.dx = -6;
    } else if (key === "d") {
      player1.dx = 6;
    } else if (key === "arrowup" && !player2.isJumping) {
      player2.dy = -5;
      player2.isJumping = true;
      jumpSound.play();
    } else if (key === "arrowdown") {
      player2.dy = 6;
    } else if (key === "arrowleft") {
      player2.dx = -6;
    } else if (key === "arrowright") {
      player2.dx = 6;
    }
  }

  function handleKeyUp(event) {
    const key = event.key.toLowerCase();

    if (key === "s") {
      player1.dy = 0;
    } else if (key === "a" || key === "d") {
      player1.dx = 0;
    } else if (key === "arrowdown") {
      player2.dy = 0;
    } else if (key === "arrowleft" || key === "arrowright") {
      player2.dx = 0;
    }
  }

  function startTimer() {
    setInterval(function() {
      timer--;

      if (timer === 0) {
        if (isPlayer1It) {
          alert("Player 2 Wins!");
        } else {
          alert("Player 1 Wins!");
        }
        resetGame();
      }
    }, 1000);
  }

  function resetGame() {
    timer = 60;
    player1.x = 50;
    player1.y = 100;
    player1.dx = 0;
    player1.dy = 0;
    player1.isJumping = false;

    player2.x = 790;
    player2.y = 150;
    player2.dx = 0;
    player2.dy = 0;
    player2.isJumping = false;

    isPlayer1It = true;
  }

  document.addEventListener("keydown", handleKeyDown, false);
  document.addEventListener("keyup", handleKeyUp);

  startTimer();
  update();

  // Handle keydown event for slide navigation
  $(document).keydown(function(event) {
    if (event.keyCode === 8 || event.keyCode === 46) {
      setTimeout(function(){
        window.location = "index.html";
      },200);
    }
  });
});
