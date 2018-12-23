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

// function init3dTour() {
//     var $panoTourButton = $('.pano-tour__btn'),
//         $panoTourContainer = $('.pano-tour__container'),
//         $panoTour = $('.pano-tour'),
//         panoTourOpened = false;
//
//     $panoTourButton.on('click', function () {
//         if (!panoTourOpened) {
//             $panoTour.css('height', $panoTourButton.innerHeight() + $panoTourContainer.innerHeight());
//             panoTourOpened = true;
//         } else {
//             $panoTour.css('height', '');
//             panoTourOpened = false
//         }
//     })
// }

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

// function initFaqCollapse() {
//     var $buttonCollapse = $('.question__header');
//
//     $buttonCollapse.on('click', function (e) {
//         var $collapse = $(this).parent();
//         e.preventDefault();
//
//         if (!$collapse.hasClass('active')) {
//             $collapse.addClass('active').css('height', $(this).innerHeight() + $(this).parent().children('.question__collapse').innerHeight());
//         } else {
//             $collapse.removeClass('active').css('height', '');
//         }
//     })
// }


function initCollapse() {
    var $buttonCollapse = $('[data-collapse="button"]');

    $buttonCollapse.on('click', function (e) {
        e.preventDefault();

        var $collapse;

        if ($(this).data('target')) {
            $collapse = $($(this).data('target'));
        } else {
            $collapse = $(this).parent().children('[data-collapse="body"]');
        }


        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $collapse.css('height', $collapse.children().innerHeight());
            // $collapse.addClass('active').css('height', $(this).innerHeight() + $collapse.children('[data-collapse="body"]').innerHeight());
        } else {
            $(this).removeClass('active');
            $collapse.css('height', '');
        }
    })
}


function initForms() {

    var Forms = {
        keys: {TAB: 9, ENTER: 13, ESC: 27, ARROW_UP: 38, ARROW_DOWN: 40}
    };
    // Function to update labels of text fields
    Forms.updateTextFields = function () {
        let input_selector =
            'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';
        $(input_selector).each(function (index, element) {
            let $this = $(this);

            if (
                element.value.length > 0 ||
                $(element).is(':focus') ||
                element.autofocus ||
                $this.attr('placeholder')
            ) {
                $this.siblings('label').addClass('active');
            } else if (element.validity) {
                $this.siblings('label').toggleClass('active', element.validity.badInput === true);
            } else {
                $this.siblings('label').removeClass('active');
            }
        });
    };

    Forms.validate_field = function (object) {
        let hasLength = object.attr('data-length');
        let lenAttr = parseInt(object.attr('data-length'));
        let len = object[0].value.length;

        if (len === 0 && object[0].validity.badInput === false && !object.is(':required')) {
            if (object.hasClass('validate')) {
                object.removeClass('valid');
                object.removeClass('invalid');
            }
        } else {
            if (object.hasClass('validate')) {
                // Check for character counter attributes
                if (
                    (object.is(':valid') && hasLength && len <= lenAttr) ||
                    (object.is(':valid') && !hasLength)
                ) {
                    object.removeClass('invalid');
                    object.addClass('valid');
                } else {
                    object.removeClass('valid');
                    object.addClass('invalid');
                }
            }
        }
    };

    Forms.textareaAutoResize = function ($textarea) {
        // Wrap if native element
        if ($textarea instanceof Element) {
            $textarea = $($textarea);
        }

        if (!$textarea.length) {
            console.error('No textarea element found');
            return;
        }

        // Textarea Auto Resize
        let hiddenDiv = $('.hiddendiv').first();
        if (!hiddenDiv.length) {
            hiddenDiv = $('<div class="hiddendiv common"></div>');
            $('body').append(hiddenDiv);
        }

        // Set font properties of hiddenDiv
        let fontFamily = $textarea.css('font-family');
        let fontSize = $textarea.css('font-size');
        let lineHeight = $textarea.css('line-height');

        // Firefox can't handle padding shorthand.
        let paddingTop = $textarea.css('padding-top');
        let paddingRight = $textarea.css('padding-right');
        let paddingBottom = $textarea.css('padding-bottom');
        let paddingLeft = $textarea.css('padding-left');

        if (fontSize) {
            hiddenDiv.css('font-size', fontSize);
        }
        if (fontFamily) {
            hiddenDiv.css('font-family', fontFamily);
        }
        if (lineHeight) {
            hiddenDiv.css('line-height', lineHeight);
        }
        if (paddingTop) {
            hiddenDiv.css('padding-top', paddingTop);
        }
        if (paddingRight) {
            hiddenDiv.css('padding-right', paddingRight);
        }
        if (paddingBottom) {
            hiddenDiv.css('padding-bottom', paddingBottom);
        }
        if (paddingLeft) {
            hiddenDiv.css('padding-left', paddingLeft);
        }

        // Set original-height, if none
        if (!$textarea.data('original-height')) {
            $textarea.data('original-height', $textarea.height());
        }

        if ($textarea.attr('wrap') === 'off') {
            hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
        }

        hiddenDiv.text($textarea[0].value + '\n');
        let content = hiddenDiv.html().replace(/\n/g, '<br>');
        hiddenDiv.html(content);

        // When textarea is hidden, width goes crazy.
        // Approximate with half of window size

        if ($textarea[0].offsetWidth > 0 && $textarea[0].offsetHeight > 0) {
            hiddenDiv.css('width', $textarea.width() + 'px');
        } else {
            hiddenDiv.css('width', window.innerWidth / 2 + 'px');
        }

        /**
         * Resize if the new height is greater than the
         * original height of the textarea
         */
        if ($textarea.data('original-height') <= hiddenDiv.innerHeight()) {
            $textarea.css('height', hiddenDiv.innerHeight() + 'px');
        } else if ($textarea[0].value.length < $textarea.data('previous-length')) {
            /**
             * In case the new height is less than original height, it
             * means the textarea has less text than before
             * So we set the height to the original one
             */
            $textarea.css('height', $textarea.data('original-height') + 'px');
        }
        $textarea.data('previous-length', $textarea[0].value.length);
    };

    $(document).ready(function () {

        // Text based inputs
        let input_selector =
            'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';

        // Add active if form auto complete
        $(document).on('change', input_selector, function () {
            if (this.value.length !== 0 || $(this).attr('placeholder') !== null) {
                $(this)
                    .siblings('label')
                    .addClass('active');
            }
            Forms.validate_field($(this));
        });

        // Add active if input element has been pre-populated on document ready
        $(document).ready(function () {
            Forms.updateTextFields();
        });

        // HTML DOM FORM RESET handling
        $(document).on('reset', function (e) {
            let formReset = $(e.target);
            if (formReset.is('form')) {
                formReset
                    .find(input_selector)
                    .removeClass('valid')
                    .removeClass('invalid');
                formReset.find(input_selector).each(function (e) {
                    if (this.value.length) {
                        $(this)
                            .siblings('label')
                            .removeClass('active');
                    }
                });

                // // Reset select (after native reset)
                // setTimeout(function () {
                //     formReset.find('select').each(function () {
                //         // check if initialized
                //         if (this.Forms.FormSelect) {
                //             $(this).trigger('change');
                //         }
                //     });
                // }, 0);
            }
        });

        /**
         * Add active when element has focus
         * @param {Event} e
         */
        document.addEventListener(
            'focus',
            function (e) {
                if ($(e.target).is(input_selector)) {
                    $(e.target)
                        .siblings('label, .prefix')
                        .addClass('active');
                }
            },
            true
        );

        /**
         * Remove active when element is blurred
         * @param {Event} e
         */
        document.addEventListener(
            'blur',
            function (e) {
                let $inputElement = $(e.target);
                if ($inputElement.is(input_selector)) {
                    let selector = '.prefix';

                    if (
                        $inputElement[0].value.length === 0 &&
                        $inputElement[0].validity.badInput !== true &&
                        !$inputElement.attr('placeholder')
                    ) {
                        selector += ', label';
                    }

                    $inputElement.siblings(selector).removeClass('active');
                    Forms.validate_field($inputElement);
                }
            },
            true
        );

        // Radio and Checkbox focus class
        let radio_checkbox = 'input[type=radio], input[type=checkbox]';
        $(document).on('keyup', radio_checkbox, function (e) {
            // TAB, check if tabbing to radio or checkbox.
            if (e.which === Forms.keys.TAB) {
                $(this).addClass('tabbed');
                let $this = $(this);
                $this.one('blur', function (e) {
                    $(this).removeClass('tabbed');
                });
                return;
            }
        });

        let text_area_selector = '.textarea';
        $(text_area_selector).each(function () {
            let $textarea = $(this);
            /**
             * Resize textarea on document load after storing
             * the original height and the original length
             */
            $textarea.data('original-height', $textarea.height());
            $textarea.data('previous-length', this.value.length);
            Forms.textareaAutoResize($textarea);
        });

        $(document).on('keyup', text_area_selector, function () {
            Forms.textareaAutoResize($(this));
        });
        $(document).on('keydown', text_area_selector, function () {
            Forms.textareaAutoResize($(this));
        });

        // File Input Path
        $(document).on('change', '.file-field input[type="file"]', function () {
            let file_field = $(this).closest('.file-field');
            let path_input = file_field.find('input.file-path');
            let files = $(this)[0].files;
            let file_names = [];
            for (let i = 0; i < files.length; i++) {
                file_names.push(files[i].name);
            }
            path_input[0].value = file_names.join(', ');
            path_input.trigger('change');
        });
    }); // End of $(document).ready
}

initHeader();
// init3dTour();
initBookingSlider();
// initFaqCollapse();
initCollapse();
initForms();

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
    selector: '.slick-slide:not(.slick-cloned)',
    animationEffect: "fade",
    transitionEffect: "slide",
});