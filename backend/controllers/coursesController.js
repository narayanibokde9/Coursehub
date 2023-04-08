const Course = require("../models/course");
const User = require("../models/user");

module.exports.allCourse = (req, res) => {
	Course.find({})
		.sort({ likes_count: -1 })
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
	const courseId = req.body._id;
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

module.exports.getWishlist = async (req, res) => {
	// const user = await User.findById(req.user._id);
	const user = await User.findById(req.user._id).populate("wishlist");
	if (!user) throw new Error("User not found");
	console.log(user.wishlist);
	return user.wishlist;
};

const Comment = require("../models/comment");

module.exports.createComment = (req, res, next) => {
	const comment = new Comment({
		body: req.body.body,
		// rating: req.body.rating,
		author: req.user._id, // assuming you have the author's ID in the request body
	});
	comment
		.save()
		.then((commentResult) => {
			Course.findByIdAndUpdate(
				req.params.courseId, // assuming you have the course ID in the request parameters
				{ $push: { comment: commentResult._id }, $inc: { comments_count: 1 } },
				{ new: true }
			)
				.populate("comment") // optional: to include the comment details in the response
				.exec()
				.then((courseResult) => {
					res.status(200).json({
						message: "Comment added to course successfully",
						course: courseResult,
					});
				})
				.catch((error) => {
					res.status(500).json({
						error: error,
					});
				});
		})
		.catch((error) => {
			res.status(500).json({
				error: error,
			});
		});
};

exports.getAllCommentsForCourse = (req, res, next) => {
	Course.findById(req.params._id) // assuming you have the course ID in the request parameters
		.populate({
			path: "comment",
			select: "body",
			populate: {
				path: "author",
				select: "username",
			},
		})
		.exec()
		.then((courseResult) => {
			if (!courseResult) {
				return res.status(404).json({
					message: "Course not found",
				});
			}
			res.status(200).json({
				comments: courseResult.comment,
			});
		})
		.catch((error) => {
			res.status(500).json({
				error: error,
			});
		});
};
