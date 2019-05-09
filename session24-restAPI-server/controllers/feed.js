const { validationResult } = require("express-validator/check");
const Post = require("../model/post");

exports.getPosts = (req, res, next) => {
	Post.find()
		.then(posts => {
			res.status(200).json({
				message: "Fetched Posts success",
				posts
			});
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.createPost = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = new Error("Validation failed, entered datais incorrect");
		error.statusCode = 422;
		throw error;
	}

	const title = req.body.title;
	const content = req.body.content;
	const imageUrl = req.body.imageUrl;
	const post = new Post({
		title: title,
		content: content,
		imageUrl: "images/nezumi.jpg",
		creator: { name: "Maximilian" }
	});

	post
		.save()
		.then(post => {
			res.status(201).json({
				message: "Post created successfully!",
				post
			});
		})

		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.getPost = (req, res, next) => {
	const postId = req.params.postId;
	console.log(postId);
	Post.findById(postId)
		.then(post => {
			if (!post) {
				const error = new Error("Could not find post");
				error.statusCode = 404;
				throw error;
			}
			res.status(200).json({ message: "Post fetched", post });
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};
