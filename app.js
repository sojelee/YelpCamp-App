var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    passport    =require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    Campground  = require('./models/campground'),
    Comment     = require('./models/comment'),
    seedDB      = require('./seeds'),
    User        = require('./models/user')
    
var IndexRoutes      = require('./routes/index'),
    CampgroundRoutes = require('./routes/campgrounds'),
    CommentRoutes    = require('./routes/comments')
    //seedDB();
mongoose.connect('mongodb://localhost/yelp_camp_12');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(require('express-session')({
    secret:'this is a secret phrase',
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
   res.locals.currentUser= req.user;
   next();
});

app.use(IndexRoutes);
app.use('/campgrounds',CampgroundRoutes);
app.use('/campgrounds/:id/comments',CommentRoutes);

app.listen(process.env.PORT,process.env.IP,()=>{
    console.log('Yelp Camp Started !!!');
});