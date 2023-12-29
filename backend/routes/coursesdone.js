// Assuming you have an Express app
const express = require("express");
const router = express.Router();
const courseDoneController = require("../controllers/courseDoneController");

// Route to mark a course as done
router.post("/markAsDone", courseDoneController.markCourseAsDone);

// Route to get completed courses for a user
router.get(
	"/completedCourses/:userId",
	courseDoneController.getCompletedCoursesForUser
);

// Other routes as needed

module.exports = router;
