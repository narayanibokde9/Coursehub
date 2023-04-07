const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const courses = require("../controllers/coursesController");

router.get("/", courses.allCourse);

router.get("/showcourse/:_id", courses.showCourse);

// router.get("/:_id/likesCount", courses.likeCount);

const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

router.put("/:_id/wishlist", courses.addToWishlist);

router.put("/:_id/likes", courses.likes);

module.exports = router;
