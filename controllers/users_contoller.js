const User = require('../models/user')

module.exports.profile = function(req, res){
    User.findById(req.params.id)
        .then((user)=>{
            if(!user){
                console.log('Error'); return;
            }
            return res.render('user_profile',{
                title: "User Profile",
                user_profile: user
            })
        }).catch((err)=>{
            console.log(err); return;
        })
   
}


// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: 'Codeial | Sign Up'
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    // given by passport to request
    req.logout(function(err){
        if(err) {console.log(err); return }
        return res.redirect('/');
    });
}


module.exports.update = function(req, res){
    if(req.params.id == req.user.id){
        User.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            email: req.body.email
        }).then((updated)=>{
            if(!updated){
                console.log('Error');
                return;
            }
            return res.redirect('back');
        }).catch((err)=>{
            console.log(err);
            return;
        })
}else{
    return res.status(401).send('unauthorized');
}
}