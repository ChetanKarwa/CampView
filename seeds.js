var mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user");

var data=[
    {
        name: "Cloud Rest",
        image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus"
    },
    {
        name: "Enjoying Scene",
        image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus"
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus"
    },
]
function seedDB(){
    // User.remove({},function(err){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log("Removed User")
    //     }
    // })
    // Remove all campgrounds
    Campground.remove({},function(err){
        // if(err){
        //     console.log(err)
        // }else{
        //     console.log("Removed Campgrounds");
        // }
        // data.forEach(function(seed){
        //     Campground.create(seed,function(err,campground){
        //         if(err){
        //             console.log(err)
        //         }else{
        //             console.log("added a campground");
        //             Comment.create(
        //                 {
        //                     text: "This place is great",
        //                     author: "Homer"
        //                 },function(err,comment){
        //                     if(err){
        //                         console.log(err)
        //                     }
        //                     else{
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("comment added");
        //                     }
        //                 });
        //               }
        //         })
        //     })
        });
}   
    //add a few campground
     
    //add a few comments
module.exports = seedDB;