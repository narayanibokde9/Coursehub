// Wishlist model import
const Wishlist = require("../models/wishlist");

// Controller functions

// Get wishlist by user ID
const getWishlistByUserId = async (req, res) => {
	const _id = req.params._id; 
	try {
		const wishlist = await Wishlist.findOne({ user: _id }).populate("courses");
		if (!wishlist) {
			console.log("Wishlist not found for user ID:", _id);
			return res.status(404).json({ error: "Wishlist not found" });
		}
		console.log("Retrieved wishlist:", wishlist);
		res.status(200).json(wishlist);
	} catch (error) {
		console.error("Error retrieving wishlist:", error);
		res.status(500).json({ error: "Could not retrieve wishlist" });
	}
};

// Add course to wishlist
const addToWishlist = async (req, res) => {
	const { userId, courseId } = req.body; 
	try {
		let wishlist = await Wishlist.findOne({ user: userId });

		if (!wishlist) {
			wishlist = new Wishlist({ user: userId, courses: [] });
		}

		wishlist.courses.push(courseId);
		await wishlist.save();
        console.log(wishlist)
		res.status(201).json({ message: "Course added to wishlist" });
	} catch (error) {
		res.status(500).json({ error: "Could not add course to wishlist" });
	}
};

// Remove course from wishlist
const removeFromWishlist = async (req, res) => {
	const { userId, courseId } = req.body; // Assuming you'll pass userId and courseId in the request body
	try {
		const wishlist = await Wishlist.findOne({ user: userId });

		if (!wishlist) {
			return res.status(404).json({ message: "Wishlist not found" });
		}

		wishlist.courses = wishlist.courses.filter(
			(course) => course.toString() !== courseId
		);
		await wishlist.save();

		res.status(200).json({ message: "Course removed from wishlist" });
	} catch (error) {
		res.status(500).json({ error: "Could not remove course from wishlist" });
	}
};

module.exports = {
	getWishlistByUserId,
	addToWishlist,
	removeFromWishlist,
};
