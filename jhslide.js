(function ($) {

    $.fn.jhslide = function (options) {

    	// Control functions
    	function slideForward() {
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
            $(slideList[currentSlide])
                .slideUp();
            currentSlide = parseInt(slide);
            $(slideList[slide])
                .slideDown();
        }

        // Settings
        var settings = $.extend({
            time: 5000,
            auto: true,
        }, options);

        // Add class to element
        this.addClass('jhslide-wrapper');

        // Automatically Scroll
        var timer = setInterval(function () {
            slideForward();
        }, settings.time);

        // Get List of li
        var slideList = this.find('li');
        var currentSlide = 0;

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

        this.append(leftarrow, rightarrow, bulletcontainer);

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
                clearInterval(timer);
                timer = setInterval(function () {
                    slideForward();
                }, settings.time);
            });
        $(rightarrow)
            .click(function () {
                slideForward();
                clearInterval(timer);
                timer = setInterval(function () {
                    slideForward();
                }, settings.time);
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
                    clearInterval(timer);
                    timer = setInterval(function () {
                        slideForward();
                    }, settings.time);
                }
            });
            
        return this;
    };
}(jQuery));