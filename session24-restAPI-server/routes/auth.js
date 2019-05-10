const express = require("express");
const { body } = require("express-validator/check");
const authController = require("../controllers/auth");

router = express.Router();

router.put(
	"/signup",
	[
		body("email")
			.isEmail()
			.withMessage("Please enter a valid email")
			.custom((val, { req }) => {
				return User.findOne({ email: value }).then(userDoc => {
					if (userDoc) {
						return Promise.reject("Email address alreadey exists");
					}
				});
			})
			.normalizeEmail(),
		body("password")
			.trim()
			.isLength({ min: 5 }),
		body("name")
			.trim()
			.not()
			.isEmpty()
	],
	authController.signup
);

router.post("/login", authController.login);

module.exports = router;
