const Games = require('./../models/game');

module.exports = function(app){
    //Открыть факт
    app.get('/fact/:id', function(req, res, next){
        var filtr = {
            id1: 'id',
            id2: 'id_fact',
            table1: 'facts',
            table2: 'rating',
            column1: 'is_like',
            column2: 'is_like',
            column3: 'id_session',
            value1: true,
            value2: false,
            value3: req.session.id,
            idfact: req.params.id,
            limit: 1
        };
        Games.selectOne(filtr, function(error, result){
            if(error){
                console.log(error);
            }else if(!result){
                res.redirect('/404');
            }else{
                let views = result[0].views * 1 + 1;
                let filtr3 = {
                    table: 'facts',
                    set:{
                        views: views
                    },
                    column: 'id',
                    value: result[0].id
                };
                Games.update(filtr3, function(err, result3){
                    if(err){
                        console.log(err);
                    }else{
                        let filtr2 = {
                            table: 'comments',
                            column: 'id_fact',
                            value: req.params.id,
                            order: 'up'
                        };
                        Games.selectOrderByNameDesc(filtr2, function(error, result2){
                            if(error){
                                console.log(error);
                            }else{
                                res.render('fact', {
                                    title: 'Факт',
                                    h1: result.title_main,
                                    rows: result,
                                    comments: result2,
                                    partials: {
                                        header: 'partials/header',
                                        admin: 'partials/admin',
                                        footer: 'partials/footer'
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
    //Добавить комментарий к факту
    app.post('/comment/:id', function(req, res, next){
        let filtr = {
            table: 'comments',
            set: {
                id_fact: req.params.id,
                author: req.body.author,
                text_main: req.body.text,
                up: 0,
                down: 0
            }
        };
        Games.insert(filtr, function(error, result){
            if(error){
                console.log(error);
            }else{
                res.redirect('/fact/' + req.params.id);
            }
        })
    });
}