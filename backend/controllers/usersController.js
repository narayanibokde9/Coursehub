const User = require("../models/user");
// const FavoritesCart = require("../models/favoritesCart");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
	return jwt.sign({ _id }, "sjfkajdlk", { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
	const {username, email, password } = req.body;

	try {
		const user = await User.login(username, email, password);

		// create a token
		const token = createToken(user._id);

		res.status(200).json({ username, email, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//signup user
const signupUser = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const user = await User.signup(username, email, password);

		// create a token
		const token = createToken(user._id);
		// const newFavorite = await FavoritesCart.create({ _id: user._id });

		res.status(200).json({ username, email, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { signupUser, loginUser };
