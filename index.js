const express = require('express');
const templating = require('consolidate');
const app = express();

const compression = require('compression');
app.use(compression());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const session = require('cookie-session');
app.use(session({
  name: 'session',
  keys: ['qwe', 'rty'],
  httpOnly: false
}));

const fileUpload = require('express-fileupload');
app.use(fileUpload());

const nodemailer = require('nodemailer');
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'fss.anima@gmail.com',
        pass: '326whisper'
    }
};
var transporter = nodemailer.createTransport(smtpConfig);

const Games = require('./models/game');
const F = require('./models/functions');

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));

require('./models/auth.js')(app);
require('./routes/login.js')(app);
require('./routes/admin.js')(app);
require('./routes/game.js')(app);
require('./routes/fact.js')(app);


//Главная страница
app.get('/', function(req, res, next){
    res.redirect('/game');
});

//Факты
app.get('/facts', function(req, result, next){
    result.render('facts',{
        title: 'Факты',
        h1: 'Факты',
        partials: {
            header: 'partials/header',
            footer: 'partials/footer'
        }
    });
});

//Еще факты
app.get('/more', function(req, result, next){
    let beginningWith = 0;
    if(parseInt(req.query.page)){
        beginningWith = parseInt(req.query.page);
    }
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
        beginningWith: beginningWith,
        amount: 5
    };
    Games.selectPart(filtr, function(err, res){
        if(err){
            console.log(err);
        }else{
            result.send(res);
        }
    });
});


//Поставить like
app.get('/like/:id', function(req, response, next){
    if(req.session.id && req.params.id){
        let filtr = {
            table: 'rating',
            column1: 'id_fact',
            value1: req.params.id,
            column2: 'id_session',
            value2: req.session.id
        };
        Games.select(filtr, function(error, result){
            if(error){
                console.log(error);
            }else{
                if(!result){
                    let filtr2 = {
                        table: 'rating',
                        set: {
                            'id_fact': req.params.id,
                            'id_session' : req.session.id,
                            'is_like': true
                        }
                    };
                    Games.insert(filtr2, function(err, res){
                    if(err){
                        console.log(err);
                    }else{
                        response.send(true);
                    }
                    });
                }else{
                    response.send(false);
                }
            }
        });
    }
});
//Поставить dislike
app.get('/dislike/:id', function(req, response, next){
    if(req.session.id && req.params.id){
        let filtr = {
            table: 'rating',
            column1: 'id_fact',
            value1: req.params.id,
            column2: 'id_session',
            value2: req.session.id
        };
        Games.select(filtr, function(error, result){
            if(error){
                console.log(error);
            }else{
                if(!result){
                    let filtr2 = {
                        table: 'rating',
                        set: {
                            'id_fact': req.params.id,
                            'id_session' : req.session.id,
                            'is_like': false
                        }
                    };
                    Games.insert(filtr2, function(err, res){
                        if(err){
                            console.log(err);
                        }else{
                            response.send(true);
                        }
                    });
                }else{
                    response.send(false);
                }
            }
        });
    }
});

//Удалить like или dislike
app.get('/delete_rating/:id', function(req, response, next){
    if(req.session.id && req.params.id){
        let filtr = {
            table: 'rating',
            column1: 'id_fact',
            value1: req.params.id,
            column2: 'id_session',
            value2: req.session.id
        };
        Games.select(filtr, function(error, result){
            if(error){
                console.log(error);
            }else{
                if(result){
                    let filtr2 = {
                        table: 'rating',
                        column: 'id',
                        value: result.id
                    };
                    Games.remove(filtr2, function(err, res){
                        if(err){
                            console.log(err);
                        }else{
                            if(res){
                                response.send(true);
                            }else{
                                response.send(false);
                            } 
                        }
                    });
                }else{
                    response.send(false);
                }
            }
        });
    }
});

//Обучение
app.get('/education', function(req, response, next){
    let filtr = {
        table: 'countries',
        order: 'country'
    };
    Games.showAllOrderByName(filtr, function(err, res){
        if(err){
            console.log(err);
        }else{
            var eu = [];
            var az = [];
            var af = [];
            var am = [];
            var au = [];
            for(var i = 0; i < res.length; i++){
                if(res[i].id_region == 2){
                    eu.push(res[i]);
                }else if(res[i].id_region == 4){
                    az.push(res[i]);
                }else if(res[i].id_region == 5){
                    af.push(res[i]);
                }else if(res[i].id_region == 6){
                    am.push(res[i]);
                }else if(res[i].id_region == 7){
                    au.push(res[i]);
                }
            }
            response.render('education',{
                title: 'Обучение',
                h1: 'Обучение',
                europe: eu,
                azia: az,
                africa: af,
                america: am,
                australia: au,
                partials: {
                    header: 'partials/header',
                    footer: 'partials/footer'
                }
            });
        }
    })
});
app.post('/education', function(req, response, next){
    if(! (req.body.search) ){
        response.redirect('/education');
    }else{
        var search = req.body.search;
        var filtr = {
            table: 'countries',
            column1: 'country',
            column2: 'capital',
            value: '%' + search  + '%',
        };
        Games.selectLike(filtr, function(err, res){
            if(err){
                console.log(err);
            }else{
                var eu = [];
                var az = [];
                var af = [];
                var am = [];
                var au = [];
                for(var i = 0; i < res.length; i++){
                    if(res[i].id_region == 2){
                        eu.push(res[i]);
                    }else if(res[i].id_region == 4){
                        az.push(res[i]);
                    }else if(res[i].id_region == 5){
                        af.push(res[i]);
                    }else if(res[i].id_region == 6){
                        am.push(res[i]);
                    }else if(res[i].id_region == 7){
                        au.push(res[i]);
                    }
                }
                response.render('education',{
                    title: 'Обучение',
                    h1: 'Обучение',
                    search: search,
                    europe: eu,
                    azia: az,
                    africa: af,
                    america: am,
                    australia: au,
                    partials: {
                        header: 'partials/header',
                        footer: 'partials/footer'
                    }
                });
            }
        });
    }
});
//Поиск
app.post('/search', function(req, response, next){
    var filtr = {
        table: 'countries',
        column1: 'country',
        column2: 'capital',
        value: '%' + req.body.search + '%',
    };
    Games.selectLike(filtr, function(err, res){
        if(err){
            console.log(err);
        }else{
            var eu = [];
            var az = [];
            var af = [];
            var am = [];
            var au = [];
            for(var i = 0; i < res.length; i++){
                if(res[i].id_region == 2){
                    eu.push(res[i]);
                }else if(res[i].id_region == 4){
                    az.push(res[i]);
                }else if(res[i].id_region == 5){
                    af.push(res[i]);
                }else if(res[i].id_region == 6){
                    am.push(res[i]);
                }else if(res[i].id_region == 7){
                    au.push(res[i]);
                }
            }
            var result = {
                'europe' : eu,
                'azia' : az,
                'africa' : af,
                'america' : am,
                'australia' : au
            };
            response.send(result);
        }
    });
});
//Настройки
app.get('/settings', function(req, result, next){
    let obj = F.getLevel(req);
    let regionS = F.getRegion(req);
    Games.showAll('regions', function(err, res){
        if(err){
            console.log(err);
        }else{
            result.render('settings',{
                title: 'Настройки',
                h1: 'Настройки',
                rows: res,
                easy : obj.easyS,
                hard : obj.hardS,
                region: regionS,
                partials: {
                    header: 'partials/header',
                    footer: 'partials/footer'
                }
            });
        }
    })
});

app.post('/settings', function(req, result, next){
    if(req.body.level && req.body.region){
        req.session.level = req.body.level;
        req.session.region = req.body.region;
    }
    result.redirect('/game');
});
//Лидеры
app.get('/liaders', function(req, result, next){
    let filtr = {
        table: 'records',
        order: 'score',
        limit: 10
    };
    Games.showAllOrderByNameDesc(filtr, function(err, res){
        if(err){
            console.log(err);
        }else{
            result.render('liaders',{
                title: 'Лидеры',
                h1: 'Лидеры',
                rows: res,
                partials: {
                    header: 'partials/header',
                    footer: 'partials/footer'
                }
            });
        }
    })
});

//Контакты
app.get('/contacts', function(req, response, next){
    response.render('contacts',{
        title: 'Контакты',
        h1: 'Контакты',
        partials: {
            header: 'partials/header',
            footer: 'partials/footer'
        }
    });
});

app.post('/contacts', function(req, response, next){

    var name = req.body.username;
    var email = req.body.email;
    var message = req.body.message;
    var mailOptions = {
        ciphers: 'DES-CBC3-SHA',
        from: 'fss.anima@gmail.com',
        to: 'animadei@mail.ru',
        subject: 'Письмо от ' + name + ' email: ' + email,
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            response.render('notification',{
                title: 'Уведомление',
                h4: 'Уважаемый (ая), ' + name + '!',
                message: 'Благодарим Вас за обратную связь, в течение суток мы с Вами свяжемся через электронный ящик: ' + email,
                partials: {
                    header: 'partials/header',
                    footer: 'partials/footer'
                }
            });
        }
      });
});


//404
app.all('*', function(req, res, next){
  res.status(404);
  if(req.accepts('html')){
        res.render('404', { 
            url: req.url,
            title: '404',
            h1: 'Страницы не найдена, воспользуйтесь меню, чтобы перейти в другие разделы',
            partials: {
                header: 'partials/header',
                footer: 'partials/footer'
            }
        });
        return;
    }
});

app.all('/404', function(req, res, next){
  res.status(404);
  if(req.accepts('html')){
        res.render('404', { 
            url: req.url,
            title: '404',
            partials: {
                header: 'partials/header',
                footer: 'partials/footer'
            }
        });
        return;
    }
});

app.listen(8888);