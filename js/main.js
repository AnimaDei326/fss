var old_country = "";
var old_capital = "";
var old_region = "";
var x = "";
var countWindow = 0;

function edit(id){
    var collinput = tbody.getElementsByTagName('input');

    if(collinput.length > 0){
        collinput[0].parentNode.innerText = collinput[0].value;
        collinput[0].parentNode.innerText = collinput[0].value;
    }

    resetLinks();
    var colltd = id.getElementsByTagName('td');
    var input = document.createElement('input');
    var input2 = document.createElement('input');
    input.value = colltd[1].innerText;
    input2.value = colltd[2].innerText;
    old_country = colltd[1].innerText;
    old_capital = colltd[2].innerText;
    colltd[1].innerText = "";
    colltd[2].innerText = "";
    colltd[1].appendChild(input);
    colltd[2].appendChild(input2);

    colltd[3].childNodes[0].innerText = 'сохранить';
    colltd[3].childNodes[0].href = 'javascript:save(' + id.id + ')';

    colltd[4].childNodes[0].innerText = 'отменить';
    colltd[4].childNodes[0].href = 'javascript:reset(' + id.id + ')';
}
function edit_region(id){
    var collinput = tbody.getElementsByTagName('input');

    if(collinput.length > 0){
        collinput[0].parentNode.innerText = collinput[0].value;
    }

    resetLinks_region();
    var colltd = id.getElementsByTagName('td');
    var input = document.createElement('input');
    input.value = colltd[0].innerText;
    old_region = colltd[0].innerText;
    colltd[0].innerText = "";
    colltd[0].appendChild(input);

    colltd[1].childNodes[0].innerText = 'сохранить';
    colltd[1].childNodes[0].href = 'javascript:save_region(' + id.id + ')';

    colltd[2].childNodes[0].innerText = 'отменить';
    colltd[2].childNodes[0].href = 'javascript:reset_region(' + id.id + ')';
}
function reset(id){
    id.children[1].innerText = old_country;
    id.children[2].innerText = old_capital;
    resetLinks();
}
function reset_region(id){
    id.children[0].innerText = old_region;
    resetLinks_region();
}
function resetLinks(){
    var colla = tbody.getElementsByTagName('a');

    if(colla.length > 0){
        for(var i= 0; colla.length > i; i++){
            if(colla[i].innerText == 'сохранить'){
                colla[i].innerText = 'редактировать';
                colla[i].href = 'javascript:edit(' + colla[i].parentNode.parentNode.id + ')';
            }
            else if(colla[i].innerText == 'отменить'){
                colla[i].innerText = 'удалить';
                id_delete = colla[i].parentNode.parentNode.id.substring(2, colla[i].parentNode.parentNode.id.length);
                colla[i].href = '/admin/delete/' + id_delete;
            }
        }
    }
}
function resetLinks_region(){
    var colla = tbody.getElementsByTagName('a');

    if(colla.length > 0){
        for(var i = 0; colla.length > i; i++){
            if(colla[i].innerText == 'сохранить'){
                colla[i].innerText = 'редактировать';
                colla[i].href = 'javascript:edit_region(' + colla[i].parentNode.parentNode.id + ')';
            }
            else if(colla[i].innerText == 'отменить'){
                colla[i].innerText = 'удалить';
                id_delete = colla[i].parentNode.parentNode.id.substring(2, colla[i].parentNode.parentNode.id.length);
                colla[i].href = '/admin/delete_region/' + id_delete;
            }
        }
    }
}
function save(id){
    var collinput = id.getElementsByTagName('input');
    country.value = collinput[0].value;
    capital.value = collinput[1].value;
    id_input.value = id.id.substring(2, id.id.length);
    form.submit();
}
function save_region(id){
    var collinput = id.getElementsByTagName('input');
    region.value = collinput[0].value;
    id_input.value = id.id.substring(2, id.id.length);
    form.submit();
}
function returnSelected(){
    var collopt = select.getElementsByTagName('option');
    for(var i = 0; collopt.length > i; i++){
        if(collopt[i].selected){
            id_region.value = collopt[i].id;
        }
    }
}
function answer_fc(id){
    var imgs = document.body.getElementsByTagName('img');
    var correct = decrypt(x, 2);
    for(var i = 0; i < imgs.length; i++){
        if(imgs[i].src == 'http://localhost:8888/images/flags/' + correct + '.svg'){
            imgs[i].className = 'correct';
        }
    }
    setTimeout(function(){
        let go = '/game/check/' + id;
        document.location.href = go;
    }, 1000);
    
}
function answer_cf(id){
    var links = start.getElementsByTagName('a');
    var correct = decrypt(x, 2);
    for(var i = 0; i < links.length; i++){
        if(links[i].attributes.onclick.value == 'javascript:answer_cf(\'' + correct + '\')'){
            links[i].className = 'correct';
        }
    }
    setTimeout(function(){
        let go = '/game/check/' + id;
        document.location.href = go;
    }, 1000);
    
}
function answer_cf_hard(){
    let guessText = 'пусто';
    if(guess.value != false){
        guessText = guess.value.toLowerCase();
    }
    if( decrypt(x, 4).toLowerCase() == guessText ){
        guess.className = 'correctInput';
    }else{
        guess.className = 'wrongInput';
    }
    setTimeout(function(){
        let go = '/game/check_hard/' + guessText;
        document.location.href = go;
    }, 1000);
}
function enter(event){
    if(event.code == 'Enter'){
        answer_cf_hard();
    }
}
function decrypt(input, ind){
    var output = "";
    var code = "";
    for (var i = 0; i < input.length/ind; i++){
        if(input[i*ind] != '-'){
            code = input.substring(i*ind, i*ind+ind);
            output += String.fromCharCode(code);
        }else{
            output+= '-';
        }
    }
    return output;
}
function setIcon(id){
    var selectedIndex = id.selectedIndex;
    var optId = id.children[selectedIndex].id;
    id.style.backgroundImage = 'url(/images/flags/' + optId + '.svg)';
    switch(id.id){
        case 'first' : firstInput.value = optId; firstCountry.value = first.value; break;
        case 'second' : secondInput.value = optId; secondCountry.value = second.value; break;
        case 'third' : thirdInput.value = optId; thirdCountry.value = third.value; break;
        case 'fourth' : fourthInput.value = optId; fourthCountry.value = fourth.value; break;
    }
}
function add_relation(){
    form.submit();
}
function delete_relation(id){
    input.value = id;
    var links = document.body.getElementsByTagName('a');
    var tr,  img, begin, end; var arrId = [];
    for( var i = 0; i < links.length; i++){
        if(links[i].href == 'javascript:delete_relation(' + id + ')' ){
            tr = links[i].parentNode.parentNode;
            img = tr.getElementsByTagName('img');
            for(var y = 0; y < 4; y++){
                begin = img[y].src.indexOf('/flags/') + 7;
                end = img[y].src.indexOf('.svg');
                arrId[y] = img[y].src.substring(begin, end);
            }
        }
    }
    first.value = arrId[0];
    second.value = arrId[1];
    third.value = arrId[2];
    fourth.value = arrId[3];
    form.submit();
}
function replaceTag(){
    var textColl = document.body.getElementsByClassName('news-block__text');
    var a = ""; var  b = "";
    for(var i=0; i < textColl.length; i++){
        a = textColl[i].innerHTML.replace(/&lt;/g, '<');
        b = a.replace(/&gt;/g, '>');
        textColl[i].innerHTML = b;
    }
    addClassImg();
}
function addClassImg(){
    var newsBlock = document.body.getElementsByClassName('news-block__text');
    var imgColl = newsBlock[0].getElementsByTagName('img');
    for(var i=0; i < imgColl.length; i++){
        if( i%2 == 0){
            imgColl[i].className = 'news-text__img text-img__left';
        }else{
            imgColl[i].className = 'news-text__img text-img__right';
        }
    }
}
function Init(){ //инициализация iframe
    var frame = iframe_redactor.contentDocument.firstChild.lastChild;
    document.getElementById("iframe_redactor").contentWindow.document.designMode = "On";
}
function doStyle(style){ //приминения стиля iframe
    document.getElementById("iframe_redactor").contentWindow.document.execCommand(style, false, null);
}
function addImg(){
    var name = img.value;
    var tag = "<img src='/images/facts/" + name + "'/>";
    iframe_redactor.contentDocument.firstChild.lastChild.innerHTML += tag;
    addClass();
}
function addClass(){
    var collimg = iframe_redactor.contentDocument.firstChild.lastChild.getElementsByTagName('img');
    for(var i = 0; i < collimg.length; i++){
        collimg[i].style.width = '12px';
    }
}

function go(){ //забрать текст в обычную текстарею
    text_main.innerHTML = iframe_redactor.contentDocument.firstChild.lastChild.innerHTML.replace(/ style="width: 12px;"/g, '');
    form.submit();
}
function copyTextToFrame(){ //забрать текст в iframe при редактировании
    iframe_redactor.contentDocument.firstChild.lastChild.innerHTML = text_main.innerHTML;
}
function select(element, type) {
    var value = element.getAttribute("data-value"); // Считываем значение выбранного элемента
    var nodes = element.parentNode.childNodes; // Получаем все остальные элементы

    for (var i = 0; i < nodes.length; i++) {
        /* Отфильтровываем посторонние элементы text и input */
        if (nodes[i] instanceof HTMLParagraphElement) {

            if (value == nodes[i].getAttribute("data-value")) {
                nodes[i].className = "select__element active";
            }
            else nodes[i].className = "select__element";
        }
    }

    // закрываем список элементов
    element.parentNode.style.display = "none";

    // меняем результат в главном элементе
    element.parentNode.parentNode.childNodes[1].innerHTML = element.innerHTML + '<i class="select__arrow">&nbsp;</i>';

    if (type == "world") {
        document.getElementsByClassName("hidden-select__view select-world")[0].value = value;
        region_input.value = value;
    } else {
        document.getElementsByClassName("hidden-select__view select-lvl")[0].value = value;
        level_input.value = value;
    }
}


window.onload = function(){
    let path = window.location.pathname;
    if (path == '/game/flag_country' || 
        path == '/game/country_flag' || 
        path == '/game/country_capital' || 
        path == '/game/capital_country' ||
        path == '/game/flag_country_hard' ||
        path == '/game/country_flag_hard'||
        path == '/game/capital_country_hard' ||
        path == '/game/country_capital_hard'
        ){
        h = document.body.getElementsByTagName('h4');
        x = h[0].id;

        h[0].id = "h4";
    }
    if( path == '/game/country_flag_hard' ||
        path == '/game/capital_country_hard' ||
        path == '/game/country_capital_hard'){
        guess.addEventListener('keyup', enter, false);
    }
    if(path.indexOf('admin/fact/redact') > 0){
        Init();
    }

    // открытие/закрытие меню при клике
    var burgerBtn = document.getElementsByClassName('burger__btn')[0];
    burgerBtn.addEventListener('click', function () {
        var burgerMenu = document.getElementsByClassName('burger-menu')[0];
        menuStyle =  window.getComputedStyle(burgerMenu, null);

        if (menuStyle.display == "block") {
            burgerMenu.style.display = "none";
        } else {
            burgerMenu.style.display = "block";
        }
    });

    // закрытие меню при клике вне области меню
    window.addEventListener('click', function (e) {
        var burgerMenu = document.getElementsByClassName('burger-menu')[0],
            burgerBtn = document.getElementsByClassName('burger__btn')[0],

            // дополнительно для селекта
            selectElements = document.getElementsByClassName('select__elements'),
            selectView = document.getElementsByClassName('visible-select__view');


        if (!burgerMenu.contains(e.target) && !burgerBtn.contains(e.target)) { burgerMenu.style.display = 'none' }


        // доп. закрытие элементов селека при клике вне зоны...
        for (var i = 0; i < selectView.length; i++) {
            if (!selectElements[i].contains(e.target) && !selectView[i].contains(e.target)) { selectElements[i].style.display = 'none' }
        }

    })


    // стилизация кастомного селекта
    var selectView = document.getElementsByClassName('visible-select__view');

    // функция закрытия и открытия при клике по элементу
    function toggleSelectElements(e, event) {
        var selectElements = document.getElementsByClassName('select__elements')[e];

        if (window.getComputedStyle(selectElements, null).display == "none") {
            selectElements.style.display = "block";
        } else {
            selectElements.style.display = "none";
        }
    }

    // навешиваем функцию на каждый элемент
    for (var i = 0; i < selectView.length; i++) {
        selectView[i].addEventListener('click', toggleSelectElements.bind(null, i))
    }
}
