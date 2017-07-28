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
  keys: ['qwe', 'rty'],
  httpOnly: false
}));

const fileUpload = require('express-fileupload');
app.use(fileUpload());

const Games = require('./models/game');
const F = require('./models/functions');

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/images/flags', express.static(__dirname + '/images/flags'));

require('./models/auth.js')(app);
require('./routes/login.js')(app);
require('./routes/admin.js')(app);
require('./routes/game.js')(app);

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
    let obj = F.getLevel(req);
    let regionS = F.getRegion(req);
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

app.listen(8888);