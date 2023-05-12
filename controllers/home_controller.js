const Post = require('../models/post');
const User = require('../models/user');


module.exports.home= function(req, res){
    
        // Post.find({})
        //     .then((posts)=>{
        //         return res.render('home', {
        //             title : 'Codeial | Home',
        //             posts: posts
        //         });
        //     })
        //     .catch((err)=>{
        //         console.log(err);
        //         return;
        //     })
            Post.find({})
                .populate('user')
                .populate({
                    path: 'comments',
                populate: {
                    path: 'user'
                }})
                .exec()
                .then((posts)=>{
                    User.find({})
                        .then((user)=>{
                            if(!user){
                                console.log('Error in finding user');
                                return;
                            }
                            return res.render('home', {
                                title : 'Codeial | Home',
                                posts: posts,
                                all_user: user
                            });
                        }).catch((err)=>{
                            console.log(err);
                            return;
                        })
                        
                })
                .catch((err)=>{
                    console.log(err);
                    return;
                })
    
  
}

// module.exports.actionName = function(req, res){} 