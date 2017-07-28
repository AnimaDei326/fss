const {auth, mustBeAuthenticated} = require('./../models/auth');

module.exports = function(app){

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

    app.all('/admin/*', mustBeAuthenticated);
}