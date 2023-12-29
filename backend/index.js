const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");

//import routes
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");
const blogRoutes = require("./routes/blogs");
const wishlistRoutes = require("./routes/wishlists");
const commentRoutes = require("./routes/comments");
const coursesDoneRoutes = require("./routes/coursesdone");
// const commentRoutes = require("./routes/comments");

// const favoriteRoutes = require("./routes/favorites");
// const productRoutes = require("./routes/products");

//middleware
const app = express();

// app.use(
// 	cors({
// 		origin: "http://localhost:3000",
// 		optionsSuccessStatus: 200,
// 	})
// );

app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

//models

//routes
app.use("/website/user", userRoutes);
// app.use("/courses/:id/reviews", commentRoutes);
app.use("/courses", courseRoutes);
app.use("/admin", blogRoutes);
app.use("/user", wishlistRoutes);
app.use("/user", commentRoutes);
app.use("/user", coursesDoneRoutes);

// app.use("/products", productRoutes);
// app.use("/user", favoriteRoutes);

//server connect with db
mongoose
	.connect(
		"mongodb+srv://womenshack:womenshack@cluster0.tqatzct.mongodb.net/test",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => {
		console.log("CONNECTION FOR MONGODB OPEN!!!");
	})
	.catch((err) => {
		console.log("OH NO ERROR FOR MONGODB!!!!");
		console.log(err);
	});

app.listen(4000, () => {
	console.log("Listening to port 4000");
});
