$(document).ready(function() {
  // Fade in game screen contents
  $('#game-screen').contents().hide().fadeIn(1300);

  const board = $('.board');
  const cells = $('.cell');
  const player = 'X';
  const computer = 'O';
  let gameEnd = false;

  function checkWin(player) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        cells.eq(a).text() === player &&
        cells.eq(b).text() === player &&
        cells.eq(c).text() === player
      ) {
        return true;
      }
    }

    return false;
  }

  function checkDraw() {
    return cells.toArray().every((cell) => $(cell).text() !== '');
  }

  function getRandomEmptyCell() {
    const emptyCells = cells.filter((index, cell) => $(cell).text() === '');
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells.eq(randomIndex);
  }

  function getBestMove() {
    const emptyCells = Array.from(cells).filter((cell) => $(cell).text() === '');

    // Check for winning moves
    for (let cell of emptyCells) {
      $(cell).text(computer);
      if (checkWin(computer)) {
        $(cell).text('');
        return $(cell);
      }
      $(cell).text('');
    }

    // Check for blocking player's winning moves
    for (let cell of emptyCells) {
      $(cell).text(player);
      if (checkWin(player)) {
        $(cell).text(computer); // Place computer's symbol in the blocking cell
        return $(cell);
      }
      $(cell).text('');
    }

    // Choose a random move if no winning or blocking moves are available
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return $(emptyCells[randomIndex]);
  }

  function handleCellClick(event) {
    const cell = $(event.target);
    if (cell.text() !== '' || gameEnd) {
      return;
    }

    cell.text(player);

    if (checkWin(player)) {
      endGame(`Player ${player} wins!`);
      return;
    }

    if (checkDraw()) {
      endGame("It's a draw!");
      return;
    }

    setTimeout(() => {
      const computerCell = getBestMove();
      if (computerCell.length) {
        computerCell.text(computer);

        if (checkWin(computer)) {
          endGame(`Player ${computer} wins!`);
          return;
        }

        if (checkDraw()) {
          endGame("It's a draw!");
          return;
        }
      } else {
        // No available moves, end the game
        endGame("It's a draw!");
      }
    }, 1000);
  }

  function endGame(message) {
    setTimeout(function(){
      alert(message);
    },400);
    //alert(message);
    gameEnd = true;
    setTimeout(resetGame, 1000);
  }

  function resetGame() {
    cells.text('');
    gameEnd = false;
  }

  cells.on('click', handleCellClick);

  // Handle keydown event for slide navigation
  $(document).keydown(function(event) {
    if (event.keyCode === 8 || event.keyCode === 46) {
      setTimeout(function(){
        window.location = "index.html";
      },200);
    }
  });
});
