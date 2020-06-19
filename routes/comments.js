var express= require("express");
// merge params so that we get the id in this package also that is req.params.id 
var router = express.Router({mergeParams: true}); 
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
// index.js is a special name so  it get require automatically
var middleware = require("../middleware");
// ==================
// comments route
// ==================
// NEW ROUTE for comments for particular id
router.get("/new",middleware.isLoggedIn,function(req,res){
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
router.post("/",middleware.isLoggedIn,function(req,res){
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

// EDIT ROUTE
// show form
router.get("/:comment_id/edit",middleware.checkCommentsOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{campground_id:  req.params.id,comment: foundComment});
        }
    })
 })

 //UPDATE form
 router.put("/:comment_id",middleware.checkCommentsOwnership,function(req,res){
     Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
         if(err){
             res.redirect("back")
         }else{
             res.redirect("/campgrounds/"+ req.params.id)
         }
     })
 })

 // COMMENT DESTROY ROUTE
 router.delete("/:comment_id",middleware.checkCommentsOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+ req.params.id)
        }
    })
 })

 //middleware
module.exports = router;