var mongoose = require('mongoose');

var Schema = mongoose.Schema;
// THIS IS A MONGOOSE SCHEMA FOR A COMMENT ENTITY IN MONGODB. 
var CommentSchema = new Schema({ 
		text: String,
		username: String,
		qID: {type: Schema.ObjectId, ref:"Question"},
		date: String
});

module.exports = mongoose.model("Comment", CommentSchema);