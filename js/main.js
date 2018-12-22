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

        if (document.documentElement.clientWidth > 992) {
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
    var $panoTourButton     = $('.pano-tour__btn'),
        $panoTourContainer  = $('.pano-tour__container'),
        $panoTour           = $('.pano-tour'),
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

initHeader();
init3dTour();

$('.booking-ships').slick({

    centerMode: true,
    variableWidth: true,
    centerPadding: '60px',
    dots: true,
});

$('.gallery').slick({

    centerMode: true,
    variableWidth: true,
    centerPadding: '60px',
    dots: true,
});