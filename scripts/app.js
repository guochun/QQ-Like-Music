; (function () {

    let deviceWidth = document.documentElement.clientWidth;


    let slider = new Slider({
        el: document.querySelector('#slider'),
        sliderWidth: deviceWidth,
        sliders: [
            { link: 'javascript:;', img: './images/slider_1.jpg' },
            { link: 'javascript:;', img: './images/slider_2.jpg' },
            { link: 'javascript:;', img: './images/slider_3.jpg' },
            { link: 'javascript:;', img: './images/slider_4.jpg' },
            { link: 'javascript:;', img: './images/slider_5.jpeg' },
        ],
    });
    slider.init();
    window.slider = slider;

})();