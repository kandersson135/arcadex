$(document).ready(function() {
  var confirmSound = new Audio('audio/confirm.wav');
  var selectSound = new Audio('audio/select.wav');
  confirmSound.volume = 0.3;
  selectSound.volume = 0.3;

  // Fade in game screen contents
  $('#game-screen').contents().hide().fadeIn(1300);

  var score = 0;

  $(".hole").click(function() {
    if ($(this).find(".mole").is(":visible")) {
      $(this).find(".mole").hide();
      score++;
      $("#score").text(score);
      confirmSound.play();
    }
  });

  setInterval(function() {
    var randomHole = Math.floor(Math.random() * $(".hole").length);
    var mole = $(".hole").eq(randomHole).find(".mole");
    mole.show();
    selectSound.play();

    setTimeout(function() {
      mole.hide();
    }, 1000);
  }, 1500);

  // Handle keydown event for slide navigation
  $(document).keydown(function(event) {
    if (event.keyCode === 8 || event.keyCode === 46) {
      setTimeout(function(){
        window.location = "index.html";
      },200);
    }
  });
});
