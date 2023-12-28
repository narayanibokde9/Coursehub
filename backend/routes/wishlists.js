const express = require("express");
const router = express.Router();
const WishlistController = require("../controllers/wishlistController");

// Get wishlist by user ID
router.get("/wishlist/:_id", WishlistController.getWishlistByUserId);

// Add course to wishlist
router.post("/wishlist/add", WishlistController.addToWishlist);

// Remove course from wishlist
router.post("/wishlist/remove", WishlistController.removeFromWishlist);

module.exports = router;
