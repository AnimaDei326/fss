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
    if(path.indexOf('admin/fact/redact') > 0 || path.indexOf('admin/add_fact') > 0){
        Init();
    }

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

    window.addEventListener('click', function (e) {
        var burgerMenu = document.getElementsByClassName('burger-menu')[0],
            burgerBtn = document.getElementsByClassName('burger__btn')[0],
            selectElements = document.getElementsByClassName('select__elements'),
            selectView = document.getElementsByClassName('visible-select__view');


        if (!burgerMenu.contains(e.target) && !burgerBtn.contains(e.target)) { burgerMenu.style.display = 'none' }

        for (var i = 0; i < selectView.length; i++) {
            if (!selectElements[i].contains(e.target) && !selectView[i].contains(e.target)) { selectElements[i].style.display = 'none' }
        }

    })


    var selectView = document.getElementsByClassName('visible-select__view');

    function toggleSelectElements(e, event) {
        var selectElements = document.getElementsByClassName('select__elements')[e];

        if (window.getComputedStyle(selectElements, null).display == "none") {
            selectElements.style.display = "block";
        } else {
            selectElements.style.display = "none";
        }
    }

    for (var i = 0; i < selectView.length; i++) {
        selectView[i].addEventListener('click', toggleSelectElements.bind(null, i))
    }
}
var x = "";
function answer_fc(id){
    var imgs = document.body.getElementsByTagName('img');
    var correct = decrypt(x, 2);
    for(var i = 0; i < imgs.length; i++){
        if(imgs[i].src.indexOf('/images/flags/' + correct + '.svg') > 0){
            imgs[i].className = 'correct';
        }
    }
    setTimeout(function(){
        let go = '/game/check/' + id;
        document.location.href = go;
    }, 400);
    
}
function answer_cf(id){
    var links = start.getElementsByTagName('a');
    var correct = decrypt(x, 2);
    for(var i = 0; i < links.length; i++){
        if(links[i].attributes.onclick.value == 'javascript:answer_cf(\'' + correct + '\')'){
            links[i].className = 'element__game correct';
        }
    }
    setTimeout(function(){
        let go = '/game/check/' + id;
        document.location.href = go;
    }, 400);
    
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
    }, 400);
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
        imgColl[i].className = 'news-block__img';
    }
}
function select(element, type) {
    var value = element.getAttribute("data-value");
    var nodes = element.parentNode.childNodes;

    for (var i = 0; i < nodes.length; i++) {

        if (nodes[i] instanceof HTMLParagraphElement) {

            if (value == nodes[i].getAttribute("data-value")) {
                nodes[i].className = "select__element active";
            }
            else nodes[i].className = "select__element";
        }
    }

    element.parentNode.style.display = "none";

    element.parentNode.parentNode.childNodes[1].innerHTML = element.innerHTML + '<i class="select__arrow">&nbsp;</i>';

    if (type == "world") {
        document.getElementsByClassName("hidden-select__view select-world")[0].value = value;
        region_input.value = value;
    } else {
        document.getElementsByClassName("hidden-select__view select-lvl")[0].value = value;
        level_input.value = value;
    }
}