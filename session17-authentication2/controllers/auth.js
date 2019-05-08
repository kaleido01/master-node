const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");
const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key:
				"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"
		}
	})
);

exports.getLogin = (req, res, next) => {
	let message = req.flash("error");
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		errorMessage: message
	});
};

exports.getSignup = (req, res, next) => {
	let message = req.flash("error");
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render("auth/signup", {
		path: "/signup",
		pageTitle: "Signup",
		errorMessage: message
	});
};

exports.postLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email: email })
		.then(user => {
			if (!user) {
				req.flash("error", "Invalid email or password.");
				return res.redirect("/login");
			}
			bcrypt
				.compare(password, user.password)
				.then(doMatch => {
					if (doMatch) {
						req.session.isLoggedIn = true;
						req.session.user = user;
						return req.session.save(err => {
							console.log(err);
							res.redirect("/");
						});
					}
					req.flash("error", "Invalid email or password.");
					res.redirect("/login");
				})
				.catch(err => {
					console.log(err);
					res.redirect("/login");
				});
		})
		.catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	User.findOne({ email: email })
		.then(userDoc => {
			if (userDoc) {
				req.flash(
					"error",
					"E-Mail exists already, please pick a different one."
				);
				return res.redirect("/signup");
			}
			return bcrypt
				.hash(password, 12)
				.then(hashedPassword => {
					const user = new User({
						email: email,
						password: hashedPassword,
						cart: { items: [] }
					});
					return user.save();
				})
				.then(result => {
					res.redirect("/login");
					transporter.sendMail({
						to: email,
						from: "shop@node-complet.com",
						subject: "this is firstmail",
						html: "<h1> You successfully signed up</h1>"
					});
				});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postLogout = (req, res, next) => {
	req.session.destroy(err => {
		console.log(err);
		res.redirect("/");
	});
};

exports.getReset = (req, res, next) => {
	let message = req.flash("error");
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render("auth/reset", {
		path: "/reset",
		pageTitle: "Reset Password",
		errorMessage: message
	});
};

exports.postReset = (req, res, next) => {
	crypto.randomBytes(32, (err, buffer) => {
		if (err) {
			console.log(err);
			return res.redirect("/reset");
		}
		const token = buffer.toString("hex");
		User.findOne({ email: req.body.email })
			.then(user => {
				if (!user) {
					req.flash("error", "No account with that email found");
					return res.redirect("/reset");
				}
				user.resetToken = token;
				user.resetTokenExpiration = Date.now() + 1000 * 60 * 60;
				return user.save;
			})
			.then(result => {
				res.redirect("/");
				transporter.sendMail({
					to: req.body.email,
					from: "shop@node-complet.com",
					subject: "password",
					html: `
          <p>You requested a password reset</p>
          <p>Click this <a href="http:localhost:3000/reset/${token}">Link</a>to set a new password</p>
          `
				});
			})
			.catch(err => {
				console.log(err);
			});
	});
};

exports.getNewPassword = (req, res, next) => {
	const token = req.params.token;

	User.findOne({
		resetToken: token,
		resetTokenExpiration: { $gt: Date.now() }
	}).then(user => {
		let message = req.flash("error");
		if (message.length > 0) {
			message = message[0];
		} else {
			message = null;
		}
		res
			.render("auth/new-password", {
				path: "/new-password",
				pageTitle: "Reset password",
				errorMessage: message,
				userId: user._id.toString()
			})
			.catch(err => console.log(err));
	});
};
