$(document).ready(function() {
    let path = window.location.pathname;
    if(path == '/facts'){
        setLiveTimeLocalStorage();
        if(!localStorage.getItem('html'))
        {
            appendFacts();
        }else{
            var strHtml = localStorage.getItem('html');
            $("#facts").append(strHtml);
        }
        
        $("#next-list").click(function() {
            appendFacts();
        });

        function appendFacts(){
            var inProcess = false;
            if(!localStorage.getItem('lastId')){
                localStorage.setItem('lastId', 999999);
            }
            var lastId = localStorage.getItem('lastId');
            if (!inProcess) {
                $.ajax({
                    url: '/more?page=' + lastId,
                    beforeSend: function () {
                        inProcess = true;
                    }
                }).done(function (data) {
                    if (data.length > 0) {
                        var length = data.length;
                        var img_like = '';
                        var img_dislike = '';
                        var li_like = '';
                        var li_dislike = '';
                        var newFacts = '';
                        $.each(data, function (index, data) {
                            if(index + 1 == length){
                                localStorage.setItem('lastId', data.id);
                            }
                            if(data.i_like){
                                img_like = '<img alt="like" src="/images/active_like.png" />';
                                li_like = '<li class="soc-info__element active" data-parameter="'+data.id+'">';
                            }else{
                                img_like = '<img alt="like" src="/images/like.png" />';
                                li_like = '<li class="soc-info__element like" data-parameter="'+data.id+'">';
                            }
                            if(data.i_dislike){
                                img_dislike = '<img alt="dislike" src="/images/active_dislike.png" />';
                                li_dislike = '<li class="soc-info__element active" data-parameter="'+data.id+'">';
                            }else{
                                img_dislike = '<img alt="dislike" src="/images/dislike.png" />';
                                li_dislike = '<li class="soc-info__element dislike" data-parameter="'+data.id+'">';
                            }
                            newFacts += 
                                '<div class="news-block__wrap"><h3 class="news-block__title">'+data.title_preview+'</h3><img alt="img_preview" src="/images/facts/'+data.img_preview+'" class="news-block__img"><p class="news-block__text">'+data.text_preview+'</p><div class="news-block__footer"><ul class="news__soc-info">'+li_like+img_like
                                +'<span>'+data.lik+'</span></li>'+li_dislike+img_dislike+'<span>'+data.dislike+'<span></li><li class="soc-info__element_views"><img alt="views" src="/images/view.png" /><span>'+data.views+'</span></li></ul><a href="/fact/'+data.id+'" class="right view__more">Подробнее</a></div></div>';
                        });
                        
                        $("#facts").append(newFacts);
                        var strHtml = '';
                        if(localStorage.getItem('html')){
                            strHtml = localStorage.getItem('html');
                        }
                        try{
                            localStorage.setItem('html', strHtml + newFacts);
                        } catch (e) {
                            if (e == QUOTA_EXCEEDED_ERR) {
                                localStorage.clear();
                            }
                        }
                        addEventListenerForRating();
                        inProcess = false;
                    }else{
                        $("#next-list")[0].value = 'Больше нет, но завтра будут =)';
                    }
                })
            }
        }
    }
    function setLiveTimeLocalStorage(){
        var limit = 5 * 3600 * 1000;
        var localStorageInitTime = localStorage.getItem('localStorageInitTime');
        if (localStorageInitTime === null) {
            localStorage.setItem('localStorageInitTime', +new Date());
        }else if(+new Date() - localStorageInitTime > limit){
            localStorage.clear();
            localStorage.setItem('localStorageInitTime', +new Date());
        }
    }
    function like(event){
        var inProcess2 = false;
        if (!inProcess2) {
            $.ajax({
                url: '/like/' + this.getAttribute("data-parameter"),
                beforeSend: function () {
                    inProcess2 = true;
                }
            }).done(function (data) {
                if(data){
                    var li = event.currentTarget;
                    var img = event.currentTarget.getElementsByTagName('img');
                    img[0].src = "/images/active_like.png";
                    var span = event.currentTarget.getElementsByTagName('span');
                    li.className = "soc-info__element active";
                    span[0].innerText++;
                    var clone = li.cloneNode();
                    while (li.firstChild) {
                        clone.appendChild(li.firstChild);
                    }
                    li.parentNode.replaceChild(clone, li);
                    addEventListenerForRating();
                }
                inProcess2 = false;
            })
        }
    }
    function dislike(event){
        var inProcess3 = false;
        if (!inProcess3) {
            $.ajax({
                url: '/dislike/' + this.getAttribute("data-parameter"),
                beforeSend: function () {
                    inProcess3 = true;
                }
            }).done(function (data) {
                if(data){
                    var li = event.currentTarget;
                    var img = li.getElementsByTagName('img');
                    img[0].src = "/images/active_dislike.png";
                    var span = li.getElementsByTagName('span');
                    li.className = "soc-info__element active";
                    span[0].innerText++;
                    var clone = li.cloneNode();
                    while (li.firstChild) {
                        clone.appendChild(li.firstChild);
                    }
                    li.parentNode.replaceChild(clone, li);
                    addEventListenerForRating();
                }
                inProcess3 = false;
            })
        }
    }
    function active(event){
         var inProcess4 = false;
         if (!inProcess4) {
            $.ajax({
                url: '/delete_rating/' + this.getAttribute("data-parameter"),
                beforeSend: function () {
                    inProcess4 = true;
                }
            }).done(function (data) {
                if(data){
                    var li = event.currentTarget;
                    var img = li.getElementsByTagName('img');
                    var span = li.getElementsByTagName('span');
                    span[0].innerText--;
                    
                    if( img[0].src.indexOf("dislike") > 0 ){
                        img[0].src = "/images/dislike.png";
                        li.className = "soc-info__element dislike";
                    }else{
                        img[0].src = "/images/like.png";
                        li.className = "soc-info__element like";
                    }
                    var clone = li.cloneNode();
                    while (li.firstChild) {
                        clone.appendChild(li.firstChild);
                    }
                    li.parentNode.replaceChild(clone, li);  
                }
                addEventListenerForRating();
                inProcess4 = false;
            })
        }
    }

    function addEventListenerForRating(){
        $(".like").click(like);
        $(".dislike").click(dislike);
        $(".active").click(active);
    }
    addEventListenerForRating();
});