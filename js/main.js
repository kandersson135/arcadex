$(document).ready(function(){
  var afterChangeExecuted = false;
  var selectSound = new Audio('audio/select.wav');
  var confirmSound = new Audio('audio/confirm.wav');
  selectSound.volume = 0.3;
  confirmSound.volume = 0.3;

  $('#game-screen').contents().hide().fadeIn(1300);

  $('#slider').on('init', function () {
    $('#slider').css({visibility: 'visible'});
  });

  // Hide ugly buttons
  $('#slider').slick({
    arrows: false,
    centerMode: true,
    slidesToShow: 4,
  	focusOnSelect: true
  });

  // Handle keydown event for slide navigation
  $(document).keydown(function(event) {
    var slider = $('#slider');

    if (event.keyCode === 37) {
      // Left arrow key
      slider.slick('slickPrev');
      selectSound.play();
    } else if (event.keyCode === 39) {
      // Right arrow key
      slider.slick('slickNext');
      selectSound.play();
    } else if (event.keyCode === 13) {
        // Enter key
        var currentSlideIndex = slider.slick('slickCurrentSlide');
        var currentSlide = slider.find('.slick-slide').eq(currentSlideIndex);

        confirmSound.play();

        setTimeout(function(){
          if (currentSlideIndex == 0) {
            window.location = "g1.html";
          } else if (currentSlideIndex == 1) {
            window.location = "g2.html";
          } else if (currentSlideIndex == 2) {
            window.location = "g3.html";
          } else if (currentSlideIndex == 3) {
            window.location = "g4.html";
          } else if (currentSlideIndex == 4) {
            window.location = "g5.html";
          } else if (currentSlideIndex == 5) {
            window.location = "g6.html";
          } else if (currentSlideIndex == 6) {
            window.location = "g7.html";
          } else if (currentSlideIndex == 7) {
            window.location = "g8.html";
          }
        },200);
      }
  });

  // Get current slide
  $('#slider').on('afterChange', function(event, slick, currentSlide) {
    // Set the flag to indicate that the event handler has run
    afterChangeExecuted = true;

    $('#start-btn').click(function() {
      confirmSound.play();

      setTimeout(function(){
        if (currentSlide == 0) {
          window.location = "g1.html";
        } else if (currentSlide == 1) {
          window.location = "g2.html";
        } else if (currentSlide == 2) {
          window.location = "g3.html";
        } else if (currentSlide == 3) {
          window.location = "g4.html";
        } else if (currentSlide == 4) {
          window.location = "g5.html";
        } else if (currentSlide == 5) {
          window.location = "g6.html";
        } else if (currentSlide == 6) {
          window.location = "g7.html";
        } else if (currentSlide == 7) {
          window.location = "g8.html";
        }
      },200);
    });
  });

  // Check if the afterChange event handler has run
  if (!afterChangeExecuted) {
    $('#start-btn').click(function() {
      confirmSound.play();

      setTimeout(function(){
        window.location = "g1.html";
      },200);
    });
  }
});
