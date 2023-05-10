const passport = require('passport');
const User = require('../models/user')
const localStrategy = require('passport-local').Strategy;


// authentication using passport
passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, done){
    User.findOne({email: email})
        .then((user)=>{
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }
                return done(null, user);            
        }).catch((err)=>{
            console.log('Error in finding user --> Passport');
            return done(err);
        })
}
));

// serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserialize the user from the key in the cookies
passport.deserializeUser(function(id, done){
User.findById(id)
    .then((user)=>{
        return done(null, user);
    })
    .catch((err)=>{console.log('Error in finding user'); return done(err);})
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        console.log('True');
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req, res, next){
     if(req.isAuthenticated()){

         console.log(req.user);
         res.locals.user = req.user;

        
     }
     next();
}

module.exports = passport; 