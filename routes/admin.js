const Games = require('./../models/game');

module.exports = function(app){
    //Список стран
    app.get('/admin/countries', function(req, res, next){
        let filtr = {
            table: 'countries',
            order: 'country'
        };
        Games.showAllOrderByName(filtr, function(error, result){
            if(error){
                console.log(error);
            }else{
                res.render('countries', {
                    title: 'Страны',
                    rows: result,
                    partials: {
                        header: 'partials/header',
                        admin: 'partials/admin',
                        footer: 'partials/footer'
                    }
                })
            }
        })
    })
    //Список регионов
    app.get('/admin/regions', function(req, res, next){
        Games.showAll('regions', function(error, result){
            if(error){
                console.log(error);
            }else{
                res.render('regions', {
                    title: 'Регионы',
                    rows: result,
                    partials: {
                        header: 'partials/header',
                        admin: 'partials/admin',
                        footer: 'partials/footer'
                    }
                })
            }
        })
    });
    //Список связей
    app.get('/admin/relations', function(req, res, next){
        Games.showAll('likes', function(error, result){
            if(error){
                console.log(error);
            }else{
            
                res.render('relations', {
                    title: 'Список связей',
                    rows: result,
                    partials: {
                        header: 'partials/header',
                        admin: 'partials/admin',
                        footer: 'partials/footer'
                    }
                })
            }
        })
    });
    //Новая связь
    app.get('/admin/add_relation', function(req, res, next){
        let filtr = {
            table: 'countries',
            order: 'country'
        };
        Games.showAllOrderByName(filtr, function(error, result){
            if(error){
                console.log(error);
            }else{
                res.render('add_relation', {
                    title: 'Создать связь',
                    rows: result,
                    partials: {
                        header: 'partials/header',
                        admin: 'partials/admin',
                        footer: 'partials/footer'
                    }
                })
            }
        })
    });
    app.post('/admin/add_relation', function(req, res, next){
        let filtr = {
            table: 'likes',
            set : {
                id_1 : req.body.firstInput,
                id_2 : req.body.secondInput,
                id_3 : req.body.thirdInput,
                id_4 : req.body.fourthInput,
                country_1 : req.body.firstCountry,
                country_2 : req.body.secondCountry,
                country_3 : req.body.thirdCountry,
                country_4 : req.body.fourthCountry
            }
        };
        Games.insert(filtr, function(err, result){
            if(err){
                console.log(err);
            }else{
                filtr = {
                    table: 'countries',
                    set: {
                        relation: true
                    },
                    id1:  req.body.firstInput,
                    id2:  req.body.secondInput,
                    id3:  req.body.thirdInput,
                    id4:  req.body.fourthInput
                };
                Games.updateOR(filtr, function(err, result){
                    if(err){
                        console.log(err);
                    }else{
                        res.redirect('/admin/add_relation');
                    }
                })
            }
        })
    });
    //Проверка связи
    app.get('/admin/check_relation', function(request, response, next){
        let filtr = {
            table: 'countries',
            column: 'relation',
            value: false,
            order: 'country'
        };
        Games.selectOrderByName(filtr, function(error, result){
            if(error){
                console.log(error);
            }else{
                response.render('check_relation', {
                    title: 'Проверка связи',
                    rows: result,
                    partials: {
                        header: 'partials/header',
                        admin: 'partials/admin',
                        footer: 'partials/footer'
                    }
                });
            }
        })
    });
    //Удалить связь
    app.post('/admin/delete_relation', function(request, response, next){
        var filtr = {
            table: 'likes',
            column: 'id',
            value: request.body.input
        };
        Games.remove(filtr, function(err, result){
            if(err){
                console.log(err);
            }else{
                filtr = {
                    table: 'countries',
                    set: {
                        relation: false
                    },
                    id1: request.body.first,
                    id2: request.body.second,
                    id3: request.body.third,
                    id4: request.body.fourth
                };
                Games.updateOR(filtr, function(er, res){
                    if(er){
                        console.log(er);
                    }else{
                        response.redirect('/admin/relations');
                    }
                })
            }
        })
    });
    //Новая страна
    app.get('/admin/add_country', function(req, res, next){
        Games.showAll('regions', function(error, result){
            if(error){
                console.log(error);
            }else{
                res.render('add_country', {
                    title: 'Новая страна',
                    regions: result,
                    partials: {
                        header: 'partials/header',
                        admin: 'partials/admin',
                        footer: 'partials/footer'
                    }
                });
            }
        })
    });
    app.post('/admin/add_country', function(req, res, next){
        let filtr = {
            table: 'countries',
            set:{
                country: req.body.country,
                capital: req.body.capital,
                id_region: req.body.id_region
            }
        };
        Games.insert(filtr, function(error, result){
            if(error){
                console.log(error);
            }else{
                let sampleFile = req.files.foo;
                let path = 'c:/xampp/htdocs/images/flags/' + result + '.svg';
                sampleFile.mv(path, function(err) {
                    if (err)
                    return res.status(500).send(err);
                });
                Games.showAll('regions', function(error, result){
                    if(error){
                        console.log(error);
                    }else{
                        res.render('add_country', {
                            title: 'Новая страна',
                            regions: result,
                            h3: 'Страна успешна добавлена',
                            partials: {
                                header: 'partials/header',
                                admin: 'partials/admin',
                                footer: 'partials/footer'
                            }
                        });
                    }
                })
            }
        });
    });
    //Новый регион
    app.get('/admin/add_region', function(req, res, next){
        res.render('add_region', {
            title: 'Новый регион',
            partials: {
                header: 'partials/header',
                admin: 'partials/admin',
                footer: 'partials/footer'
            }
        });
    });
    app.post('/admin/add_region', function(req, res, next){
        let filtr = {
            table: 'regions',
            set:{
                name: req.body.region
            }
        };
        Games.insert(filtr, function(error, result){
            if(error){
                console.log(error);
            }else{
                res.render('add_region', {
                    title: 'Новый регион',
                    h3: 'Регион успешно добавлен',
                    partials: {
                        header: 'partials/header',
                        admin: 'partials/admin',
                        footer: 'partials/footer'
                    }
                });
            }
        });
    });
    //Редактирование стран
    app.post('/admin/save', function(request, response, next){
        let filtr = {
            table: 'countries',
            set:{
                country: request.body.country,
                capital: request.body.capital
            },
            column: 'id',
            value: request.body.id
        };
        Games.update(filtr, function(error, result){
            if(error){
                    console.log(error);
            }else if(result){
                Games.showAll('countries', function(err, res){
                    if(err){
                        console.log(err);
                    }else{
                        response.redirect('/admin/countries');
                    }
                });
            }else{
                response.redirect('/');
            }
        });
    });
    //Редактирование региона
    app.post('/admin/save_region', function(request, response, next){
        let filtr = {
            table: 'regions',
            set:{
                name: request.body.region
            },
            column: 'id',
            value: request.body.id
        };
        Games.update(filtr, function(error, result){
            if(error){
                    console.log(error);
            }else if(result){
                Games.showAll('regions', function(err, res){
                    if(err){
                        console.log(err);
                    }else{
                        response.redirect('/admin/regions');
                    }
                });
            }else{
                response.redirect('/');
            }
        });
    });
    //Удаление страны
    app.get('/admin/delete/:id', function(req, response, next){
        let filtr = {
            table: 'countries',
            column: 'id',
            value: req.params.id
        };
        Games.remove(filtr, function(error, result){
            if(error){
                console.log(error);
            }else{
                Games.showAll('countries', function(err, res){
                    if(err){
                        console.log(err);
                    }else if(result){
                        response.redirect('/admin/countries');
                    }else{
                        response.redirect('/');
                    }
                });
            }
        })
    });
    //Удаление региона
    app.get('/admin/delete_region/:id', function(req, response, next){
        let filtr = {
            table: 'regions',
            column: 'id',
            value: req.params.id
        };
        Games.remove(filtr, function(error, result){
            if(error){
                console.log(error);
            }else{
                Games.showAll('regions', function(err, res){
                    if(err){
                        console.log(err);
                    }else if(result){
                        response.redirect('/admin/regions');
                    }else{
                        response.redirect('/');
                    }
                });
            }
        })
    });
    app.get('/admin/logout', function(req, res){
        req.logout();
        res.redirect('/login');
    });
}