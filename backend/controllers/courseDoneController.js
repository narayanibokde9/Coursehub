// courseDoneController.js

const CourseDone = require("../models/coursedone");

// Controller functions

// Create a new course done entry
const markCourseAsDone = async (req, res) => {
	try {
		const { userId, courseId } = req.body; // Assuming userId and courseId are sent in the request body
		const courseDone = new CourseDone({
			user: userId,
			course: courseId,
			// Other fields if needed like completionDate (you can set it if it's not the default value)
		});
        console.log(userId, courseId, courseDone)
		await courseDone.save();
		res.status(201).json({ message: "Course marked as done successfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get all completed courses for a user
const getCompletedCoursesForUser = async (req, res) => {
	try {
		const userId = req.params.userId; // Assuming userId is part of the URL params
		const completedCourses = await CourseDone.find({ user: userId }).populate(
			"course"
		);
        console.log("done course", completedCourses)
		res.status(200).json(completedCourses);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Other controller functions as needed (update, delete, etc.)

module.exports = {
	markCourseAsDone,
	getCompletedCoursesForUser,
	// Export other controller functions
};
