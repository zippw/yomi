var video;
var progress;
var interval;
var ctx;
var iii;
const playVideo = function (ctx, interval) {
    ctx.querySelector('img').style.opacity = '0';
    ctx.querySelector('.progressVid').style.transform = 'translateY(0)'; ctx.querySelector('.progressVid').style.opacity = '1';
    ctx.querySelector('video').play();
    ctx.querySelector('.playbtn').style.opacity = "0";
    ctx.querySelector('.playbtn').style.transform = "translate(-50%, -50%) scale(0)";
    this.interval = setInterval(function () {
        ctx.querySelector('.progressVid').style.width = ((ctx.querySelector('video').currentTime) * 100) / (ctx.querySelector('video').duration) + '%';
        // if(((ctx.querySelector('video').currentTime) * 100) / (ctx.querySelector('video').duration) >= 95) ctx.querySelector('.progressVid').style.opacity = 0
        // ctx.querySelector('.progressVid').style.opacity = (((ctx.querySelector('video').duration - ctx.querySelector('video').currentTime) * 100) /(ctx.querySelector('video').duration)/100);
    }, 1000)
}
const stopVideo = function (ctx, interval) {
    clearInterval(this.interval);
    ctx.querySelector('.progressVid').style.transform = 'translateY(3px)';
    ctx.querySelector('.playbtn').style.opacity = "1";
    ctx.querySelector('.playbtn').style.transform = "translate(-50%, -50%) scale(1)";
    ctx.querySelector('.progressVid').style.opacity = '0'; ctx.querySelector('img').style.opacity = '1';
    setTimeout(() => { ctx.querySelector('video').load() }, 300);
}
const mobile = function () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        anime.timeline()
            .add({
                targets: '.preloader',
                opacity: 0,
                duration: 300,
                easing: 'linear',
                complete: () => {document.querySelector('.preloader').style.display="none"}
            })
            .add({
                targets: '.branding__content .inner .word',
                opacity: [0, 1],
                duration: 1000,
                easing: 'easeInOutQuart',
                delay: (el, i) => 34 * (i + 1)
            })
            .add({
                targets: '.branding__content .inner h1 svg',
                scale: [0, 1],
                duration: 800
            }, '-=800')
            .add({
                targets: '.branding__content h2',
                opacity: [0, 1],
                duration: 1000,
                easing: 'easeOutSine'
            }, '-=800')
            .add({
                targets: '.branding__content .buttons button, .branding__content .buttons .sep',
                opacity: [0, 1],
                translateY: ['10px', 0],
                duration: 1000,
                delay: (el, i) => 80 * (i + 1)
            }, '-=800')
            .add({
                targets: '.navbar h1, .navbar a',
                opacity: [0, 1],
                translateX: ['-10px', 0],
                duration: 1000,
                delay: (el, i) => 34 * (i + 1)
            }, '-=1000')
            .add({
                targets: '.landing .frame',
                translateY: ['-20px', 0],
                translateX: ['20px', 0],
                opacity: [0, 1],
                duration: 1000
            }, '-=1700')
    }, 500);
    if (window.matchMedia('(min-width:600px)').matches !== true) {
        $('.portfolio__item.swiper-slide').wrapAll('<div class="swiper-wrapper">');
        const portfolioSwiper = new Swiper('.portfolioSwiper', {
            direction: 'horizontal',
            grabCursor: true,
            slidesPerView: 1,
            loop: true,
            effect: 'coverflow',
            autoplay: {
                delay: 5000
            },
            coverflowEffect: {
                slideShadows: false,
            },
            pagination: {
                el: '.swiper-pagination',
                // dynamicBullets: true,
                // dynamicMainBullets: 3,
                type: 'bullets',
                clickable: true,
            }
        });
    }
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: false
    });
    document.getElementById('scrollToJoin').addEventListener("click", () => { if (mobile()) { setTimeout(() => { scroll.scrollTo(document.querySelector('#join')) }, 500) } else { scroll.scrollTo(document.querySelector('#join')) } }, false);
    document.querySelector('.scrollDown').addEventListener("click", () => { if (mobile()) { setTimeout(() => { scroll.scrollTo(document.querySelector('h1.landing__title.highlight__title#Portfolio')) }, 500) } else { scroll.scrollTo(document.querySelector('h1.landing__title.highlight__title#Portfolio')) } }, false);
});