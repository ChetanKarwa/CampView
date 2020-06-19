var express             = require("express"),
    app                 = express(),
    bodyparser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    Campground          = require("./models/campground"),
    methodOverride      = require("method-override"),
    Comment             = require("./models/comment"),
    seedDB              = require("./seeds"),
    User                = require("./models/user"),
    commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

// seedDB();
mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true,useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
// dir name refers to the directry we are presently in........
app.use(express.static(__dirname+ "/public"));

// passport config
app.use(require("express-session")({
    secret: "Welcome to Yelpcamp World",   
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//==============END============

// this code will help to pass currentUser in all the ejs file
// this is used when we want that a particular file can be used anywhere
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})
//for update and destroy campgrounds
app.use(methodOverride("_method"));
// say our app to use those routes.......
// to reduce the duplication as always campgrounds always come we reduce it from everywhere
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);

app.listen(3000,function(){
    console.log("Yelp Camp Has Started!");
})