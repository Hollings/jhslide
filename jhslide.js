(function ($) {
$.fn.jhslide = function (options) {
  // Settings
  var settings = $.extend({
    time: 5000,
    auto: true,
  }, options);
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
  leftarrow.className = 'jhslider-left';
  $(leftarrow).html('<i class="fa fa-caret-left"></i>');
  var rightarrow = document.createElement('div');
  rightarrow.className = 'jhslider-right';
  $(rightarrow).html('<i class="fa fa-caret-right"></i>');
  var bulletcontainer = document.createElement('div');
  bulletcontainer.className = 'bullet-container';
  this.append(leftarrow, rightarrow, bulletcontainer);
  $.each(slideList, function (i, v) {
    var bullet = document.createElement('div');
    $(bullet).attr('data-slide', i).addClass('jhslide-bullet');
    $('.bullet-container').append($(bullet));
  });
  $('.bullet-container div').first().addClass('active');
  // Hide set active to first li
  $(slideList[currentSlide]).addClass('active');
  $(slideList).slice(currentSlide + 1).hide();
  function slideForward() {
    if (currentSlide == $(slideList).length - 1) {
      $(slideList[currentSlide]).slideUp();
      $(slideList[0]).slideDown();
      currentSlide = 0;
    }else {
      $(slideList[currentSlide]).slideUp();
      $(slideList[currentSlide + 1]).slideDown();
      currentSlide++;
    }
    $('.jhslide-bullet').removeClass('active');
    $('*[data-slide="' + currentSlide + '"]').addClass('active');
  }
  function slideBack() {
    if (currentSlide == 0) {
      $(slideList[currentSlide]).slideUp();
      $(slideList.get(-1)).slideDown();
      currentSlide = $(slideList).length - 1;
    }else {
      $(slideList[currentSlide]).slideUp();
      $(slideList[currentSlide - 1]).slideDown();
      currentSlide--;
    }
    $('.jhslide-bullet').removeClass('active');
    $('*[data-slide="' + currentSlide + '"]').addClass('active');
  }
  function slideTo(slide) {
    $(slideList[currentSlide]).slideUp();
    currentSlide = parseInt(slide);
    $(slideList[slide]).slideDown();
  }
  $(leftarrow).click(function () {
    slideBack();
    clearInterval(timer);
    timer = setInterval(function () {
      slideForward();
    }, settings.time);
  });
  $(rightarrow).click(function () {
    slideForward();
    clearInterval(timer);
    timer = setInterval(function () {
      slideForward();
    }, settings.time);
  });
  $('.jhslide-bullet').click(function () {
    if (!$(this).hasClass('active')) {
      slideTo($(this).attr('data-slide'));
      $('.jhslide-bullet').removeClass('active');
      $(this).addClass('active');
      clearInterval(timer);
      timer = setInterval(function () {
        slideForward();
      }, settings.time);
    }
  });
  return this;
};
}(jQuery));