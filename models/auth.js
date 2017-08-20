const Users = require('./../models/user');
const passport = require('./../node_modules/passport');
const Strategy = require('./../node_modules/passport-local').Strategy;

module.exports = function(app){
    app.use(passport.initialize());
    app.use(passport.session());
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
            successRedirect: '/admin/facts', 
            failureRedirect: '/login'
    });

    const mustBeAuthenticated = function(req, res, next){
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect('/');
        }
    };
    
    module.exports = {auth, mustBeAuthenticated};
}
