$.fn.Selector = function(options) {
    var self = {};
    var selectorMidLine, sIndex, arrows, currentTop, margin = {},
        allowSetSelected = true;
    var selector = $(this);
    var initialized = false;
    var settings = $.extend({
        clickToOpen: false,
        setActiveOnClick: true,
        checkedClass: 'checked',
        setOrder: true,
        transitionTime: 300,
        valueAttr: 'data-value',
        arrows: 300,
        onSelectorChange: false,
        onActiveChange: false,
        onCheckedChange: false,
        onGoTo: false
    }, options);

    console.log(options);

    return this.each(function(i, el) {


        var init = function(callback) {
            if (settings.init) {
                var initInterval = setInterval(function() {
                    if (initialized) {
                        clearInterval(initInterval);
                    } else {
                        initialize();
                    }
                }, 1000);
            }

            if (settings.arrows) {
                arrows = $('<div>').addClass('selector-arrows');
                arrows.append($('<a>').addClass('selector-arrows-up').on('click', function() {
                    goToOption('up');
                }));
                arrows.append($('<a>').addClass('selector-arrows-down').on('click', function() {
                    goToOption('down');
                }));
                selector.prepend(arrows);
            }

            // Click Actions

            if (!settings.clickToOpen) {
                selector.on('click', 'li', function(e) {
                    e.preventDefault();
                    scrollToSelected($(this));
                });
            }

            if (settings.setActiveOnClick) {
                selector.on('click', 'li a', function(e) {
                    var clickedElement = $(this);
                    setActive(selector, $(this).parent());
                    scrollToSelected($(this).parent());
                    if (!settings.clickToOpen) {
                        e.preventDefault();
                    }
                    selector.find('.active').each(function() {
                        $(this).removeClass('active');
                    });
                    $(this).parent().addClass('active');
                });
            }

            // On Active change
            selector.on('activeChange', function() {
                if (isFunction(settings.onActiveChange)) {
                    settings.onActiveChange();
                }
            });
            // On Checked change
            selector.on('checkedChange', function() {
                if (isFunction(settings.onCheckedChange)) {
                    settings.onCheckedChange();
                }
            });
            // On Checked change
            selector.on('selectorChange', function() {
                if (isFunction(settings.onSelectorChange)) {
                    settings.onSelectorChange();
                }
            });
            // On Checked change
            selector.on('selectorChange', function() {
                if (isFunction(settings.onSelectorChange)) {
                    settings.onSelectorChange();
                }
            });
            // On Checked change
            selector.on('goTo', function() {
                if (isFunction(settings.onGoTo)) {
                    console.log('hoi');
                    // setSelected();
                }
            });

            // When leaving the Selector
            selector.mouseleave(function() {
                setTimeout(function() {
                    scrollToSelected(selector.find('li.' + settings.checkedClass));
                }, 200);
            });

            // When scrolling into Selector
            selector.scroll(function() {
                setSelected(selector);
                currentTop = selector.scrollTop();
                if (settings.arrows) {
                    keepArrowsInPlace();
                }
            });
            if (callback && typeof(callback) === "function") {
                callback();
            }
        };

        // Check if var is function
        var isFunction = function isFunction(functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        };
        var initialize = function initialize() {
            if (!initialized) {
                initSelector(selector);
                scrollToSelected(selector.find('li.' + settings.activeClass));
                if (settings.arrows) {
                    keepArrowsInPlace();
                }
                console.log('Selector: #' + $(this).attr('id') + ' initialized');
                initialized = true;
            }
        };


        // Create Functions

        var goToUrl = function goToUrl(el) {
            setTimeout(function() {
                if (el.attr('href').length() > 0) {
                    window.location.href = el.attr('href');
                } else if (el.attr('data-url').length > 0) {
                    window.location.href = el.attr('data-url');
                }
            }, settings.transitionTime);
        };

        var scrollToSelected = function scrollToSelected(el) {
            var scrollToIndex = el.index();
            var scrollToPx = scrollToIndex * el.outerHeight();
            selector.animate({
                scrollTop: scrollToPx
            }, settings.transitionTime);
            //  setSelected(selector);
        };

        var initSelector = function initSelector(selector) {
            selectorMidLine = selector.outerHeight() / 2;
            var checked = selector.find('li.' + settings.checkedClass);
            setActive(selector, checked);
            setChecked(selector, checked);

            margin.top = (selectorMidLine - (checked.outerHeight() / 2));
            margin.bottom = margin.top;
            if (settings.arrows) {
                //    margin.top = margin.top - arrows.outerHeight();
            }
            selector.find('ul').css({
                'margin-top': margin.top,
                'margin-bottom': margin.bottom
            });
            initialized = true;
        };

        var setSelected = function setSelected(selector) {
            selector.find('li').each(function() {
                if ($(this).position().top < selectorMidLine && ($(this).position().top + $(this).outerHeight()) > selectorMidLine && !$(this).hasClass('checked')) {
                    sIndex = $(this).index();
                    selector.find('li').each(function() {
                        $(this).removeClass('checked').attr('data-order', sIndex - $(this).index());
                    });
                    $(this).addClass('checked');
                    setChecked(selector, $(this));
                }
            });
        };

        var setChecked = function setChecked(selector, el) {
            selector.attr('data-checked', el.attr(settings.valueAttr)).triggerAll('checkedChange selectorChange');
        };
        var setActive = function setActive(selector, el) {
            selector.attr('data-active', el.attr(settings.valueAttr)).triggerAll('activeChange selectorChange');
        };

        var keepArrowsInPlace = function keepArrowsInPlace(selector) {
            arrows.css('top', selectorMidLine + currentTop);
        };

        var goToOption = function goToOption(goto) {
            var goIndex;
            if (goto === 'up') {
                goIndex = selector.find('li.' + settings.checkedClass).index() - 1;
            } else if (goto === 'down') {
                goIndex = selector.find('li.' + settings.checkedClass).index() + 1;
            } else {
                goIndex = goto;
            }
            scrollToSelected(selector.find('li:eq(' + goIndex + ')'));
        };

        var underline = function() {
            $(el).addClass("underline");
        };

        var goto = function(callback) {
            scrollToSelected($(settings.goto));
            if (isFunction(callback)) {
                callback();
            }
        };

        if (settings.init) {
            init();
        }
        if (settings.goto) {
            goto(settings.goto);
        }
    });


};

(function($) {
    $.fn.extend({
        triggerAll: function(events, params) {
            var el = this,
                i, evts = events.split(' ');
            for (i = 0; i < evts.length; i += 1) {
                el.trigger(evts[i], params);
            }
            return el;
        }
    });
})(jQuery);
