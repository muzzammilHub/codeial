const Comment = require('../models/comment');
const Post = require('../models/post');


// creating comment
module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
            
        let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
        post.comments.push(comment);
        post.save();

        return res.redirect('/');
    }catch(err){
        console.log(err);
        return;
    }
    
}


// deleting comment

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);

                if(comment.user == req.user.id){

                    let postId = comment.post;
                    console.log(postId);
                    
                    await comment.deleteOne({_id : req.params._id});
                            
                    await Post.findByIdAndUpdate(postId, { $pull: 
                                { comments: {_id: req.params._id }} });
                                    
                    return res.redirect('back');
                                
                }
                else
                    return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }            
}