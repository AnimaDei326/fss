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
                $('.main-table__body').children().remove();
                if (data) {
                    if( data.europe.length > 0 ){
                        $(".main-table").append(
                            '<tr class="main-table__line table__tr-title">'+
                                '<td class="main-table__row" colspan="3">Европа</td>'+
                            '</tr>');
                        $.each(data.europe, function (index, europe) {
                            $(".main-table").append(
                                '<tr class="main-table__line">'+
                                    '<td class="main-table__row">'+
                                        '<img src="/images/flags/'+europe.id+'.svg" alt="картинка" class="main-table__img" />'+
                                    '</td>'+
                                    '<td class="main-table__row">'+europe.country+'</td>'+
                                    '<td class="main-table__row">'+europe.capital+'</td>'+
                                '</tr>'
                            );
                        });
                    }
                    if( data.azia.length > 0 ){
                        $(".main-table").append(
                            '<tr class="main-table__line table__tr-title">'+
                                '<td class="main-table__row" colspan="3">Азия</td>'+
                            '</tr>');
                        $.each(data.azia, function (index, azia) {
                            $(".main-table").append(
                                '<tr class="main-table__line">'+
                                    '<td class="main-table__row">'+
                                        '<img src="/images/flags/'+azia.id+'.svg" alt="картинка" class="main-table__img" />'+
                                    '</td>'+
                                    '<td class="main-table__row">'+azia.country+'</td>'+
                                    '<td class="main-table__row">'+azia.capital+'</td>'+
                                '</tr>'
                            );
                        });
                    }
                    if( data.africa.length > 0 ){
                        $(".main-table").append(
                            '<tr class="main-table__line table__tr-title">'+
                                '<td class="main-table__row" colspan="3">Африка</td>'+
                            '</tr>');
                        $.each(data.africa, function (index, africa) {
                            $(".main-table").append(
                                '<tr class="main-table__line">'+
                                    '<td class="main-table__row">'+
                                        '<img src="/images/flags/'+africa.id+'.svg" alt="картинка" class="main-table__img" />'+
                                    '</td>'+
                                    '<td class="main-table__row">'+africa.country+'</td>'+
                                    '<td class="main-table__row">'+africa.capital+'</td>'+
                                '</tr>'
                            );
                        });
                    }
                    if( data.america.length > 0 ){
                        $(".main-table").append(
                            '<tr class="main-table__line table__tr-title">'+
                                '<td class="main-table__row" colspan="3">Америка</td>'+
                            '</tr>');
                        $.each(data.america, function (index, america) {
                            $(".main-table").append(
                                '<tr class="main-table__line">'+
                                    '<td class="main-table__row">'+
                                        '<img src="/images/flags/'+america.id+'.svg" alt="картинка" class="main-table__img" />'+
                                    '</td>'+
                                    '<td class="main-table__row">'+america.country+'</td>'+
                                    '<td class="main-table__row">'+america.capital+'</td>'+
                                '</tr>'
                            );
                        });
                    }
                    if( data.australia.length > 0 ){
                        $(".main-table").append(
                            '<tr class="main-table__line table__tr-title">'+
                                '<td class="main-table__row" colspan="3">Австралия и Океания</td>'+
                            '</tr>');
                        $.each(data.australia, function (index, australia) {
                            $(".main-table").append(
                                '<tr class="main-table__line">'+
                                    '<td class="main-table__row">'+
                                        '<img src="/images/flags/'+australia.id+'.svg" alt="картинка" class="main-table__img" />'+
                                    '</td>'+
                                    '<td class="main-table__row">'+australia.country+'</td>'+
                                    '<td class="main-table__row">'+australia.capital+'</td>'+
                                '</tr>'
                            );
                        });
                    }
                    inProcess = false;
                }
            })
        }
    });
});