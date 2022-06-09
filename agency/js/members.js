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
                        el.style.display = "none";
                        anime({
                            targets: '.card.swiper-slide:not(.loading)',
                            translateY: ['-20px', 0],
                            opacity: 1,
                            duration: 500,
                            delay: anime.stagger(50),
                        })
                    });
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