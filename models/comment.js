var mongoose= require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    // this is done so that we can save to our database the username and its id
    author: 
    {
        id:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

module.exports= mongoose.model("Comment",commentSchema);