$(document).ready(function() {
  var laserSound = new Audio('audio/laser.wav');
  var damageSound = new Audio('audio/damage.wav');
  laserSound.volume = 0.3;
  damageSound.volume = 0.3;

  // Fade in game screen contents
  $('#game-screen').contents().hide().fadeIn(1300);

  // Get the canvas element and its context
  const canvas = document.getElementById('gameCanvas');
  const context = canvas.getContext('2d');

  // Player positions
  let player1X = 50;
  let player1Y = canvas.height / 2;
  let player2X = canvas.width - 60;
  let player2Y = canvas.height / 2;

  // Player health points
  let player1Health = 3;
  let player2Health = 3;

  // Projectile properties
  let projectileSize = 5;
  let projectileSpeed = 5;
  let projectiles = [];

  // Keyboard controls
  let keys = {};

  // Handle keyboard keydown and keyup events
  document.addEventListener('keydown', function (event) {
    keys[event.code] = true;
  });

  document.addEventListener('keyup', function (event) {
    keys[event.code] = false;
  });

  // Game update loop
  function update() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Player movement
    if (keys['KeyW'] && player1Y > 0) {
      player1Y -= 5;
    }
    if (keys['KeyS'] && player1Y < canvas.height - 10) {
      player1Y += 5;
    }
    if (keys['KeyA'] && player1X > 0) {
      player1X -= 5;
    }
    if (keys['KeyD'] && player1X < canvas.width / 2 - 10) {
      player1X += 5;
    }

    if (keys['ArrowUp'] && player2Y > 0) {
      player2Y -= 5;
    }
    if (keys['ArrowDown'] && player2Y < canvas.height - 10) {
      player2Y += 5;
    }
    if (keys['ArrowLeft'] && player2X > canvas.width / 2 + 10) {
      player2X -= 5;
    }
    if (keys['ArrowRight'] && player2X < canvas.width - 10) {
      player2X += 5;
    }

    // Projectile creation
    if (keys['Space']) {
      projectiles.push({
        x: player1X,
        y: player1Y,
        direction: 'right'
      });
      laserSound.play();
    }
    if (keys['ShiftRight']) {
      projectiles.push({
        x: player2X,
        y: player2Y,
        direction: 'left'
      });
      laserSound.play();
    }

    // Projectile movement
    projectiles.forEach(function (projectile) {
      if (projectile.direction === 'right') {
        projectile.x += projectileSpeed;
      } else {
        projectile.x -= projectileSpeed;
      }

      // Projectile collision with players
      if (
        projectile.x > player2X &&
        projectile.x < player2X + 10 &&
        projectile.y > player2Y &&
        projectile.y < player2Y + 10
      ) {
        player2Health--;
        projectiles.splice(projectiles.indexOf(projectile), 1);
        damageSound.play();
      }

      if (
        projectile.x > player1X &&
        projectile.x < player1X + 10 &&
        projectile.y > player1Y &&
        projectile.y < player1Y + 10
      ) {
        player1Health--;
        projectiles.splice(projectiles.indexOf(projectile), 1);
        damageSound.play();
      }

      // Projectile off-screen
      if (
        projectile.x < 0 ||
        projectile.x > canvas.width ||
        projectile.y < 0 ||
        projectile.y > canvas.height
      ) {
        projectiles.splice(projectiles.indexOf(projectile), 1);
      }
    });

    // Draw players
    context.fillStyle = "rgba(0, 0, 0, 0.6)";
    context.fillRect(player1X, player1Y, 10, 10);
    context.fillStyle = "rgba(0, 0, 0, 0.6)";
    context.fillRect(player2X, player2Y, 10, 10);

    // Draw projectiles
    projectiles.forEach(function (projectile) {
      context.fillRect(
        projectile.x,
        projectile.y,
        projectileSize,
        projectileSize
      );
    });

    // Draw player health
    context.fillText(`Player 1 Health: ${player1Health}`, 10, 20);
    context.fillText(
      `Player 2 Health: ${player2Health}`,
      canvas.width - 120,
      20
    );

    // Game over condition
    if (player1Health <= 0 || player2Health <= 0) {
      context.font = '30px Arial';
      context.fillStyle = "rgba(0, 0, 0, 0.6)";
      context.fillText(
        player1Health <= 0 ? 'Player 2 Wins!' : 'Player 1 Wins!',
        canvas.width / 2 - 100,
        canvas.height / 2
      );

      setTimeout(function(){
        location.reload();
      },2000);
    } else {
      // Request next animation frame
      requestAnimationFrame(update);
    }
  }

  // Start the game loop
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
