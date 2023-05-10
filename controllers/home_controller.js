const Post = require('../models/post');

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
            Post.find({}).populate('user').exec()
                .then((posts)=>{
                    return res.render('home', {
                        title : 'Codeial | Home',
                        posts: posts
                    });
                })
                .catch((err)=>{
                    console.log(err);
                    return;
                })
    
  
}

// module.exports.actionName = function(req, res){} 