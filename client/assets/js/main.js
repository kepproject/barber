(function ($)
  { "use strict"
  

    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });


    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  


// mobile_menu
    var menu = $('ul#navigation');
    if(menu.length){
      menu.slicknav({
        prependTo: ".mobile_menu",
        closedSymbol: '+',
        openedSymbol:'-'
      });
    };


    // h1-hero-active
    function mainSlider() {
      var BasicSlider = $('.slider-active');
      BasicSlider.on('init', function (e, slick) {
        var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);
      });
      BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
        doAnimations($animatingElements);
      });
      BasicSlider.slick({
        autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        fade: true,
        arrows: false, 
        prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
        responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false
            }
          }
        ]
      });

      function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function () {
          var $this = $(this);
          var $animationDelay = $this.data('delay');
          var $animationType = 'animated ' + $this.data('animation');
          $this.css({
            'animation-delay': $animationDelay,
            '-webkit-animation-delay': $animationDelay
          });
          $this.addClass($animationType).one(animationEndEvents, function () {
            $this.removeClass($animationType);
          });
        });
      }
    }
    mainSlider();




    var testimonial = $('.h1-testimonial-active');
    if(testimonial.length){
    testimonial.slick({
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay:true,
        loop:true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="ti-arrow-top-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="ti-arrow-top-right"></i></button>',
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
              arrow:false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows:false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows:false,
            }
          }
        ]
      });
    }

// Team-active
    $('.team-active').slick({
        dots: true,
        infinite: true,
        speed: 300,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });


// cut-active
    $('.cut-active').slick({
        dots: true,
        infinite: true,
        speed: 300,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });


  var nice_Select = $('select');
    if(nice_Select.length){
      nice_Select.niceSelect();
    }


    $("[data-background]").each(function () {
      $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
      });



    new WOW().init();

// 11. ---- Mailchimp js --------//  
    // function mailChimp() {
    //   $('#mc_embed_signup').find('form').ajaxChimp();
    // }
    // mailChimp();


// 12 Pop Up Img
    var popUp = $('.gallery-popup');

if (popUp.length) {
  popUp.magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: {
      enabled: true
    }
  });
}
// 12 Pop Up Video
    var popUp = $('.popup-video');
    if(popUp.length){
      popUp.magnificPopup({
        type: 'iframe'
      });
    }


if ($.fn.counterUp && $('.counter').length) {
  $('.counter').counterUp({
    delay: 10,
    time: 3000
  });
}


if ($.fn.datepicker && $('#datepicker1').length) {
  $('#datepicker1').datepicker();
}


if ($.fn.timepicker && $('#timepicker').length) {
  $('#timepicker').timepicker();
}


if ($.fn.snakeify && $('.snake').length) {
  $('.snake').snakeify({
    speed: 200
  });
}

})(jQuery);

AOS.init({
  duration: 900,
  easing: 'ease-out-cubic',
  once: true,
  offset: 20,
});

(function () {
    const modal = document.getElementById('serviceModal');

    if (!modal) return;

    const openButtons = document.querySelectorAll('.js-service-modal-open');
    const closeButtons = document.querySelectorAll('.js-service-modal-close');

    const titleEl = document.getElementById('serviceModalTitle');
    const categoryEl = document.getElementById('serviceModalCategory');
    const priceEl = document.getElementById('serviceModalPrice');
    const durationEl = document.getElementById('serviceModalDuration');
    const descriptionEl = document.getElementById('serviceModalDescription');
    const includesEl = document.getElementById('serviceModalIncludes');

    openButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            titleEl.textContent = button.dataset.serviceTitle || '';
            categoryEl.textContent = button.dataset.serviceCategory || '';
            priceEl.textContent = button.dataset.servicePrice || '';
            durationEl.textContent = button.dataset.serviceDuration || '';
            descriptionEl.textContent = button.dataset.serviceDescription || '';

            includesEl.innerHTML = '';

            const includes = button.dataset.serviceIncludes
                ? button.dataset.serviceIncludes.split('|')
                : [];

            includes.forEach(function (item) {
                const li = document.createElement('li');
                li.textContent = item;
                includesEl.appendChild(li);
            });

            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('bro-modal-open');
        });
    });

    closeButtons.forEach(function (button) {
        button.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('bro-modal-open');
    }
})();

(function () {

    const filterButtons = document.querySelectorAll('.bro-service-filter__btn');
    const serviceItems = document.querySelectorAll('.bro-service-item');

    if (!filterButtons.length || !serviceItems.length) return;

    filterButtons.forEach(function (button) {

        button.addEventListener('click', function () {

            const filter = button.dataset.filter;

            filterButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });

            button.classList.add('active');

            serviceItems.forEach(function (item) {
              const categories = item.dataset.category
                ? item.dataset.category
                    .split(',')
                    .map(category => category.trim())
                : [];

              if (filter === 'all' || categories.includes(filter)) {
                  item.style.display = '';

                  requestAnimationFrame(function () {
                      item.classList.remove('is-hidden');
                  });
              } else {
                  item.classList.add('is-hidden');

                  setTimeout(function () {
                      item.style.display = 'none';
                  }, 400);
              }
          });

        });

    });

})();

(function () {
    const portfolioFilter = document.querySelector('.bro-portfolio-filter');
    const portfolioItems = document.querySelectorAll('.bro-portfolio-item');

    if (!portfolioFilter || !portfolioItems.length) return;

    const filterButtons = portfolioFilter.querySelectorAll('.bro-portfolio-filter__btn');

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const filter = button.dataset.filter;

            filterButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });

            button.classList.add('active');

            portfolioItems.forEach(function (item) {
                const categories = item.dataset.category
                    ? item.dataset.category.split(',').map(function (category) {
                        return category.trim();
                    })
                    : [];

                const shouldShow = filter === 'all' || categories.includes(filter);

                if (shouldShow) {
                    item.style.display = '';
                    item.classList.remove('is-hidden');
                } else {
                    item.classList.add('is-hidden');

                    setTimeout(function () {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
})();

(function () {
    const form = document.getElementById('broContactForm');
    const modal = document.getElementById('thanksModal');

    if (!form || !modal) return;

    const closeButtons = document.querySelectorAll('[data-close-thanks]');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('bro-modal-open');

        form.reset();
    });

    closeButtons.forEach(function (button) {
        button.addEventListener('click', closeThanksModal);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeThanksModal();
        }
    });

    function closeThanksModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('bro-modal-open');
    }
})();

(function () {

    const phoneInput = document.querySelector('#phone');

    if (!phoneInput || typeof window.intlTelInput === 'undefined') return;

    window.intlTelInput(phoneInput, {
        initialCountry: 'ua',
        onlyCountries: ['ua'],
        separateDialCode: true,
        strictMode: true,
    });

})();

(function () {
  const phoneInput = document.querySelector('#phone');

  if (!phoneInput) return;

  phoneInput.addEventListener('input', function () {
    phoneInput.value = phoneInput.value.replace(/[^\d\s()+-]/g, '');
  });
})();