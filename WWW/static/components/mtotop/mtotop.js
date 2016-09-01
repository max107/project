(function($) {
    'use strict';

    $.fn.extend({
        totop: function(options) {
            this.defaultOptions = {
                container: '#wrapper',
                offset: 200,
                margin: 0,
                animation: true,
                animationSpeed: 300
            };

            var settings = $.extend({}, this.defaultOptions, options);

            var ToTop = function(link, options) {
                this.init(link, options);
            };

            ToTop.prototype = {
                $linkContainer: undefined,
                $contentContainer: undefined,
                init: function(link, options) {
                    var me = this;

                    this.options = $.extend({
                        offset: 100,
                        animation: true,
                        animationSpeed: 300,
                        container: undefined
                    }, options);

                    this.$contentContainer = $(this.options.container);
                    this.$linkContainer = $(link);

                    // если вам не нужно, чтобы кнопка подстраивалась под ширину экрана - удалите следующие четыре строчки в коде
                    this._resizeHandler();
                    $(window)
                        .on('resize', function(e) {
                            return me._resizeHandler.call(me, e);
                        })
                        .on('scroll', function(e) {
                            return me._scrollHandler.call(me, e);
                        });


                    this.$linkContainer.on('click', this._clickHandler);
                },
                _resizeHandler: function() {
                    var h = this.$contentContainer.offset().left;

                    if (h < this.options.offset) {
                        // если кнопка не умещается, скрываем её
                        this.$linkContainer.hide();
                    } else {
                        if ($(window).scrollTop() >= this.options.offset) {
                            this.$linkContainer.show();
                        }

                        this.$linkContainer.css({
                            width: h - this.options.margin
                        });
                    }
                },
                _scrollHandler: function(e) {
                    var options = this.options;

                    if ($(window).scrollTop() >= options.offset) {
                        if (options.animation == true) {
                            this.$linkContainer.fadeIn(options.animationSpeed);
                        } else {
                            this.$linkContainer.show();
                        }
                    } else {
                        if (options.animation == true) {
                            this.$linkContainer.fadeOut(options.animationSpeed);
                        } else {
                            this.$linkContainer.hide();
                        }
                    }
                },
                _clickHandler: function(e) {
                    e.preventDefault();
                    var $top = (window.opera) ? ((document.compatMode == "CSS1Compat") ? $('html') : $('body')) : $('html,body');
                    $top.animate({
                        scrollTop: 0
                    }, 500);
                    return false;
                }
            };

            return this.each(function() {
                return new ToTop(this, settings);
            });
        }
    });
})(jQuery);
