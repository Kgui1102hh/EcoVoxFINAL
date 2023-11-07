(function ($) {
    "use strict";

    var app = function () {
        var main = undefined;
        var menu = undefined;
        var menuItems = undefined;
        
        var init = function init() {
            main = $('.main');
            menu = $('.menu-icon');
            menuItems = $('.nav__list-item');
            applyListeners();
        };
        
        var applyListeners = function applyListeners() {
            menu.on('click', function () {
                toggleClass(main, 'nav-active');
            });
        };
        
        var toggleClass = function toggleClass(element, stringClass) {
            if (element.hasClass(stringClass)) {
                element.removeClass(stringClass);
            } else {
                element.addClass(stringClass);
            }
        };
        
        init();
    }();
})(jQuery);

