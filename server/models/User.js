const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Empty username'],
	},
	email: {
		type: String,
		unique: [true, 'Email already registered'],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Invalid email',
		],
		required: [true, 'Empty email'],
	},
	password: {
		type: String,
		required: [true, 'Empty password'],
		minlength: [6, 'Short password'],
		select: false,
	},
});

/**
 *
 * @description Hash registered user's password
 *
 */

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
