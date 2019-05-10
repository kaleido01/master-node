const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

exports.signup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty) {
		const error = new error("Validation failed");
		(error.statusCode = 422), (error.data = errors.array());
		throw error;
	}

	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password;

	try {
		const hashedPassword = await bcrypt.hash(password, 12);
		const user = new User({
			email,
			name,
			password: hashedPassword
		});
		await user.save();
		res.status(201).json({ message: "User created", userId: result._id });
	} catch (error) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.login = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const user = await User.findOne({ email: email });

		if (!user) {
			const error = new Error("A user this email could not be found");
			error.statusCode = 401;
			throw error;
		}
		const isEqual = await bcrypt.compare(password, user.password);
		if (!isEqual) {
			const error = new Error("Wrong password");
			error.statusCode = 401;
			throw error;
		}
		const token = jwt.sign(
			{
				email: user.email,
				userId: user._id.toString()
			},
			"secretKey",
			{ expiresIn: "1h" }
		);
		res.status(200).json({ token, userId: loadedUser._id.toString() });
	} catch (error) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.getUserStatus = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId);
		if (!user) {
			const error = new Error("user not found");
			error.statusCode = 401;
			throw error;
		}
		res.status(200).json({
			message: "get user status",
			status: user.status
		});
	} catch (error) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
exports.updateUserStatus = async (req, res, next) => {
	const newStatus = req.body.status;
	try {
		const user = await User.findById(req.userId);
		if (!user) {
			const error = new Error("user not found");
			error.statusCode = 401;
			throw error;
		}
		user.status = newStatus;
		await user.save();
		res.status(200).json({
			message: "status updated"
		});
	} catch (error) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
