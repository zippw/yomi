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
    // TEAM RENDER
    fetch('https://mainzippapi3000.herokuapp.com/api/yomi_members').then(responce => responce.json()).then(result => {
        console.log(result);
        result.forEach(el => {
            $(`
        <div class="card swiper-slide">
            <header class="header cardH">
            <img class="avatar" src="${el.a}" onerror="this.src='img/website/avatar.gif'" alt='Аватар пользователя'>
            </header>
        <div class="sep"></div>
        <div class="cardT">
            <h1>${el.n}</h1>
            <p>${el.s}</p>
        </div>`).appendTo(document.getElementById('yomi_members'));
        });
        let index = 0;
        setTimeout(() => {
            anime.timeline()
                .add({
                    targets: '#yomi_members .card.swiper-slide.loading',
                    delay: anime.stagger(100),
                    duration: 500,
                    opacity: 0,
                    easing: 'easeInOutCubic',
                    complete: (el, i) => {
                        document.querySelectorAll('#yomi_members .card.swiper-slide.loading').forEach(el => {
                            el.remove()
                        });
                        anime({
                            targets: '.card.swiper-slide:not(.loading)',
                            translateY: ['-20px', 0],
                            opacity: 1,
                            duration: 500,
                            delay: anime.stagger(50),
                        })
                        const teamSwiper = new Swiper('.teamSwiper', {
                            direction: 'horizontal',
                            freeMode: true,
                            grabCursor: true,
                            speed: 1000,
                            //- spaceBetween: 30,
                            width: 200,
                            slidesPerView: 'auto'
                        });
                    }
                })
        }, 1000);
    })
    fetch('https://mainzippapi3000.herokuapp.com/api/yomi_projects').then(responce => responce.json()).then(result => {
        console.log(result);
        const currentDate = (new Date).getTime(), timeDifference = function (e, t) { var n = e - t; return n < 6e4 ? Math.round(n / 1e3) + " сек назад" : n < 36e5 ? Math.round(n / 6e4) + " мин назад" : n < 864e5 ? Math.round(n / 36e5) + "ч назад" : n < 2592e6 ? Math.round(n / 864e5) + " д назад" : n < 31536e6 ? Math.round(n / 2592e6) + " мес назад" : Math.round(n / 31536e6) + " г назад" };
        result.forEach((el, i) => {
            $(`
            <div class="portfolio__item swiper-slide item-${i + 1}" data-scroll="" onmouseenter="ctx=this; playVideo(ctx, interval)"
    onmouseleave="stopVideo(ctx, interval)">
    <div class="title ${i == 0 ? 'right' : ''}">
        <h1>${el.t}</h1>
        <p>${timeDifference(currentDate, el.d)}${i == 0 ? '<span class="newTag">новое</span>' : ''}</p>
    </div>
    <div class="content ${i == 0 ? 'right' : ''}">
        <img src="${el.p}" />
        <video width="100%" loop="" poster="" muted="">
            <source src="${el.v}" type="video/mp4" />
        </video>
        <div class="playbtn"><img src="img/website/play.png" alt="alt" /></div>
        <div class="progressVid"></div>
    </div>
    ${i == 0 ? '<div class="contentSecondary"></div><div class="contentThird"><div class="el"><svg width="15" height="30" viewBox="0 0 15 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="10" width="4" height="10" rx="2" fill="#909090"/></svg>' + el.style + '</div><div class="el active"><svg width="35" height="30" viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="3" width="7" height="25" rx="3.5" fill="white"/></svg>Библиотек<span class="num">' + el.libs + '</span></div><div class="el"><svg width="15" height="30" viewBox="0 0 15 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="10" width="4" height="10" rx="2" fill="#909090"/></svg>' + el.type + '</div><div class="el"><svg width="15" height="30" viewBox="0 0 15 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="10" width="4" height="10" rx="2" fill="#909090"/></svg>' + el.code + '</div></div><div class="corner__container right"></div>' : ''}
    <div class="corner__container ${i == 0 ? 'left' : ''}">
        <a href="${el.l}" target="_blank">
            ${el.code == 'Десктоп-приложение' ? '<img src="img/website/file.png" width="40" alt=""/>' : '<img src="img/website/link.png" width="40" alt=""/>'}
        </a>
        ${i == 0 ? '<span class="new"><img src="img/website/new.png" alt="" /></span>' : ''}
    </div>
</div>
            `).appendTo(document.getElementById('yomi_projects'));
        });
        let index = 0;
        setTimeout(() => {
            anime.timeline()
                .add({
                    targets: '#yomi_projects .portfolio__item.swiper-slide.loading',
                    duration: 300,
                    opacity: 0,
                    easing: 'easeInOutCubic',
                    complete: (el, i) => {
                        document.querySelectorAll('#yomi_projects .portfolio__item.swiper-slide.loading').forEach(el => {
                            el.remove()
                        });
                        document.querySelectorAll('#yomi_projects .portfolio__item.swiper-slide:not(.loading)').forEach(el => {
                            el.style.display = "block";
                        })
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
                        anime({
                            targets: '.portfolio__item.swiper-slide:not(.loading)',
                            opacity: 1,
                            duration: 500,
                            easing: 'easeInOutCubic',
                            delay: anime.stagger(50)
                        })
                    }
                })
        }, 1000);
    })
    // server info 
    fetch('https://mainzippapi3000.herokuapp.com/api/yomi_server').then(responce => responce.json()).then(result => {
        console.log(result);
        document.getElementById('server_icon').src = result.icon
        document.getElementById('server_name').innerHTML = result.name
        document.getElementById('server_people').innerHTML = result.people + ' человек на сервере!'
    })
    setTimeout(() => {
        anime.timeline()
            .add({
                targets: '.preloader',
                opacity: 0,
                duration: 300,
                easing: 'linear',
                complete: () => { document.querySelector('.preloader').style.display = "none" }
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
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: false
    });
    document.getElementById('scrollToJoin').addEventListener("click", () => { if (mobile()) { setTimeout(() => { scroll.scrollTo(document.querySelector('#join')) }, 500) } else { scroll.scrollTo(document.querySelector('#join')) } }, false);
    document.querySelector('.scrollDown').addEventListener("click", () => { if (mobile()) { setTimeout(() => { scroll.scrollTo(document.querySelector('h1.landing__title.highlight__title#Portfolio')) }, 500) } else { scroll.scrollTo(document.querySelector('h1.landing__title.highlight__title#Portfolio')) } }, false);
});