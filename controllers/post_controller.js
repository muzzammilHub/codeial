const Post = require('../models/post');
const Comment = require('../models/comment');

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
        });
}

module.exports.destroy = function(req, res){
    Post.findById(req.params.id)
        .then((post)=>{
            // .id means converting the object id into string
            if(post.user == req.user.id){
                post.deleteOne({_id: req.params._id});
                Comment.deleteMany({post: req.params.id}).catch((err)=>{ console.log(err); return res.redirect('back');})
                return res.redirect('back');
            }
            else{
                return res.redirect('back');
            }
        })
        .catch((err)=>{
            console.log(err);
            return;
        })
}