var express = require("express"),
  app = express(),
  bodyparser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds")

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(bodyparser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");


app.get("/", function (req, res) {
  res.render("landing");
})

// INDEX ROUTE - show all campground
app.get("/campgrounds", function (req, res) {
  //get all the campgrounds from the database and then pass to campgrounds.ejs file
  Campground.find({}, function (err, allCampgrounds) {
    if (err)
      console.log(err);
    else
      res.render("index", {
        campgrounds: allCampgrounds
      })
  })
  // res.render("campgrounds",{campgrounds: campgrounds});    
});
// CREATE ROUTE -  add new campground to database
app.post("/campgrounds", function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newcampground = {
    name: name,
    image: image,
    description: description
  };
  Campground.create(newcampground, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  })
  // res.redirect("/campgrounds");
});

// NEW ROUTE- show form to create newcampground
app.get("/campgrounds/new", function (req, res) {
  res.render("new.ejs");
})
// SHOW ROUTE - shows info about a particular campground
app.get("/campgrounds/:id", function (req, res) {
  // find the campground with provided Id
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      // render show template with that campground
      res.render("show", {
        campground: foundCampground
      });
    }
  })
  // render show template with that campground
  // res.render("show");
})
app.listen(3000, function () {
  console.log("Yelp Camp Has Started!");
})