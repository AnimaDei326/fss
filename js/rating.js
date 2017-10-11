$(document).ready(function() {
    
    var num = 5; //должно совпадать с amount
    
    $("#next-list").click(function() {
        var inProcess = false;
        if (!inProcess) {
            $.ajax({
                url: '/more?page=' + num,
                success: function (data) {
                    num += data.length;
                },
                beforeSend: function () {
                    inProcess = true;
                }
            }).done(function (data) {
                if (data.length > 0) {
                    var img_like = '';
                    var img_dislike = '';
                    var li_like = '';
                    var li_dislike = '';
                    $.each(data, function (index, data) {
                        if(data.i_like){
                            img_like = '<img src="/images/active_like.png" />';
                            li_like = '<li class="soc-info__element active" data-parameter="'+data.id+'">';
                        }else{
                            img_like = '<img src="/images/like.png" />';
                            li_like = '<li class="soc-info__element like" data-parameter="'+data.id+'">';
                        }
                        if(data.i_dislike){
                            img_dislike = '<img src="/images/active_dislike.png" />';
                            li_dislike = '<li class="soc-info__element active" data-parameter="'+data.id+'">';
                        }else{
                            img_dislike = '<img src="/images/dislike.png" />';
                            li_dislike = '<li class="soc-info__element dislike" data-parameter="'+data.id+'">';
                        }
                        $("#facts").append(
                                '<div class="news-block__wrap"><h3 class="news-block__title">'+data.title_preview+'</h3><img src="/images/facts/'+data.img_preview+'" alt="image" class="news-block__img"><p class="news-block__text">'+data.text_preview+'</p><div class="news-block__footer"><ul class="news__soc-info">'+li_like+img_like
                                +'<label>'+data.lik+'</label></li>'+li_dislike+img_dislike+'<label>'+data.dislike+'<label></li></ul><a href="/fact/'+data.id+'" class="right view__more">Подробнее</a></div></div>');
                        });
                        addEventListenerForRating();
                        inProcess = false;
                }
            })
        }
    });
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
                    var label = event.currentTarget.getElementsByTagName('label');
                    li.className = "soc-info__element active";
                    label[0].innerText++;
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
                    var label = li.getElementsByTagName('label');
                    li.className = "soc-info__element active";
                    label[0].innerText++;
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
                    var label = li.getElementsByTagName('label');
                    label[0].innerText--;
                    
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