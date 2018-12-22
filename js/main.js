var widthPoint = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1230
};

function initHeader() {
    var $menu = $('.header-menu'),
        $menuOverlay = $('.header-menu-overlay'),
        $header = $('.header'),
        scrolled = window.pageYOffset || document.documentElement.scrollTop;

    function openMenu() {
        $menu.addClass('active');
        $menuOverlay.fadeIn();

        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        $menu.removeClass('active');
        $menuOverlay.fadeOut();

        document.body.style.overflow = '';
    }


    function fixedHeader() {
        scrolled = window.pageYOffset || document.documentElement.scrollTop;

        if (document.documentElement.clientWidth >= widthPoint.lg) {
            closeMenu();
            if (scrolled > 150) {
                $header.addClass('fixed');
            } else {
                $header.removeClass('fixed');
            }
        } else {
            $header.removeClass('fixed');
        }
    }

    fixedHeader();

    $(window).scroll(fixedHeader);
    $(window).resize(fixedHeader);


    $('#open-menu').on('click', function () {
        openMenu();
    });
    $('#close-menu').on('click', function () {
        closeMenu();
    });
    $menuOverlay.on('click', function () {
        closeMenu();
    });
};

function init3dTour() {
    var $panoTourButton = $('.pano-tour__btn'),
        $panoTourContainer = $('.pano-tour__container'),
        $panoTour = $('.pano-tour'),
        panoTourOpened = false;

    $panoTourButton.on('click', function () {
        if (!panoTourOpened) {
            $panoTour.css('height', $panoTourButton.height() + $panoTourContainer.height());
            panoTourOpened = true;
        } else {
            $panoTour.css('height', '');
            panoTourOpened = false
        }
    })
}

function initBookingSlider() {
    var $shipList = $('.booking-ships'),
        sliderInitialized = false;


    function buildSlider() {
        if (document.documentElement.clientWidth < widthPoint.md) {

            if (!sliderInitialized) {
                $shipList.slick({
                    centerMode: true,
                    variableWidth: true,
                    centerPadding: '60px',
                    dots: true,
                });
                sliderInitialized = true;
            }

        } else {

            if (sliderInitialized) {
                $shipList.slick('unslick');
                sliderInitialized = false;
            }

        }
    }

    buildSlider();
    $(window).resize(buildSlider);
}


initHeader();
init3dTour();
initBookingSlider();

$('.gallery').slick({

    slidesToScroll: 1,
    slidesToShow: 4,
    // variableWidth: true,
    // centerPadding: '600px',

    arrows: true,
    centerMode: false,
    dots: false,
    infinite: false,
    // draggable: false,
    responsive: [
        {
            breakpoint: widthPoint.lg,
            settings: {
                arrows: false,
                centerMode: true,
                dots: true,
                // draggable: true
                // centerPadding: '40px',
                // slidesToShow: 1
            }
        }
    ]
});

$('[data-fancybox="images"]').fancybox({
    selector : '.slick-slide:not(.slick-cloned)',
    animationEffect: "fade",
    transitionEffect: "slide",
});