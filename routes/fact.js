const Games = require('./../models/game');

module.exports = function(app){
    //Открыть факт
    app.get('/fact/:id', function(req, res, next){
        let filtr = {
            table: 'facts',
            column1: 'id',
            value1: req.params.id,
            column2: 'id',
            value2: req.params.id
        };
        Games.select(filtr, function(error, result){
            if(error){
                console.log(error);
            }else if(!result){
                res.redirect('/404');
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