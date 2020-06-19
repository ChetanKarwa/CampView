var express= require("express");
var router = express.Router(); 
var Campground = require("../models/campground");

// ====================
// CAMPGROUND ROUTE
// ====================
// INDEX ROUTE - show all campground
router.get("/",function (req,res) {
    // req.user contain info about the username if and only if it is logged in
    //get all the campgrounds from the database and then pass to campgrounds.ejs file
    Campground.find({},function(err,allCampgrounds){
        if(err)
            console.log(err);
        else
            res.render("campgrounds/index",{campgrounds: allCampgrounds})
    })
    // res.render("campgrounds",{campgrounds: campgrounds});    
});
// CREATE ROUTE -  add new campground to database
router.post("/",function(req,res){
    var name=req.body.name;
    var image= req.body.image;
    var description= req.body.description;
    var newcampground= {name: name, image: image, description: description};
    Campground.create(newcampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    })
    // res.redirect("/campgrounds");
});

// NEW ROUTE- show form to create newcampground
router.get("/new",function(req,res){
    res.render("campgrounds/new");
})
// SHOW ROUTE - shows info about a particular campground
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show",{campground: foundCampground});
        }
    })
})

module.exports = router;