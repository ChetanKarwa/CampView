var mongoose= require("mongoose");
var passportLocalMogoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
})

UserSchema.plugin(passportLocalMogoose);

module.exports = mongoose.model("User",UserSchema);