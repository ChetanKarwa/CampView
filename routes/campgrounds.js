var express= require("express");
var router = express.Router(); 
var Campground = require("../models/campground");
var middleware = require("../middleware");
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
router.post("/",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var image= req.body.image;
    var description= req.body.description;
    var author   = {
        id: req.user._id,
        username: req.user.username
    }
    var newcampground= {name: name, image: image, description: description,author: author};
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
router.get("/new",middleware.isLoggedIn,function(req,res){
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

// EDIT campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){

    Campground.findById(req.params.id,function(err,foundCampground){
       res.render("campgrounds/edit",{campground: foundCampground});
    });
});

// UPDATE campground route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    // find and update the correct campground 
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })
    // redirect to campground page
})

// DESTROY ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){ 
    Campground.findOneAndRemove(req.params.id,function(err,deletedCampground){
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds")
        }
    })
})


module.exports = router;