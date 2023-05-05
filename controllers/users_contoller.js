const User = require('../models/user')

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id)
            .then((user)=>{
                return res.render('user_profile', {
                    title: 'User Profile',
                    user: user
                });
            }).catch((err)=>{console.log('Error in finding user'); return;})
    }else{
       return res.redirect('/users/sign-in'); 
    }
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


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    // find the user
    User.findOne({email: req.body.email})
    .then((user)=>{
        // handle user not found
        if(!user){
            console.log('User not found');
            return res.redirect('back');
        }
        else{
            // handle passwords not matched
            if(user.password != req.body.password)
                return res.redirect('back');

            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
    }).catch((err)=>{
        // handle error
        console.log('Error in finding user');
        return;
    })
}


module.exports.destroySession = function(req, res){
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}