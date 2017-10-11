$(document).ready(function() {

    $(".search__field").keyup(function(event) {
        var inProcess = false;
        if (!inProcess) {
            $.ajax({
                url: '/search',
                type: 'POST',
                data:  {search: event.currentTarget.value},
                beforeSend: function () {
                    inProcess = true;
                }
            }).done(function (data) {
                if (data.length > 0) {
                    $('.main-table__body').children().remove();
                    $.each(data, function (index, data) {
                        $(".main-table").append(
                                '<tr class="main-table__line">'+
                                    '<td class="main-table__row">'+
                                        '<img src="/images/flags/'+data.id+'.svg" alt="картинка" class="main-table__img" />'+
                                    '</td>'+
                                    '<td class="main-table__row">'+data.country+'</td>'+
                                    '<td class="main-table__row">'+data.capital+'</td>'+
                                '</tr>');
                        });
                        inProcess = false;
                }
            })
        }
    });
});