var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({ 
		text: String,
		username: String,
		qID: {type: Schema.ObjectId, ref:"Question"},
		date: String
});

mongoose.model("Comment", CommentSchema);