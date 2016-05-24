var mongoose = require ("mongoose");
var Schema = mongoose.Schema;

//* This page sets up what a question is made of using schemas to create the object. 
var QuestionSchema = new Schema({
		text: String,
		username: String,
		comments: [{type: Schema.ObjectId, ref: "Comment"}], //* This references "Comment" created on the CommentSchema page so that our Comments are tied to our questions through the same ID
		date: String,
});

module.exports = mongoose.model("Question", QuestionSchema); 

//* ^^ Here we define what QuestionSchema will be called so that whenever we use "Question" elsewhere the entire application knows exactly what goes into a "Question." We then export it so it can be used by other pages. 