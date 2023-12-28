const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User", // Reference to the User schema
		required: true,
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course", // Reference to the Course schema
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Model for the comment
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
