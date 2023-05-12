const User = require('../models/user')

module.exports.profile = async function(req, res){
    
    try{
        let user = await User.findById(req.params.id)
        return res.render('user_profile',{
            title: "User Profile",
            user_profile: user
        });
    }catch(err){
        console.log('Error: ', err);
        return;
    }
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
module.exports.create = async function(req, res){
    
    try{
        if(req.body.password != req.body.confirm_password)
         return res.redirect('back');
        let user = await User.findOne({email: req.body.email});
            if(!user){
                User.create({
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name
                });

                return res.redirect('/users/sign-in');
            }
            else{
                return res.redirect('/users/sign-in');
            }
    }catch(err){
        console.log(err);
        return;
    }
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


module.exports.update = async function(req, res){
    if(req.params.id == req.user.id){
        await User.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            email: req.body.email
        });
        return res.redirect('back');
}else{
    return res.status(401).send('unauthorized');
}
}