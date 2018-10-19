$(document).ready(function(){

    //
    //  Cached variables
    //
    var $header = $('.header');
    var $form = $('.form');
    var $success = $('.form-success');
    var $faq = $('.faq');
    //var timer = setInterval(carouselHighlight, 2000);
    var $carousel = $('.people__slider__carousel').find('li');

    //
    //  Animation
    //
    $header.addClass('js-animate');
    $header.on('click', function(){
        $(this).toggleClass('js-animate');
    });

    //
    //  People Carousel
    //
    function carouselHighlight() {
        
    }
    function carouselNext() {
        var $active = $carousel.filter('.js-active');

        $active.removeClass('js-active');
        if ($carousel.length - 1 > $active.index()) {
            $active.next().addClass('js-active');
        } else {
            $carousel.first().addClass('js-active');
        }
    }
    function carouselPrev() {
        var $active = $carousel.filter('.js-active');
        console.log('active index: '+$active.index());
        $active.removeClass('js-active');
        if ($active.index() != 0) {
            $active.prev().addClass('js-active');
        } else {
            console.log('go to last');
            $carousel.last().addClass('js-active');
        }
    }
    $('.people__slider__next').on('click', function(e){
        e.preventDefault();
        //clearInterval(timer);
        $(this).removeClass('js-highlight');
        carouselNext();
    });
    $('.people__slider__prev').on('click', function(e){
        e.preventDefault();
        //clearInterval(timer);
        $(this).removeClass('js-highlight');
        carouselPrev();
    });
    // Random Number in range
    // http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
    function randomNum (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    $carousel.eq( randomNum(0, $carousel.length-1) ).addClass('js-active');
    $('.people__slider__next').toggleClass('js-highlight');
    $('.people__slider__next').hover(function(){
        $(this).removeClass('js-highlight');
    });

    //
    //  Form
    //
    $form.on('click focus', 'input', function(){
        $form.find('li.js-focus').removeClass('js-focus');
        $(this).parent().addClass('js-focus');
    });

    $form.validate({
        rules: {
            company: 'required',
            URL: 'required',
            first_name: 'required',
            last_name: 'required',
            email: {
                required: true,
                email: true
            },
            acceptance: 'required'
        },
        messages: {
            company: 'Please, enter your startup\'s name',
            URL: 'Please, enter your startup\'s website',
            first_name: 'Please, enter your first name',
            last_name: 'Please, enter your last name',
            email: {
                required: 'Please, enter your email',
                email: 'Please, enter a proper email address'
            },
            acceptance: 'Please, accept the Terms of Service and Privacy Policy'
        }
    });

    if (window.location.hash.indexOf('success') > -1) {
        $form.hide();
        $success.show();
    } else {
        $form.show();
        $success.hide();
    }

    //
    //  FAQ Sections
    //
    $faq.hide().find('li').each(function(){
        $(this).addClass('js-faq-hide');
    });

    $('.learn-more').on('click', function(e){
        var curPos;
        e.preventDefault();

        if ($(this).hasClass('js-faq-open')) {
            $(this).removeClass('js-faq-open');
            $faq.hide();
        } else {
            $(this).addClass('js-faq-open');
            $faq.show();
            curPos = $(window).scrollTop();
            $(window).scrollTop(curPos + 100);
        }
    });

    $('.faq__header').on('click', function(e){
        e.preventDefault();
        $(this).parents('li').toggleClass('js-faq-show');
    });
});
