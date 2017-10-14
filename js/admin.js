var old_country = "";
var old_capital = "";
var old_region = "";

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
function Init(){
    var frame = iframe_redactor.contentDocument.firstChild.lastChild;
    document.getElementById("iframe_redactor").contentWindow.document.designMode = "On";
}
function doStyle(style){
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
        collimg[i].style.width = '16px';
    }
}
function removeClass(){
   var begin = ""; var end = "";var index = 0;var str = 'width: 16px;';
    while( text_main.innerHTML.indexOf(str) > 0){
        index = text_main.innerHTML.indexOf(str);
        begin = text_main.innerHTML.substring(0, index);
        end = text_main.innerHTML.substring(index + str.length);
        text_main.innerHTML = begin + end;
    }
}

function go(){ 
    text_main.innerHTML = iframe_redactor.contentDocument.firstChild.lastChild.innerHTML.replace(/ http:\/\/localhost:8888 /g, '');
    removeClass();
    form.submit();
}
function copyTextToFrame(){
    iframe_redactor.contentDocument.firstChild.lastChild.innerHTML = text_main.innerHTML;
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