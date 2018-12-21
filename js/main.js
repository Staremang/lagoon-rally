(function () {
    let menu = document.getElementsByClassName('header-menu')[0],
        menuOverlay = document.getElementsByClassName('header-menu-overlay')[0],
        header = document.getElementsByClassName('header')[0],
        scrolled = window.pageYOffset || document.documentElement.scrollTop;

    function openMenu() {
        menu.classList.add('active');
        $(menuOverlay).fadeIn();
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menu.classList.remove('active');
        $(menuOverlay).fadeOut();
        document.body.style.overflow = '';
    }


    function fixedHeader() {
        scrolled = window.pageYOffset || document.documentElement.scrollTop;

        if (document.documentElement.clientWidth > 992) {
            closeMenu();
            if (scrolled > 150) {
                header.classList.add('fixed');
            } else {
                header.classList.remove('fixed');
            }
        } else {
            header.classList.remove('fixed');
        }
    }
    fixedHeader();
    $(window).scroll(fixedHeader);
    $(window).resize(fixedHeader);


    document.getElementById('open-menu').addEventListener('click', function () {
        openMenu();
    });
    document.getElementById('close-menu').addEventListener('click', function () {
        closeMenu();
    });
    menuOverlay.addEventListener('click', function () {
        closeMenu();
    });


})();