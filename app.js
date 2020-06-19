var express       = require("express"),
    app           = express(),
    bodyparser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    seedDB        = require("./seeds")

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true,useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
// dir name refers to the directry we are presently in........
app.use(express.static(__dirname+ "/public"));

app.get("/",function(req,res){
    res.render("landing");
})

// INDEX ROUTE - show all campground
app.get("/campgrounds",function (req,res) {
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
app.post("/campgrounds",function(req,res){
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
app.get("/campgrounds/new",function(req,res){
    res.render("new");
})
// SHOW ROUTE - shows info about a particular campground
app.get("/campgrounds/:id",function(req,res){
    // find the campground with provided Id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            // render show template with that campground
            res.render("campgrounds/show",{campground: foundCampground});
        }
    })
    // render show template with that campground
    // res.render("show");
})

// ========================================
// comments route
// ========================================

// NEW ROUTE for comments for particular id
app.get("/campgrounds/:id/comments/new",function(req,res){
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
app.post("/campgrounds/:id/comments",function(req,res){
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
                    foundcampground.comments.push(comment);
                    foundcampground.save();
                    res.redirect('/campgrounds/'+ foundcampground._id);
                }
            })
        }
    })
})
app.listen(3000,function(){
    console.log("Yelp Camp Has Started!");
})