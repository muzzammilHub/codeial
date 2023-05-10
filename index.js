const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('passport-local');
const session = require('express-session');
const MongoStore = require('connect-mongo');


app.use(express.static('./assets'));

app.use(cookieParser());
app.use(expressLayouts);
app.use(express.urlencoded({extended: true}));

// extract style and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');




app.use(session({
    name: 'codeial',
    secret: 'blahsomthing',
    saveUninitialized: false,
    resave: false,
     cookie:{
         maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development',
        autoRemove: 'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());

function setAuthenticatedUser(req, res, next) {
    passport.setAuthenticatedUser(req, res, next);
}
app.use(setAuthenticatedUser);

// use express router
app.use('/', require('./routes/index'));

app.listen(port, (err)=>{
    if(err){
        console.log(`Error: ${err}`); //interpolation `(back-ticks)
    }
    else{
        console.log(`Server is up and running on port: ${port}`);
    }
})