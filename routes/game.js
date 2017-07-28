const Games = require('./../models/game');
const F = require('./../models/functions');
const uuid = require('./../node_modules/uuid-v4');

let arrUser = [];

module.exports = function(app){

    //Выбор режима игры
    app.get('/game', function(req, res, next){
        req.session.id = req.session.id || uuid();
        console.log(req.session.id);
        restart(req);
        let level = F.getLevel(req);
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
        console.log(arrUser);
        if(arrUser[request.session.id].gameOver){restart(request);}
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
                var xCrypt = crypt(arrUser[request.session.id].arrCorrect.id.toString());
                response.render('flag_country', {
                title: 'Игра',
                rows: arrUser[request.session.id].arrRandom,
                country: arrUser[request.session.id].arrCorrect.country,
                x: xCrypt,
                current : arrUser[request.session.id].arrWait.length - arrUser[request.session.id].len,
                size:  arrUser[request.session.id].arrWait.length,
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
        console.log(arrUser);
        if(arrUser[request.session.id].gameOver){
            res.redirect('/gameover');
        }else{
            let find = true;
            for(var i=0; find; i++){
                if(arrUser[request.session.id].arrWait[i] != undefined){
                    if(arrUser[request.session.id].arrWait[i].id == arrUser[request.session.id].arrCorrect.id){
                        arrUser[request.session.id].arrWait[i] = undefined;
                        find = false;
                    }
                }
            }
            if(request.params.id == arrUser[request.session.id].arrCorrect.id){
                arrUser[request.session.id].countWins++;
            }else{
                arrUser[request.session.id].countLoses++;
            }
            if(arrUser[request.session.id].len == 0){
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
        if(arrUser[req.session.id].gameOver == true){
            response.redirect('/game');
        }else{
            arrUser[req.session.id].gameOver = true;
            let backURL = req.header('Referer') || '/';
            let filtr = {
                table: 'records',
                order: 'score'
            };
            Games.showAllOrderByName(filtr, function(err, result){
                if(err){
                    console.log(err);
                }else{
                    let reg = F.getRegion(req);
                    let levObj = F.getLevel(req); let lev; let scoreWin; 
                    if(levObj.easyS){
                        lev = 'нормальный';
                        scoreWin = arrUser[req.session.id].countWins *10;
                    }else{
                        lev = 'сложный';
                        scoreWin = arrUser[req.session.id].countWins *40;
                    }
                    let resultScore = scoreWin - (arrUser[req.session.id].countLoses * 3);
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
                                wins: arrUser[req.session.id].countWins,
                                loses: arrUser[req.session.id].countLoses,
                                length: arrUser[req.session.id].arrWait.length,
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
                            wins: arrUser[req.session.id].countWins,
                            loses: arrUser[req.session.id].countLoses,
                            length: arrUser[req.session.id].arrWait.length,
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
            let reg = F.getRegion(request);
            let levObj = F.getLevel(request); let lev; let scoreWin; 
            if(levObj.easyS){
                lev = 'нормальный';
                scoreWin = arrUser[request.session.id].countWins *10;
            }else{
                lev = 'сложный';
                scoreWin = arrUser[request.session.id].countWins *40;
            }
            let game;
            switch(request.body.game){
                case 'flag_country': game = 'угадать флаг по стране'; break;
                case 'country_flag': game = 'угадать страну по флагу'; break;
                case 'capital_country': game = 'угадать столицу по стране'; break;
                case 'country_capital': game = 'угадать страну по столице'; break;
                default: game = 'угадать флаг по стране';
            }
            let resultScore = scoreWin - (arrUser[request.session.id].countLoses * 3);
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
}
    function filtrRegion(req){
        let region = F.getRegion(req);
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
    function randomElements(res, request){
        if(arrUser[request.session.id].len == 0){
            arrUser[request.session.id].arrWait = res;
            arrUser[request.session.id].len = arrUser[request.session.id].arrWait.length;
        }
        arrUser[request.session.id].len--;
        arrUser[request.session.id].arrRandom = [];
        arrUser[request.session.id].rand = 0;
        arrUser[request.session.id].rand = Math.floor(Math.random() * res.length);
        for(var i=0;  arrUser[request.session.id].arrWait[arrUser[request.session.id].rand] == undefined; i++){
            arrUser[request.session.id].rand = Math.floor(Math.random() * res.length);
        }
        arrUser[request.session.id].arrRandom.push(arrUser[request.session.id].arrWait[arrUser[request.session.id].rand]);
        arrUser[request.session.id].arrCorrect = arrUser[request.session.id].arrRandom[0];
        for(var i = 0; arrUser[request.session.id].arrRandom.length < 4; i++){ 
            arrUser[request.session.id].rand = Math.floor(Math.random() * res.length);
            for(var y = 0; arrUser[request.session.id].arrRandom.length > y; y++){
                if(res[arrUser[request.session.id].rand].id == arrUser[request.session.id].arrRandom[y].id){
                    arrUser[request.session.id].rand = Math.floor(Math.random() * res.length);
                    y = -1;
                }
            }
            arrUser[request.session.id].arrRandom.push(res[arrUser[request.session.id].rand]);
        }
        for(var j, x, i = arrUser[request.session.id].arrRandom.length; i; j = parseInt(Math.random() * i), 
        x = arrUser[request.session.id].arrRandom[--i],
        arrUser[request.session.id].arrRandom[i] = arrUser[request.session.id].arrRandom[j],
        arrUser[request.session.id].arrRandom[j] = x);
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
    function restart(req){
        req.session.id = req.session.id || uuid();
        arrUser[req.session.id] = arrWait = [];
        arrUser[req.session.id] = arrCorrect = [];
        arrUser[req.session.id] = arrRandom = [];
        arrUser[req.session.id].len = 0;
        arrUser[req.session.id].countWins = 0;
        arrUser[req.session.id].countLoses = 0;
        arrUser[req.session.id].rand = 0;
        arrUser[req.session.id].gameOver = false;
    }
