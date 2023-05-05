const User = require('../models/user')

module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title: "User Profile"
    })
}


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title: 'Codeial | Sign Up'
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in',{
        title: 'Codeial | Sign In'
    })
}

// sign up data
module.exports.create = function(req, res){
    console.log(req.body);
     if(req.body.password != req.body.confirm_password)
         return res.redirect('back');
     User.findOne({email: req.body.email})
        .then((user)=>{
            if(!user){
                User.create({
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name
                }).then((user)=>{
                    return res.redirect('/users/sign-in');
                }).catch((err)=>{
                    console.log('Error in creating user'); return;
                })
            }
            else{
                return res.redirect('/users/sign-in');
            }
       }).catch((err)=>{
        console.log(`Error in creating user ${err}`); return;
       })  
}


// sign in data
module.exports.createSession = function(req, res){
    // to do
}