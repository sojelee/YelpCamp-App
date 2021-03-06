var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");
var mw = require('../middleware');

// route for the campgrounds index page fetches campgrounds from the database
router.get('/',(req,res)=>{
    
    Campground.find({},(err,allCampgrounds)=>{
      
        if(err){
            console.log(err);
        }else{
            res.render('campgrounds/index',{campgrounds:allCampgrounds,currentUser:req.user});
        }
        
    });
    
    
})

// route for creating campgrounds and save to the database

router.post('/',mw.isLoggedIn,(req,res)=>{
    
    var newCampground=req.body.campground;
    
    newCampground.author={id:req.user._id,username:req.user.username};
    
    Campground.create(newCampground,(err,newlyCreated)=>{
        
        if(err){
            console.log(err);
        }else{
            
            // redirect to campgrounds page
            res.redirect('/campgrounds');
        }
        
    });
    
});

router.get('/new',mw.isLoggedIn,(req,res)=>{
   res.render('campgrounds/new'); 
});


// SHOW - shows more info about one campground

router.get('/:id',(req, res)=>{
  
    // Find the campground with provided ID
    
    Campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
    
            if(err){
                
            console.log('camp ground not found');
            
             }else{
                 
            //console.log(foundCampground);
            
            // render show template with that campground
             res.render('campgrounds/show',{campground:foundCampground,currentUser:req.user});
        }
        
    });

});

// edit campground route
router.get('/:id/edit',mw.checkCampgroundOwnership,(req,res)=>{
    
   var campgroundid=req.params.id;
   
     Campground.findById(campgroundid,(err,foundCampground)=>{
       res.render('campgrounds/edit',{campgroundedit:foundCampground});
   });
   
});

// update campgournd route

router.put('/:id',mw.checkCampgroundOwnership,(req,res)=>{
    
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,updatedCampground)=>{
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds/'+req.params.id);
        }
    })

});


// delete campground route

router.delete('/:id',mw.checkCampgroundOwnership,(req,res)=>{
    
    Campground.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            res.redirect('/campgrouns');
        }else{
            res.redirect('/campgrounds')
        }
    });
    
});

module.exports = router;