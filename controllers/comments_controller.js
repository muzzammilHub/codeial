const Comment = require('../models/comment');
const Post = require('../models/post');


// creating comment
module.exports.create = function(req, res){
    Post.findById(req.body.post)
        .then((post)=>{
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }).then((comment)=>{
                console.log('comment: ', comment);
                post.comments.push(comment);
                post.save();

                return res.redirect('/');
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


// deleting comment

module.exports.destroy = function(req, res){
        Comment.findById(req.params.id)
            .then((comment)=>{
                console.log(comment.user);
                if(comment.user == req.user.id){

                    let postId = comment.post;
                    console.log(postId);
                    
                    comment.deleteOne({_id : req.params._id})
                        .then((deleted)=>{
                            if(!deleted){
                                console.log("Error in deleting comment");
                                return;
                            }
                            Post.findByIdAndUpdate(postId, { $pull: 
                                { comments: {_id: req.params._id }} })
                                .then((updatePost)=>{
                                     if(!updatePost){
                                         console.log("Not Updated Post");
                                         return;
                                    }
                                    return res.redirect('back');
                                })
                                .catch((err)=>{
                                    console.log(err);
                                    return;
                                })
                        })
                        .catch((err)=>{
                            console.log(err);
                            return;
                        });
                }
                else
                    return res.redirect('back');
            })
           
    }