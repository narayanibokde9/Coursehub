const Blog = require("../models/blog");

module.exports.allBlogs = (req, res) => {
	Blog.find({})
		.then((items) => res.json(items))
		.catch((e) => console.log(e));
};

module.exports.showBlog = (req, res) => {
	const { _id } = req.params;
	Blog.findById(_id)
		.then((items) => res.json(items))
		.catch((e) => console.log(e));
};

module.exports.postBlog = (req, res) => {
	const newBlog = new Blog(req.body);

	newBlog
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send("Internal Server Error");
		});
};

module.exports.deleteBlog = async (req, res) => {
	const { _id } = req.params;
    console.log(_id);
	try {
		const deletedDocument = await Blog.findByIdAndDelete(_id);
		if (!deletedDocument) {
			return res.status(404).send("Document not found");
		}
		return res.status(200).send("Document deleted successfully");
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server error");
	}
};
