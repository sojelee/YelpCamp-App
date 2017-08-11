var express = require('express');
var router = express.Router({mergeParams:true});
var Campground = require('../models/campground');
var Comment    = require('../models/comment');
var mw = require('../middleware');


// Comment new Form route

router.get('/new',mw.isLoggedIn,(req,res)=>{
    
    Campground.findById(req.params.id, (err,campground)=>{
        if(err){
            console.log(err)
        }else{
           res.render('comments/new',{campground:campground}); 
        }
    })
       
});

// Comment create route

router.post('/',mw.isLoggedIn,(req,res)=>{
    
    Campground.findById(req.params.id,(err,campground)=>{
        
        if(err){
            console.log(err)
        }else{
           var text = req.body.comment.text;
           var author = {id:req.user._id,username:req.user.username};
           
           Comment.create({text,author},(err,comment)=>{
               if(err){
                   console.log(err)
               }else{
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect('/campgrounds/'+ campground._id);
               }
           })
        }
    })
    
});
// route to edit comment
router.get('/:comment_id/edit',mw.checkCommentOwnership,(req,res)=>{
    
      Comment.findById(req.params.comment_id,(err,foundComment)=>{
        res.render('comments/edit',{campground_id:req.params.id,comment:foundComment});
      });
      
});

// route to update comment
router.put('/:comment_id',(req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedComment)=>{
        if(err){
            
            res.direct('back');
            
        }else{
            
            res.redirect('/campgrounds/'+req.params.id);
        }
    })
    
})

// route to delete comment


router.delete('/:comment_id',(req,res)=>{
    
    Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
        if(err){
            res.redirect('/campgrouns');
        }else{
            res.redirect('/campgrounds/'+req.params.id)
        }
    });
});

module.exports = router;