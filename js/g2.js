$(document).ready(function() {
  // Fade in game screen contents
  $('#game-screen').contents().hide().fadeIn(1300);

  // Handle keydown event for slide navigation
  $(document).keydown(function(event) {
    if (event.keyCode === 8 || event.keyCode === 46) {
      setTimeout(function(){
        window.location = "index.html";
      },200);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-screen');
  const gameBoardWidth = parseInt(getComputedStyle(gameBoard).width);
  const gameBoardHeight = parseInt(getComputedStyle(gameBoard).height);
  const playerSize = 40;
  const enemySize = 30;
  const bulletSize = { width: 3, height: 10 };
  const laserSound = new Audio('audio/laser.wav');
  const damageSound = new Audio('audio/damage.wav');
  laserSound.volume = 0.3;
  damageSound.volume = 0.3;

  const player = {
    x: gameBoardWidth / 2 - playerSize / 2,
    y: gameBoardHeight - playerSize,
    isMovingLeft: false,
    isMovingRight: false,
  };

  const enemies = [];
  const enemyRowCount = 5;
  const enemyColumnCount = 10;
  const enemySpacing = 10;

  const bullet = {
    x: null,
    y: null,
    isFired: false,
  };

  for (let row = 0; row < enemyRowCount; row++) {
    for (let col = 0; col < enemyColumnCount; col++) {
      const enemy = {
        x: col * (enemySize + enemySpacing),
        y: row * (enemySize + enemySpacing),
      };
      enemies.push(enemy);
    }
  }

  function update() {
    if (bullet.isFired) {
      bullet.y -= 8;

      if (bullet.y <= 0) {
        bullet.isFired = false;
      }
    }

    movePlayer();
    moveEnemies();
    checkCollision();
    draw();
  }

  function movePlayer() {
    window.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowLeft') {
        player.isMovingLeft = true;
      }

      if (event.code === 'ArrowRight') {
        player.isMovingRight = true;
      }

      if (event.code === 'Space' && !bullet.isFired) {
        bullet.x = player.x + playerSize / 2 - bulletSize.width / 2;
        bullet.y = player.y;
        bullet.isFired = true;

        laserSound.play();
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.code === 'ArrowLeft') {
        player.isMovingLeft = false;
      }

      if (event.code === 'ArrowRight') {
        player.isMovingRight = false;
      }
    });

    if (player.isMovingLeft && player.x > 0) {
      player.x -= 8;
    }

    if (player.isMovingRight && player.x + playerSize < gameBoardWidth) {
      player.x += 8;
    }
  }

  function moveEnemies() {
    for (const enemy of enemies) {
      enemy.x += 3;

      if (enemy.x + enemySize >= gameBoardWidth || enemy.x <= 0) {
        enemy.y += enemySize;
        enemy.x = enemy.x >= gameBoardWidth ? gameBoardWidth - enemySize : 0;
      }
    }
  }

  function checkCollision() {
    for (const enemy of enemies) {
      if (
        bullet.isFired &&
        bullet.y <= enemy.y + enemySize &&
        bullet.y + bulletSize.height >= enemy.y &&
        bullet.x <= enemy.x + enemySize &&
        bullet.x + bulletSize.width >= enemy.x
      ) {
        enemies.splice(enemies.indexOf(enemy), 1);
        bullet.isFired = false;
        damageSound.play();
      }
    }
  }

  function draw() {
    gameBoard.innerHTML = '';

    const playerElement = document.createElement('div');
    playerElement.classList.add('player');
    playerElement.style.left = `${player.x}px`;
    playerElement.style.top = `${player.y}px`;
    gameBoard.appendChild(playerElement);

    const bulletElement = document.createElement('div');
    bulletElement.classList.add('bullet');
    if (bullet.isFired) {
      bulletElement.style.left = `${bullet.x}px`;
      bulletElement.style.top = `${bullet.y}px`;
      gameBoard.appendChild(bulletElement);
    }

    for (const enemy of enemies) {
      const enemyElement = document.createElement('div');
      enemyElement.classList.add('enemy');
      enemyElement.style.left = `${enemy.x}px`;
      enemyElement.style.top = `${enemy.y}px`;
      gameBoard.appendChild(enemyElement);
    }
  }

  setInterval(update, 10);
});
