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
})