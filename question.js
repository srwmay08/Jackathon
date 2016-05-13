var mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
		text: String,
		username: String,
		comments: [{type: Schema.ObjectId, ref: "Comment"}],
		date: String,
});

mongoose.model("Question", QuestionSchema);