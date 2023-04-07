const Course = require("../models/course");
const User = require("../models/user");

module.exports.allCourse = (req, res) => {
	Course.find({})
		.then((items) => res.json(items))
		.catch((e) => console.log(e));
};

module.exports.showCourse = (req, res) => {
	const { _id } = req.params;
	console.log(_id);
	Course.findById(_id)
		.then((items) => res.json(items))
		.catch((e) => console.log(e));
};

module.exports.likes = async (req, res) => {
	// const {_id } = req.params;
	const courseId = req.body._id;
	const userId = req.user._id;

	const course = await Course.findById(courseId);
	if (course.course_likes.includes(userId)) {
		console.log("error", "Cannot like more than once!");
	} else {
		await Course.findByIdAndUpdate(courseId, {
			$push: { course_likes: userId },
			$inc: { likes_count: 1 },
		});
		console.log("success", "Liked!");
	}
	// res.redirect(`/courses/${courseId}`);
};

module.exports.addToWishlist = async (req, res) => {
	const courseId = req.params.id;
	const user = await User.findById(req.user._id);

	if (user.wishlist.includes(courseId)) {
		console.log("error", "Course already in wishlist");
	} else {
		await User.findByIdAndUpdate(req.user._id, {
			$push: { wishlist: courseId },
		});
		console.log("success", "Course added to wishlist");
	}
};
