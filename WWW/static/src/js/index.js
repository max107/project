import $ from 'jquery';
import Modal from './vendor/modal';
import FastClick from 'fastclick';
import fb from 'fancybox';
fb($);

import 'slick-carousel';

$(document)
    .on('click', '.mmodal', e => {
        e.preventDefault();
        let m = new Modal({
            width: 750
        });
        m.url(e.target.getAttribute('href'));
    })
    .on('click', '.mobile-menu-link', function (e) {
        e.preventDefault();
        let $helper = $('.mobile-menu-helper');
        $('.mobile-menu').addClass('open');
        $helper.show();
        setTimeout(() => {
            $helper.addClass('open');
        }, 300);
    })
    .on('click', '.mobile-menu-helper', function (e) {
        e.preventDefault();
        let $helper = $('.mobile-menu-helper');
        $('.mobile-menu').removeClass('open');
        $helper.removeClass('open');
        setTimeout(() => {
            $helper.hide();
        }, 300);
    })
    // Avatar animation
    .on('mouseenter', '.animation-flip', function (e) {
        $(this).addClass('on');
    })
    .on('mouseleave', '.animation-flip', function (e) {
        var $this = $(this);
        setTimeout(function () {
            $this.removeClass('on');
        }, 400);
    });

$(() => {
    FastClick.attach(document.body);

    $("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").attr('rel', 'gallery').fancybox({
        margin: [40, 0, 40, 0]
    });

    $(".service-logo-slider").slick({
        lazyLoad: 'ondemand',
        infinite: true,
        arrows: false,
        dots: true,
        auto: true,
        mobileFirst: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
});