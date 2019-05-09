const { validationResult } = require("express-validator/check");

exports.signup = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty) {
		const error = new error("Validation failed");
		(error.statusCode = 422), (error.data = errors.array());
		throw error;
	}

	const emails = req.body.email;
	const name = req.body.name;
	const password = req.body.password;
};
