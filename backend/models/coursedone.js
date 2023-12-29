const mongoose = require("mongoose");

const courseDoneSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
	completionDate: { type: Date, default: Date.now }, // Adding completion date field
	// Other fields if needed
});

const CourseDone = mongoose.model("CourseDone", courseDoneSchema);

module.exports = CourseDone;
