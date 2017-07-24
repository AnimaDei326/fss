const express = require('express');
const templating = require('consolidate');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


const cookieParser = require('cookie-parser');
app.use(cookieParser());


const session = require('cookie-session');
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  httpOnly: false
}));


const fileUpload = require('express-fileupload');
app.use(fileUpload());


app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/images/flags', express.static(__dirname + '/images/flags'));



const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const Games = require('./models/game');
const Users = require('./models/user');

const Strategy = require('passport-local').Strategy;


//let arrWait = []; //массив для id, которые не были сыграны, пересенено в сессию
let arrCorrect = []; //массив, содержащий верный ответ
//let length = 0; //длина для несыгранных элементов, пересенено в сессию
let countWins = 0; //счетчик верно угаданнных
let countLoses = 0; //счетчик неверно угаданнных
let arrRandom = []; //массив для случайных стран 
let rand = 0; //рандомое число
let gameOver = false; //флаг, определяющий конец игры

//Авторизация
passport.use(new Strategy(function(username, password, done){
    let filtr = {
        table: 'users',
        column1: 'name',
        value1: username,
        column2: 'password',
        value2: password
    };
    Users.auth(filtr, function(err, userdata){
        if(err){
            console.log(err);
            return done(null, false);
        }else if(userdata != undefined){
           return done(null, {user: userdata });
        }else{
            return done(null, false);
        }
    });
}));


passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(id, done){
    done(null, id);
});

const auth = passport.authenticate('local', {
        successRedirect: '/admin/countries', 
        failureRedirect: '/login'
});

app.get('/login', function(req, res, next){
    res.render('admin', {
        title: 'Админка',
        partials: {
            header: 'partials/header',
            footer: 'partials/footer'
        }
    })
});

app.post('/login', auth);

app.get('/admin/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

const mustBeAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
};

app.all('/admin/*', mustBeAuthenticated);



//Главная страница
app.get('/', function(req, res, next){
    res.render('index', {
        title: 'Главная страница',
        partials: {
            header: 'partials/header',
            footer: 'partials/footer'
        }
    })
});

//Админская часть

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

//Выбор режима игры
app.get('/game', function(req, res, next){
    restart(req);
    let level = getLevel(req);
    if(level.easyS == true){
        res.render('game_change', {
        title: 'Выбор игры',
            partials: {
                header: 'partials/header',
                footer: 'partials/footer'
            }
        });
    }else if(level.hardS == true){
        res.render('game_change_hard', {
        title: 'Выбор игры',
            partials: {
                header: 'partials/header',
                footer: 'partials/footer'
            }
        });
    }
});
//Игра угадать флаг по стране (легкий уровень)
app.get('/game/flag_country', function(request, response, next){
    console.log('flag_country');
    console.log(request.session);
    
    if(gameOver){restart(request);}
    let filtr = filtrRegion(request);
    let operation = '';
    if(typeof(filtr) == 'string'){
        operation =  Games.showAll;
    }else{
        operation = Games.doubleSelect;
    }
    operation(filtr, function(err, res){
        if(err){
            console.log(err);
        }else{
            randomElements(res, request);
            var xCrypt = crypt(arrCorrect.id.toString());
            response.cookie('site',  {site: 'test'},
                                    { maxAge: 60*60*24,
                                      httpOnly:false});
            response.render('flag_country', {
            title: 'Игра',
            rows: arrRandom,
            country: arrCorrect.country,
            x: xCrypt,
            current : request.session.arrWait.length - request.session.len,
            size: request.session.arrWait.length,
            partials: {
                header: 'partials/header',
                footer: 'partials/footer'
            }
            });
        }
    });
});

//Игра угадать флаг по стране (сложный уровень)
app.get('/game/flag_country_hard', function(request, result, next){
    if(gameOver){restart();}
    let filtr = filtrRegion(request);
    let operation = '';
    if(typeof(filtr) == 'string'){
        operation =  Games.showAll;
    }else{
        operation = Games.doubleSelect;
    }
    operation(filtr, function(error, res){
        if(error){
            console.log(error);
        }else{
            filtr = likeElements(res);
            Games.selectOR(filtr, function(err, r){
                if(err){
                    console.log(err);
                }else{
                    var xCrypt = crypt(arrCorrect.id.toString());
                    result.render('flag_country_hard', {
                        title: 'Игра',
                        row: r,
                        country: arrCorrect.country,
                        x: xCrypt,
                        current : arrWait.length - length,
                        size: arrWait.length,
                        partials: {
                            header: 'partials/header',
                            footer: 'partials/footer'
                        }
                    });
                }
            })
            
        }
    });
});

//Игра угадать страну по флагу (легкий уровень)
app.get('/game/country_flag', function(request, result, next){
    if(gameOver){restart();}
    let filtr = filtrRegion(request);
    let operation = '';
    if(typeof(filtr) == 'string'){
        operation =  Games.showAll;
    }else{
        operation = Games.doubleSelect;
    }
    operation(filtr, function(err, res){
        if(err){
            console.log(err);
        }else{
            randomElements(res);
            var xCrypt = crypt(arrCorrect.id.toString());
            result.render('country_flag', {
            title: 'Игра',
            rows: arrRandom,
            imgSrc : arrCorrect.id,
            x: xCrypt,
            current : arrWait.length - length,
            size: arrWait.length,
            partials: {
                header: 'partials/header',
                footer: 'partials/footer'
            }
            });
        }
    });
});

//Игра угадать страну по флагу (сложный уровень)
app.get('/game/country_flag_hard', function(request, result, next){
    if(gameOver){restart();}
    let filtr = filtrRegion(request);
    let operation = '';
    if(typeof(filtr) == 'string'){
        operation =  Games.showAll;
    }else{
        operation = Games.doubleSelect;
    }
    operation(filtr, function(err, res){
        if(err){
            console.log(err);
        }else{
            randomElements(res);
            var xCrypt = crypt(arrCorrect.country);
            result.render('country_flag_hard', {
            title: 'Игра',
            h1: 'Угадай страну',
            imgSrc : arrCorrect.id,
            x: xCrypt,
            current : arrWait.length - length,
            size: arrWait.length,
            partials: {
                header: 'partials/header',
                footer: 'partials/footer'
            }
            });
        }
    });
});

//Игра угадать столицу по стране (легкий уровень)
app.get('/game/capital_country', function(request, result, next){
    if(gameOver){restart();}
    let filtr = filtrRegion(request);
    let operation = '';
    if(typeof(filtr) == 'string'){
        operation =  Games.showAll;
    }else{
        operation = Games.doubleSelect;
    }
    operation(filtr, function(err, res){
        if(err){
            console.log(err);
        }else{
            randomElements(res);
            var xCrypt = crypt(arrCorrect.id.toString());
            result.render('capital_country', {
            title: 'Игра',
            rows: arrRandom,
            country: arrCorrect.country,
            x: xCrypt,
            current : arrWait.length - length,
            size: arrWait.length,
            partials: {
                header: 'partials/header',
                footer: 'partials/footer'
            }
            });
        }
    });
});
//Игра угадать столицу по стране (сложный уровень)
app.get('/game/capital_country_hard', function(request, result, next){
    if(gameOver){restart();}
    let filtr = filtrRegion(request);
    let operation = '';
    if(typeof(filtr) == 'string'){
        operation =  Games.showAll;
    }else{
        operation = Games.doubleSelect;
    }
    operation(filtr, function(err, res){
        if(err){
            console.log(err);
        }else{
            randomElements(res);
            var xCrypt = crypt(arrCorrect.capital);
            result.render('capital_country_hard', {
                title: 'Игра',
                h1: 'Угадай столицу',
                country: arrCorrect.country,
                x: xCrypt,
                current : arrWait.length - length,
                size: arrWait.length,
                partials: {
                    header: 'partials/header',
                    footer: 'partials/footer'
                }
            });
        }
    });
});
//Игра угадать страну по столице (легкий уровень)
app.get('/game/country_capital', function(request, result, next){
    if(gameOver){restart();}
    let filtr = filtrRegion(request);
    let operation = '';
    if(typeof(filtr) == 'string'){
        operation =  Games.showAll;
    }else{
        operation = Games.doubleSelect;
    }
    operation(filtr, function(err, res){
        if(err){
            console.log(err);
        }else{
            randomElements(res);
            var xCrypt = crypt(arrCorrect.id.toString());
            result.render('country_capital', {
            title: 'Игра',
            rows: arrRandom,
            capital: arrCorrect.capital,
            x: xCrypt,
            current : arrWait.length - length,
            size: arrWait.length,
            partials: {
                header: 'partials/header',
                footer: 'partials/footer'
            }
            });
        }
    });
});
//Игра угадать страну по столице (сложный уровень)
app.get('/game/country_capital_hard', function(request, result, next){
    if(gameOver){restart();}
    let filtr = filtrRegion(request);
    let operation = '';
    if(typeof(filtr) == 'string'){
        operation =  Games.showAll;
    }else{
        operation = Games.doubleSelect;
    }
    operation(filtr, function(err, res){
        if(err){
            console.log(err);
        }else{
            randomElements(res);
            var xCrypt = crypt(arrCorrect.country);
            result.render('country_capital_hard', {
            title: 'Игра',
            h1: 'Угадай страну',
            capital: arrCorrect.capital,
            x: xCrypt,
            current : arrWait.length - length,
            size: arrWait.length,
            partials: {
                header: 'partials/header',
                footer: 'partials/footer'
            }
            });
        }
    });
});
//проверка верного ответа (легкий уровень)
app.get('/game/check/:id', function(request, res, next){
    console.log('check');
    console.log(request.session.arrWait); //если длина arrWait == 37 не работает, но если 36 и меньше - работает
    if(gameOver){
        res.redirect('/gameover');
    }else{
        let find = true;
        for(var i=0; find; i++){
            if(request.session.arrWait[i] != undefined){
                if(request.session.arrWait[i].id == arrCorrect.id){
                    request.session.arrWait[i] = undefined;
                    find = false;
                }
            }
        }
        if(request.params.id == arrCorrect.id){
            countWins++;
        }else{
            countLoses++;
        }
        if(request.session.len == 0){
            //gameOver = true;
            res.redirect('/gameover');
        }else{
            let backURL = request.header('Referer') || '/';
            res.redirect(backURL);
        }
    }
});
//проверка верного ответа (сложный уровень)
app.get('/game/check_hard/:country', function(req, res, next){
    if(gameOver){
        res.redirect('/gameover');
    }else{
        let find = true;let correct;
        for(var i=0; find; i++){
            if(arrWait[i] != undefined){
                if(arrWait[i].id == arrCorrect.id){
                    arrWait[i] = undefined;
                    find = false;
                }
            }
        }
        let backURL = req.header('Referer') || '/';
        if(backURL.indexOf('country_capital') + 1){
            correct = arrCorrect.country.toLowerCase();
        }else{
            correct = arrCorrect.capital.toLowerCase();
        }
        if(req.params.country == correct){
            countWins++;
        }else{
            countLoses++;
        }
        if(length == 0){
            //gameOver = true;
            res.redirect('/gameover');
        }else{
            
            res.redirect(backURL);
        }
    }
});
//конец игры
app.get('/gameover', function(req, response, next){
    if(gameOver == true){
        response.redirect('/game');
    }else{
        gameOver = true;
        let backURL = req.header('Referer') || '/';
        let filtr = {
            table: 'records',
            order: 'score'
        };
        Games.showAllOrderByName(filtr, function(err, result){
            if(err){
                console.log(err);
            }else{
                let reg = getRegion(req);
                let levObj = getLevel(req); let lev; let scoreWin; 
                if(levObj.easyS){
                    lev = 'нормальный';
                    scoreWin = countWins *10;
                }else{
                    lev = 'сложный';
                    scoreWin = countWins *40;
                }
                let resultScore = scoreWin - (countLoses * 3);
                if(resultScore > 0){
                    let begin = backURL.indexOf('/game');
                    let end = backURL.indexOf('_hard'); let game;
                    if(end < 0 ){
                        game = backURL.substring(begin + 6, backURL.length);
                    }else{
                        game = backURL.substring(begin + 6, end);
                    }
                    if(result.length < 10 || (resultScore > result[result.length - 10].score) ){
                        console.log('последняя десятка рекорд ' + result[result.length - 10].score);
                        console.log('сейчас лучший рекорд ' + resultScore);
                        response.render('new_record', {
                            title: 'Новый рекорд',
                            gamename : game,
                            partials: {
                                header: 'partials/header',
                                footer: 'partials/footer'
                            }
                        });
                    }else{
                        response.render('gameover',{
                            title: 'Конец игры',
                            wins: countWins,
                            loses: countLoses,
                            length: req.session.arrWait.length,
                            back: backURL,
                            partials: {
                                header: 'partials/header',
                                footer: 'partials/footer'
                            }
                        });
                    }
                }else{
                    response.render('gameover',{
                        title: 'Конец игры',
                        wins: countWins,
                        loses: countLoses,
                        length: req.session.arrWait.length,
                        back: backURL,
                        partials: {
                            header: 'partials/header',
                            footer: 'partials/footer'
                        }
                    });
                }
            }
        })
    }
});
//Новый рекорд
app.post('/game/new_record', function(request, response, next){
    if(request.body.username && request.body.city){
        let reg = getRegion(request);
        let levObj = getLevel(request); let lev; let scoreWin; 
        if(levObj.easyS){
            lev = 'нормальный';
            scoreWin = countWins *10;
        }else{
            lev = 'сложный';
            scoreWin = countWins *40;
        }
        let game;
        switch(request.body.game){
            case 'flag_country': game = 'угадать флаг по стране'; break;
            case 'country_flag': game = 'угадать страну по флагу'; break;
            case 'capital_country': game = 'угадать столицу по стране'; break;
            case 'country_capital': game = 'угадать страну по столице'; break;
            default: game = 'угадать флаг по стране';
        }
        let resultScore = scoreWin - (countLoses * 3);
        let filtr = {
            table : 'records',
            set : {
                username: request.body.username,
                city : request.body.city,
                region: reg,
                game: game,
                score: resultScore,
                level_game: lev
            }
        };
        Games.insert(filtr, function(error, result){
            if(error){
                console.log(error);
            }else{
                response.send('ok!');
            }
        })
    }else{
        response.redirect('/game');
    }
})
//Обучение
app.get('/education', function(req, result, next){
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
            result.render('education',{
                title: 'Обучение',
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

//Настройки
app.get('/settings', function(req, result, next){
    let obj = getLevel(req);
    let regionS = getRegion(req);
    Games.showAll('regions', function(err, res){
        if(err){
            console.log(err);
        }else{
            result.render('settings',{
                title: 'Настройки',
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
    result.redirect('/');
});

function filtrRegion(req){
    let region = getRegion(req);
    let filtr;
    if(region == 'Все'){
        filtr = 'countries';
    }else{
        filtr = {
            table1: 'countries',
            column1: 'id_region',
            table2: 'regions',
            column2: 'name',
            value2: region 
        };
    }
    return filtr;
}
function getRegion(req){
    if(!req.session.region){
        req.session.region = 'Европа';
    }
    return req.session.region;
}
function getLevel(req){
    let easy, hard;
    if(!req.session.level){
        req.session.level = 'нормальный';
    }
    switch(req.session.level){
        case "нормальный": easy = true; break;
        case "сложный": hard = true; break;
        default: easy = true; break;
    }
    let obj = {
        easyS: easy,
        hardS: hard
    };
    return obj;
}


function randomElements(res, request){
    if(request.session.len == 0){
        request.session.arrWait = res;
        request.session.len = request.session.arrWait.length;
    }
    console.log('random');
    console.log(request.session);
    request.session.len--;
    arrRandom = [];
    rand = "";
    rand = Math.floor(Math.random() * res.length);
    for(var i=0; request.session.arrWait[rand] == undefined; i++){
        rand = Math.floor(Math.random() * res.length);
    }
    arrRandom.push(request.session.arrWait[rand]);
    arrCorrect = arrRandom[0];
    for(var i = 0; arrRandom.length < 4; i++){ 
        rand = Math.floor(Math.random() * res.length);
        for(var y = 0; arrRandom.length > y; y++){
            if(res[rand].id == arrRandom[y].id){
                rand = Math.floor(Math.random() * res.length);
                y = -1;
            }
        }
        arrRandom.push(res[rand]);
    }
    for(var j, x, i = arrRandom.length; i; j = parseInt(Math.random() * i), x = arrRandom[--i], arrRandom[i] = arrRandom[j], arrRandom[j] = x);
}
function likeElements(res){
    if(arrWait.length == 0){
        arrWait = res;
        length = arrWait.length;
    }
    length--;
    arrRandom = [];
    rand = 0;
    rand = Math.floor(Math.random() * res.length);
    for(var i=0; arrWait[rand] == undefined; i++){
        rand = Math.floor(Math.random() * res.length);
    }
    arrRandom.push(arrWait[rand]);
    arrCorrect = arrRandom[0];
    var filtr = {
        table: 'likes',
        column1: 'id_1',
        value1: arrCorrect.id,
        column2: 'id_2',
        value2: arrCorrect.id,
        column3: 'id_3',
        value3: arrCorrect.id,
        column4: 'id_4',
        value4: arrCorrect.id
    };
    return filtr;
    //for(var j, x, i = arrRandom.length; i; j = parseInt(Math.random() * i), x = arrRandom[--i], arrRandom[i] = arrRandom[j], arrRandom[j] = x);
}
function restart(req){
    req.session.len = 0;
    req.session.arrWait = [];
    //arrWait = [];
    arrCorrect = [];
    //length = 0;
    countWins = 0;
    countLoses = 0;
    arrRandom = [];
    rand = 0; 
    gameOver = false;
    console.log('restart \n'+ req.session.len);
    console.log('restart \n'+ req.session.arrWait);
}

function crypt(input){
    var output = "";
    for(var i = 0; i < input.length; i++){
        if(input[i] != '-'){
            output += input[i].charCodeAt();
        }else{
            output += '----';
        }
    }
    return output;
}

app.listen(8888);