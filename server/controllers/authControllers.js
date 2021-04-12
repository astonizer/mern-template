const User = require('../models/User');

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @description Register new user in database
 *
 */

const register_post = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const user = await User.create({ username, email, password });

		res.status(201).json({
			success: true,
			user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @description Login user
 */

const login_post = (req, res) => {
	console.log();
};

module.exports = {
	register_post,
	login_post,
};
