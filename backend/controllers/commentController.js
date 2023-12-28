const Comment = require("../models/comment");

// Add a comment to a course by course ID
const addComment = async (req, res) => {
	try {
		const { userId, text } = req.body;
		const courseId = req.params.courseId;

		if (!userId) {
			return res.status(400).json({ error: "User ID is required" });
		}

		const newComment = new Comment({
			user: userId,
			course: courseId,
			text: text,
			postedAt:Date.now(),
		});

		await newComment.save();
        console.log("post", newComment)
		res
			.status(201)
			.json({ message: "Comment added successfully!", comment: newComment });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get all comments for a specific course by course ID
const getCommentsByCourseId = async (req, res) => {
	try {
		const courseId = req.params.courseId;
		const comments = await Comment.find({ course: courseId })
			.populate("user")
			.sort({ createdAt: -1 }); // Sorting by createdAt field in descending order

		console.log("get", comments);
		res.json({ comments });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};


// Get a comment by its ID
const getCommentById = async (req, res) => {
	try {
		const commentId = req.params.commentId;
		const comment = await Comment.findById(commentId).populate("user");

		if (!comment) {
			return res.status(404).json({ message: "Comment not found" });
		}

		res.json({ comment });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Delete a comment by its ID
const deleteCommentById = async (req, res) => {
	try {
		const commentId = req.params.commentId;
		const deletedComment = await Comment.findByIdAndDelete(commentId);

		if (!deletedComment) {
			return res.status(404).json({ message: "Comment not found" });
		}

		res.json({ message: "Comment deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	addComment,
	getCommentsByCourseId,
	getCommentById,
	deleteCommentById,
};
