const express = require("express");
const router = express.Router();
const courses = require("../controllers/coursesController");
const catchAsync = require("../utilities/catchAsync");

router.get("/", courses.allCourse);

router.get("/showcourse/:_id", courses.showCourse);

router.get("/showcomments/:_id", courses.getAllCommentsForCourse);

// router.get("/:_id/likesCount", courses.likeCount);

const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

router.post("/comments/:_id/reviews", (courses.createComment));

router.get("/wishlist", courses.getWishlist);

router.put("/:_id/wishlist", courses.addToWishlist);

router.put("/:_id/likes", courses.likes);


module.exports = router;
