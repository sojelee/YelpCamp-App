var express = require('express');
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

// route to the application landing page
router.get('/',(req,res)=>{
    
    res.render('landing');
})

// route to show the registration form
router.get("/register",(req,res)=>{
    res.render("register")
})

// route to create the user to the database
router.post("/register",(req,res)=>{
    User.register(new User({username: req.body.username}), req.body.password,(err,user)=>{
        if(err){
            console.log(err)
            return res.render("register")
        }
        passport.authenticate("local")(req,res, ()=>{
            res.redirect("/campgrounds")
        })
    })
})

// route to show the login form
router.get("/login",(req,res)=>{
    res.render("login")
})

router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
    
}),(req,res)=>{
    
    
})

// application logout route
router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
   
})
// middleware
function isLoggedIn(req,res,next){
      if(req.isAuthenticated()){
          return next()
      }
      res.redirect("/login")
}


module.exports = router;