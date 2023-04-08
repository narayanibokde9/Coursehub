const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	courseType: {
		type: String,
		required: true,
	},
	instructor: {
		type: String,
		required: true,
	},
	offered_by: {
		type: String,
		required: true,
	},
	images: String,
	course_likes: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
	likes_count: { type: Number, default: 0 },
	comment: [
		{
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
	course_link: String,
});

// CourseSchema.virtual("likes_count").get(function () {
// 	return this.course_likes.length;
// });

module.exports = mongoose.model("Course", CourseSchema);
