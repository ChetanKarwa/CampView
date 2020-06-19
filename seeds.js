var mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment");

var data=[
    {
        name: "Cloud Rest",
        image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=358&q=80",
        description: "blah blah blah"
    },
    {
        name: "second cat",
        image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "blah blah blah"
    },
    {
        name: "third cat",
        image: "https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
        description: "blah blah blah"
    },
]
function seedDB(){
    // Remove all campgrounds
    Campground.remove({},function(err){
        if(err){
            console.log(err)
        }else{
            console.log("Removed Campgrounds");
        }
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err)
                }else{
                    console.log("added a campground");
                    Comment.create(
                        {
                            text: "This place is great",
                            author: "Homer"
                        },function(err,comment){
                            if(err){
                                console.log(err)
                            }
                            else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("comment added");
                            }
                        });
                      }
                })
            })
        });
}   
    //add a few campground
     
    //add a few comments
module.exports = seedDB;