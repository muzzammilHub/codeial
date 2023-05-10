const Post = require('../models/post');

module.exports.create = function(req, res){
   console.log(req.user);
    Post.create({
        content: req.body.content,
        user: req.user.id
    })
        .then((post)=>{
            return res.redirect('back');
        })
        .catch((err)=>{
            console.log(err);
            return;
        })
}