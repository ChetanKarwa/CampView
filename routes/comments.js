var express= require("express");
// merge params so that we get the id in this package also that is req.params.id 
var router = express.Router({mergeParams: true}); 
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
// ==================
// comments route
// ==================
// NEW ROUTE for comments for particular id
router.get("/new",isLoggedIn,function(req,res){
    //find campground by id and then pass it to comments page
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new",{campground: campground});
        }
    })
})

// POST ROUTE for comments
router.post("/",isLoggedIn,function(req,res){
    // look up the campground using id
    // create new comment 
    // connect new comment to campground
    // redirect to show page
    Campground.findById(req.params.id,function(err,foundcampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                    // add username and id to comment and then use it
                    comment.author.id= req.user._id;
                    comment.author.username= req.user.username;
                    // save it
                    comment.save();
                    foundcampground.comments.push(comment);
                    foundcampground.save();
                    res.redirect('/campgrounds/'+ foundcampground._id);
                }
            })
        }
    })
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;