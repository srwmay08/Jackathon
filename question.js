var mongoose = require ("mongoose");
var Schema = mongoose.Schema;

// THIS IS A MONGOOSE SCHEMA FOR A QUESTION ENTITY IN MONGODB. 
var QuestionSchema = new Schema({
		text: String,
		username: String,
		comments: [{type: Schema.ObjectId, ref: "Comment"}],
		date: String,
});

module.exports = mongoose.model("Question", QuestionSchema);