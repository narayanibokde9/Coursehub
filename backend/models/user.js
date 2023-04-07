const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");
// const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	wishlist: [
		{
			type: Schema.Types.ObjectId,
			ref: "Course",
		},
	],
});

// // set the type attribute to "admin" if email ends with "@admin.com"
// UserSchema.pre('save', function(next) {
//   if (this.email.endsWith('@admin.com')) {
//     this.type = 'admin';
//   }
//   next();
// });

// static signup method
UserSchema.statics.signup = async function (username, email, password) {
	//validation
	if (!email || !password || !username) {
		throw Error("All fields must be filled");
	}
	if (!validator.isEmail(email)) {
		throw Error("Email not valid");
	}
	// if(!validator.isStrongPassword(password)){
	//     throw Error('Password not strong enough')
	// }

	const exists = await this.findOne({ email });
	if (exists) {
		throw Error("Email already in use");
	}
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	// if(email.endsWith("@admin.com")){
	// 	type = admin;
	// }

	const user = await this.create({ username, email, password: hash });

	return user;
};

//static login method
UserSchema.statics.login = async function (username, email, password) {
	if (!email || !password || !username) {
		throw Error("All fields must be filled");
	}

	const user = await this.findOne({ email });

	if (!user) {
		throw Error("Email incorrect");
	}

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw Error("Incorrect password");
	}

	return user;
};

// //for admin
// UserSchema.virtual("isAdmin").get(function () {
// 	return this.email.endsWith("@admin.com");
// });


//UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
