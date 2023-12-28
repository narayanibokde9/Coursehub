const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Routes for managing comments
router.post("/courses/:courseId/comments", commentController.addComment); // Add a comment to a course by course ID
router.get(
	"/courses/:courseId/comments",
	commentController.getCommentsByCourseId
); // Get all comments for a specific course by course ID
router.get("/comments/:commentId", commentController.getCommentById); // Get a comment by its ID
router.delete("/comments/:commentId", commentController.deleteCommentById); // Delete a comment by its ID

module.exports = router;
