(function ($) {

    $.fn.jhslide = function (options) {

    	// Control functions
    	function slideForward() {
    		 resetProgressBar();
    		// Move forward or back to slide 1
            if (currentSlide == $(slideList)
                .length - 1) {
                $(slideList[currentSlide])
                    .slideUp();
                $(slideList[0])
                    .slideDown();
                currentSlide = 0;
            } else {
                $(slideList[currentSlide])
                    .slideUp();
                $(slideList[currentSlide + 1])
                    .slideDown();
                currentSlide++;
            }
            // Set bullets
            $('.jhslide-bullet')
                .removeClass('active');
            $('*[data-slide="' + currentSlide + '"]')
                .addClass('active');
        }

        function slideBack() {
        	resetProgressBar();

        	// Move back or to last slide
            if (currentSlide == 0) {
                $(slideList[currentSlide])
                    .slideUp();
                $(slideList.get(-1))
                    .slideDown();
                currentSlide = $(slideList)
                    .length - 1;
            } else {
                $(slideList[currentSlide])
                    .slideUp();
                $(slideList[currentSlide - 1])
                    .slideDown();
                currentSlide--;
            }

            // Set bullets
            $('.jhslide-bullet')
                .removeClass('active');
            $('*[data-slide="' + currentSlide + '"]')
                .addClass('active');
        }

        function slideTo(slide) {
        	resetProgressBar();
            $(slideList[currentSlide])
                .slideUp();
            currentSlide = parseInt(slide);
            $(slideList[slide])
                .slideDown();
        }


        var playPause;
        function playPause(playPause) {
          if (playPause) {
            clearInterval(progress);
            clearInterval(timer);
          }
          else{
            resetProgressBar();
            timer = setInterval(function () {
                slideForward();
            }, settings.time);
          }
        }


        // Get List of li
        var slideList = this.find('li');
        var currentSlide = 0;
        var timerCount = 0;
        var timerPerc = 0;
        var progress;

        function resetProgressBar() {
        	timerCount = 0;
        	timerPerc = 0;
        	clearInterval(progress);
        	progress = setInterval(function () {
        		timerCount += 10;
        		timerPerc = timerCount / settings.time * 100;
            	$(".progress-bar").css("width",timerPerc.toString()+"%");
          	}, 10);

        }



        // Settings
        var settings = $.extend({
            time: 5000
        }, options);

        // Add class to element
        this.addClass('jhslide-wrapper');

        // Automatically Scroll if more than one slide
        if (slideList.length > 1) {
          var timer = setInterval(function () {
              slideForward();
          }, settings.time);
          resetProgressBar();


        // Add Navigation
        var leftarrow = document.createElement('div');
        $(leftarrow)
        	.addClass('jhslider-left')
            .html('<i class="fa fa-caret-left"></i>');

        var rightarrow = document.createElement('div');
        $(rightarrow)
        	.addClass('jhslider-right')
            .html('<i class="fa fa-caret-right"></i>');

        var bulletcontainer = document.createElement('div');
        $(bulletcontainer)
        	.addClass('bullet-container');

        var progressBar = document.createElement('div');
        $(progressBar).addClass('progress-bar');

        var playPauseButton = document.createElement('div');
        $(playPauseButton).addClass('playpause pause').html('<i class="fa fa-pause-circle"></i>');

        this.append(leftarrow, rightarrow, bulletcontainer, progressBar, playPauseButton);

        }

        // For each slide, add a bullet to navigation
        $.each(slideList, function (i) {
            var bullet = document.createElement('div');
            $(bullet)
                .attr('data-slide', i)
                .addClass('jhslide-bullet');
            $('.bullet-container')
                .append($(bullet));
        });

        // Set first bullet to active
        $('.bullet-container div').first().addClass('active');

        // Set active to first li and hide inactive slides
        $(slideList[currentSlide])
            .addClass('active');
        $(slideList)
            .slice(currentSlide + 1)
            .hide();


        // Slide on click, and reset auto slide functions
        $(leftarrow)
            .click(function () {
                slideBack();
                if (slideList.length > 1) {
                clearInterval(timer);
                timer = setInterval(function () {
                    slideForward();
                }, settings.time);
              }
            });
        $(rightarrow)
            .click(function () {
                slideForward();
                clearInterval(timer);
                if (slideList.length > 1) {
                clearInterval(timer);
                timer = setInterval(function () {
                    slideForward();
                }, settings.time);
              }
            });
        $(".playpause")
          .click(function () {
            if ($(this).hasClass("pause")) {
              $(this)
                .removeClass("pause")
                .addClass("play")
                .html('<i class="fa fa-play-circle"></i>');
              playPause(true);
            }
            else{
              $(this)
                .removeClass("play")
                .addClass("pause")
                .html('<i class="fa fa-pause-circle"></i>');
              playPause(false);
            }

          });

        // Slide on bullet click, except for active bullet
        $('.jhslide-bullet')
            .click(function () {
                if (!$(this)
                    .hasClass('active')) {
                    slideTo($(this)
                        .attr('data-slide'));
                    $('.jhslide-bullet')
                        .removeClass('active');
                    $(this)
                        .addClass('active');
                        if (slideList.length > 1) {
                        clearInterval(timer);
                        timer = setInterval(function () {
                            slideForward();
                        }, settings.time);
                      }
                }
            });

        return this;
    };
}(jQuery));
