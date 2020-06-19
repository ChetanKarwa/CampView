var express= require("express"),
    app= express(),
    bodyparser= require("body-parser"),
    mongoose= require("mongoose");

    
mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true,useUnifiedTopology: true});

app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");

// SCHEMA SETUP
var campgroundSchema= new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground= mongoose.model("Campground",campgroundSchema);


// to make new object to database
//  Campground.create(
//      {
//          name: "Granite Hill",
//          image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//          description:  "This is the huge granite hill, no bathrooms. No water. Beautiful granite"   
//     },
//      function(err,campground)
//      {
//          if(err){
//              console.log(err);
//          }else{
//              console.log("NEWLY CREATED CAMPGROUND:");
//              console.log(campground);
//          }
//      }
//  )

// when we dont have the database
// var campgrounds=[
//     {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
//     {name: "Granite Hill", image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
//     {name: "Mountain's Goat", image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
//     {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
//     {name: "Granite Hill", image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
//     {name: "Mountain's Goat", image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
//     {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
//     {name: "Granite Hill", image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
//     {name: "Mountain's Goat", image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"}
// ]


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
            res.render("index",{campgrounds: allCampgrounds})
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
    res.render("new.ejs");
})
// SHOW ROUTE - shows info about a particular campground
app.get("/campgrounds/:id",function(req,res){
    // find the campground with provided Id
    Campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            // render show template with that campground
            res.render("show",{campground: foundCampground});
        }
    })
    // render show template with that campground
    // res.render("show");
})
app.listen(3000,function(){
    console.log("Yelp Camp Has Started!");
})