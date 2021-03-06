var widthPoint = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1230
};

/**
 * anchor.js - jQuery Plugin
 * Jump to a specific section smoothly
 *
 * @dependencies    jQuery v1.5.0 http://jquery.com
 * @author            Cornel Boppart <cornel@bopp-art.com>
 * @copyright        Author

 * @version        1.0.5 (02/11/2014)
 */

;
(function ($) {

    window.anchor = {

        /**
         * Default settings
         *
         */
        settings: {
            transitionDuration: 2000,
            transitionTimingFunction: 'swing',
            labels: {
                error: 'Couldn\'t find any section'
            }
        },

        /**
         * Initializes the plugin
         *
         * @param    {object}    options    The plugin options (Merged with default settings)
         * @return    {object}    this    The current element itself
         */
        init: function (options) {
            // Apply merged settings to the current object
            $(this).data('settings', $.extend(anchor.settings, options));

            return this.each(function () {
                var $this = $(this);

                $this.unbind('click').click(function (event) {
                    event.preventDefault();
                    anchor.jumpTo(
                        anchor.getTopOffsetPosition($this),
                        $this.data('settings')
                    );
                });
            });
        },

        /**
         * Gets the top offset position
         *
         * @param    {object}    $object                The root object to get sections position from
         * @return    {int}        topOffsetPosition    The top offset position
         */
        getTopOffsetPosition: function ($object) {
            var href = $object.attr('href'),
                $section = $($(href).get(0)),
                documentHeight = $(document).height(),
                browserHeight = $(window).height();

            if (!$section || $section.length < 1) {
                throw new ReferenceError(anchor.settings.labels.error);
            }

            if (($section.offset().top + browserHeight) > documentHeight) {
                return documentHeight - browserHeight;
            } else {
                return $section.offset().top;
            }
        },

        /**
         * Jumps to the specific position
         *
         * @param    {int}        topOffsetPosition    The top offset position
         * @param    {object}    settings            The object specific settings
         * @return    {void}
         */
        jumpTo: function (topOffsetPosition, settings) {
            var $viewport = $('html, body');

            $viewport.animate({
                    scrollTop: topOffsetPosition
                },
                settings.transitionDuration,
                settings.transitionTimingFunction
            );

            // Stop the animation immediately, if a user manually scrolls during the animation.
            $viewport.bind('scroll mousedown DOMMouseScroll mousewheel keyup', function (event) {
                if (event.which > 0 || event.type === 'mousedown' || event.type === 'mousewheel') {
                    $viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup');
                }
            });
        }

    };

    $.fn.anchor = function (method) {
        // Method calling logic
        if (anchor[method]) {
            return anchor[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return anchor.init.apply(this, arguments);
        } else {
            return $.error('Method ' + method + ' does not exist on jQuery.anchor');
        }
    };

})(jQuery);


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

    if (!$header.data('fixed')) {
        fixedHeader();

        $(window).scroll(fixedHeader);
        $(window).resize(fixedHeader);
    } else {

        $header.addClass('fixed');
    }


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


        var curLoc = $(this).attr('id');

        try {
            history.pushState(null, null, location.pathname + '#' + curLoc);
        } catch(e) {}
        location.hash = '#' + curLoc;

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
    });

    if ($buttonCollapse.length > 0) {
        var $activeQuestion = $(location.hash);

        if ($activeQuestion.length > 0) {
            $('html, body').animate({
                    scrollTop: $activeQuestion.offset().top - 80
                }
            );

            $activeQuestion.find('[data-collapse="button"]').addClass('active');
            $activeQuestion.find('[data-collapse="body"]').css('height', $activeQuestion.find('[data-collapse="body"]').children().innerHeight());


            var $collapse;

            if ($activeQuestion.data('target')) {
                $collapse = $($activeQuestion.data('target'));
            } else {
                $collapse = $activeQuestion.parent().children('[data-collapse="body"]');
            }

            $activeQuestion.addClass('active');
            $collapse.css('height', $collapse.children().innerHeight());
        }
    }
}

function initForms() {

    var Forms = {
        keys: {TAB: 9, ENTER: 13, ESC: 27, ARROW_UP: 38, ARROW_DOWN: 40}
    };
    // Function to update labels of text fields
    Forms.updateTextFields = function () {
        var input_selector =
            'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';
        $(input_selector).each(function (index, element) {
            var $this = $(this);

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
        var hasLength = object.attr('data-length');
        var lenAttr = parseInt(object.attr('data-length'));
        var len = object[0].value.length;

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
        var hiddenDiv = $('.hiddendiv').first();
        if (!hiddenDiv.length) {
            hiddenDiv = $('<div class="hiddendiv common"></div>');
            $('body').append(hiddenDiv);
        }

        // Set font properties of hiddenDiv
        var fontFamily = $textarea.css('font-family');
        var fontSize = $textarea.css('font-size');
        var lineHeight = $textarea.css('line-height');

        // Firefox can't handle padding shorthand.
        var paddingTop = $textarea.css('padding-top');
        var paddingRight = $textarea.css('padding-right');
        var paddingBottom = $textarea.css('padding-bottom');
        var paddingLeft = $textarea.css('padding-left');

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
        var content = hiddenDiv.html().replace(/\n/g, '<br>');
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
        var input_selector =
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
            var formReset = $(e.target);
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
                var $inputElement = $(e.target);
                if ($inputElement.is(input_selector)) {
                    var selector = '.prefix';

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
        var radio_checkbox = 'input[type=radio], input[type=checkbox]';
        $(document).on('keyup', radio_checkbox, function (e) {
            // TAB, check if tabbing to radio or checkbox.
            if (e.which === Forms.keys.TAB) {
                $(this).addClass('tabbed');
                var $this = $(this);
                $this.one('blur', function (e) {
                    $(this).removeClass('tabbed');
                });
                return;
            }
        });

        var text_area_selector = '.textarea';
        $(text_area_selector).each(function () {
            var $textarea = $(this);
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
            var file_field = $(this).closest('.file-field');
            var path_input = file_field.find('input.file-path');
            var files = $(this)[0].files;
            var file_names = [];
            for (var i = 0; i < files.length; i++) {
                file_names.push(files[i].name);
            }
            path_input[0].value = file_names.join(', ');
            path_input.trigger('change');
        });
    }); // End of $(document).ready
}

function initBookingPopup() {
    //
    // $('.booking-seat-info__gallery').each(function (i) {
    //     $(this).slick();
    // });

    var $bookingPopup = $(".booking-pop-up"),
        $seat = $('.booking-ships__position'),
        $parentContainer,
        popupTimer,
        slickInit = false;

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset,
            bottom: box.bottom + pageYOffset,
            right: box.right + pageXOffset
        };
    }


    $bookingPopup.hide();


    if (document.documentElement.clientWidth >= widthPoint.lg) {
        $seat.on('mouseover', function () {
            clearTimeout(popupTimer);
            // console.log();
            $('.booking-seat-info').hide();
            $($(this).data('target')).show();

            // $('.booking-seat-info__gallery').slick('unslick');
            // $($(this).data('target')).find('.booking-seat-info__gallery').slick();

            // $bookingPopup.empty().append( $($(this).data('target')).clone(true) );

            if (!$($(this).data('target')).find('.booking-seat-info__gallery').hasClass('slick-slider')) {
                // $bookingPopup.find('.booking-seat-info__gallery').slick();
                $($(this).data('target')).find('.booking-seat-info__gallery').slick();
                // slickInit = true;
            }

            $bookingPopup.show();

            $bookingPopup.removeClass('r-t');
            $bookingPopup.removeClass('r-b');
            $bookingPopup.removeClass('l-t');
            $bookingPopup.removeClass('l-b');


            // show popup
            var seatPos = getCoords(this),
                popupHeight = 446,
                popupWidth = 688;

            if (document.documentElement.clientWidth - seatPos.left < popupWidth) { // Слева от места

                if (this.getBoundingClientRect().top < popupHeight) { // Под местом
                    $bookingPopup.css({"top": seatPos.bottom + 20, "left": seatPos.right - popupWidth + 30});
                    $bookingPopup.addClass('r-t');
                } else { // Над местом
                    $bookingPopup.css({"top": seatPos.top - popupHeight - 20, "left": seatPos.right - popupWidth + 30});
                    $bookingPopup.addClass('r-b');
                }
            } else {
                if (this.getBoundingClientRect().top < popupHeight) {
                    $bookingPopup.css({"top": seatPos.bottom + 20, "left": seatPos.left - 30});
                    $bookingPopup.addClass('l-t');
                } else {
                    $bookingPopup.css({"top": seatPos.top - popupHeight - 20, "left": seatPos.left - 30});
                    $bookingPopup.addClass('l-b');
                }
            }

        });

        $seat.on('mouseout', function () {
            popupTimer = setTimeout(function () {
                $bookingPopup.hide();
                // $('.booking-seat-info__gallery').slick('unslick');
                // $bookingPopup.removeClass('r-t');
                // $bookingPopup.removeClass('r-b');
                // $bookingPopup.removeClass('l-t');
                // $bookingPopup.removeClass('l-b');
            }, 500)
        });


        $bookingPopup.on('mouseover', function () {
            // $('.booking-seat-info__gallery').slick();
            clearTimeout(popupTimer);
        });

        $bookingPopup.on('mouseout', function () {
            popupTimer = setTimeout(function () {
                // $('.booking-seat-info__gallery').slick('unslick');
                $bookingPopup.hide();
            }, 500)
        })
    } else {
        $seat.on('click', function () {
            $('body').css('overflow', 'hidden');
            $('.booking-seat-info').hide();
            $($(this).data('target')).show();
            if (!$($(this).data('target')).find('.booking-seat-info__gallery').hasClass('slick-slider')) {
                // $bookingPopup.find('.booking-seat-info__gallery').slick();
                $($(this).data('target')).find('.booking-seat-info__gallery').slick({

                    centerMode: true,
                    variableWidth: true,
                    centerPadding: '60px',
                    dots: true,
                    arrows: false
                });
                // slickInit = true;
            }
            $bookingPopup.show();
        });
        $('.booking-pop-up__close').on('click', function () {
            $bookingPopup.hide();
            $('body').css('overflow', '');
        })
    }
}

function initCatamaram3d() {

    var $catamaran3d = $('.catamaran-3d__view'),
        activeIndex = 3;

    $catamaran3d.children().hide();
    $catamaran3d.children().eq(activeIndex).show();

    $('.catamaran-3d__btn-left').on('click', function () {


        activeIndex++;

        if (activeIndex > 15) {
            activeIndex = 0;
        }

        $catamaran3d.children().hide();
        $catamaran3d.children().eq(activeIndex).show();
    });
    $('.catamaran-3d__btn-right').on('click', function () {
        activeIndex--;

        if (activeIndex < 0) {
            activeIndex = 15;
        }

        $catamaran3d.children().hide();
        $catamaran3d.children().eq(activeIndex).show();
    });

    $catamaran3d.on('mousedown', function (e) {
        e.preventDefault();

        var startDrag = e.pageX,
            activeIndexDrag;

        function handler(e) {

            activeIndexDrag = activeIndex + Math.floor((startDrag - e.pageX) / 40);
            activeIndexDrag = activeIndexDrag % 15;

            $catamaran3d.children().hide();
            $catamaran3d.children().eq(activeIndexDrag).show();
        }

        $(window).on('mousemove.catamaran', handler);

        $catamaran3d.on('mouseup.catamaran', function h() {
            activeIndex = activeIndexDrag;
            $(window).off('mousemove.catamaran', handler);
            $catamaran3d.off('mouseup.catamaran', h);
        });

        $catamaran3d.on('dragstart', function () {
            return false;
        });
    });
}

function initSpinner() {
    var total = 0,
        totalMax = 12;

    $('.spinner').each(function (i, e) {
        var val = +$(e).children('.spinner__val').html();

        total += val;

        $(e).children('.spinner__btn-down').on('click', function () {
            if (val > 0) {
                val--;
                total--;
                $(e).children('.spinner__val').html(val);
            }
        });

        $(e).children('.spinner__btn-up').on('click', function () {
            if (total < totalMax) {
                val++;
                total++;
                $(e).children('.spinner__val').html(val);
            }
        });
    })
}

function initMaps() {

    $('[data-day-link]').on('click', function (e) {
        e.preventDefault();

        var day = $(this).data('day-link');

        $('[data-day-link]').removeClass('active');
        $(this).addClass('active');

        $('[data-day]').removeClass('active');
        $('[data-day=' + day + ']').addClass('active');

        $('.map__area').removeClass('active');
        $('.day-' + day).addClass('active');

    });

    $('.map__day').on('click', function (e) {
        e.preventDefault();

        var t = $(this).data('day');

        $('.map__day').removeClass('active');
        $(this).addClass('active');

        $('.map__area').removeClass('active');
        $('.day-' + t).addClass('active');


        $('[data-day-link]').removeClass('active');
        $('[data-day]').removeClass('active');
        $('[data-day=' + t + ']').addClass('active');
        $('[data-day-link=' + t + ']').addClass('active');
    });
    $('.map__day').on('mouseover', function () {
        var t = $(this).data('day');

        $('.map__area').removeClass('hover');
        $('.day-' + t).addClass('hover');
    });
    $('.map__day').on('mouseout', function () {
        // var t = $(this).data('day');

        $('.map__area').removeClass('hover');
        // $('.day-' + t).addClass('active');
    });
}

function initParallax() {
    var startX, startY, offsetX, offsetY;
    $('.section-captain').on('mouseenter', function (e) {
        startX = e.pageX;
    });
    $('.section-captain').on('mousemove.parallax', function (e) {
        offsetX = e.pageX - window.pageXOffset - startX;
        offsetY = e.pageY - window.pageYOffset - this.getBoundingClientRect().top;

        $('.captain-photo__photo').css('transform', 'translateY(' + (offsetX) / 30 + 'px)');
        $('.captain-photo__waves').css('transform', 'translateX(' + (offsetY) / 20 + 'px)');
        $('.btn-view-video').css('transform', 'translateY(' + (offsetX) / 30 + 'px)');
    });

    $('body').on('mousemove.parallax', function (e) {
        offsetX = e.pageX - window.pageXOffset - document.documentElement.clientWidth / 2;
        offsetY = e.pageY - window.pageYOffset - document.documentElement.clientHeight / 2;

        // console.log(offsetX, offsetY);

        $('[data-parallax]').each(function () {
            $(this).css('transform', 'translate(' + (offsetX * $(this).data('parallax')[0]) + 'px,' + (offsetY * $(this).data('parallax')[1]) + 'px)');
        })
    });
}

function initTooltip() {
    var showingTooltip;

    $('[data-tooltip]').on("mouseover", function () {

        var tooltip = $(this).data('tooltip');
        if (!tooltip) return;

        var tooltipElem = document.createElement('div');
        tooltipElem.className = 'tooltip';
        tooltipElem.innerHTML = tooltip;
        document.body.appendChild(tooltipElem);

        var coords = this.getBoundingClientRect();

        var left = coords.left + window.pageXOffset - 42;

        if (left < 0) {
            left = 0;
        } // не вылезать за левую границу окна

        var top = coords.top - tooltipElem.offsetHeight - 20 + window.pageYOffset;

        if (coords.top - tooltipElem.offsetHeight - 20 < 0) { // не вылезать за верхнюю границу окна
            top = coords.top + this.offsetHeight + 20 + window.pageYOffset;
            tooltipElem.classList.add('l-t');
        } else {
            tooltipElem.classList.add('l-b');
        }


        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';

        showingTooltip = tooltipElem;
    });

    $('[data-tooltip]').on("mouseout", function () {
        if (showingTooltip) {
            document.body.removeChild(showingTooltip);
            showingTooltip = null;
        }
    });
}

function initBookingFirstStep() {

    $('[data-first-step]').on('click', function () {
        $('.booking-first-step').fadeIn();
        $('body').css('overflow', 'hidden');
    });
    $('.booking-first-step__close').on('click', function () {
        $('.booking-first-step').fadeOut();
        $('body').css('overflow', '');
    });
}


$(document).ready(function () {

    initHeader();
// init3dTour();
    initBookingSlider();
// initFaqCollapse();
    initCollapse();
    initForms();
    initBookingPopup();
    initCatamaram3d();
    initSpinner();
    initMaps();
    initParallax();
    initTooltip();
    initBookingFirstStep();

    $('.special-offer-mobile__close').on('click', function () {
        $('.special-offer-mobile').hide();
    });
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
                    variableWidth: true,
                    infinite: true,
                    slidesToShow: 1
                    // draggable: true
                    // centerPadding: '40px',
                    // slidesToShow: 1
                }
            }
        ]
    });

    $('.booking-gallery').slick({
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: true,
        dots: true
    });

    $('[data-fancybox="images"]').fancybox({
        selector: '.gallery .slick-slide:not(.slick-cloned)',
        animationEffect: "fade",
        transitionEffect: "slide",
    });

    $('a[data-anchor]').anchor({
        transitionDuration: 1000
    });

    $('.uniqueness__item-1').viewportChecker();
    $('.uniqueness__item-2').viewportChecker();
    $('.uniqueness__item-3').viewportChecker();
    $('.program-badge').viewportChecker();
    $('.second-section__img').viewportChecker();
    $('.route-text').viewportChecker();


});