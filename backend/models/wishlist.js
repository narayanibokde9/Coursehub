const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
});

module.exports = mongoose.model("Wishlist", WishlistSchema);
