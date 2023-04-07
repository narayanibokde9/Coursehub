const express = require("express");
const {
	allBlogs,
    postBlog,
    showBlog,
    deleteBlog
} = require("../controllers/blogsController");

const router = express.Router();

router.get("/blogs", allBlogs);

router.post("/blogs", postBlog);

router.get("/blogs/:_id", showBlog);

router.delete("/blogs/:_id", deleteBlog)

// router.get("/showPhone/:_id", show_product_by_id);

// router.get("/search", search_page);

// router.get("/filter", filter_page);

// router.get("/brands", brand_list);

// router.get("/storage", storage_list);
module.exports = router;
