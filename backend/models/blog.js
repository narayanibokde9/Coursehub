const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
	date: { type: String },
	organiser: { type: String },
	venue: { type: String },
	start_time: { type: String },
	end_time: { type: String },
	description: { type: String },
});
module.exports = mongoose.model("Blog", BlogSchema);
