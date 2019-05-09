const { validationResult } = require("express-validator/check");
const Post = require("../model/post");

exports.getPosts = (req, res, next) => {
	res.status(200).json({
		posts: [
			{
				_id: "1",
				title: "First Post",
				content: "This is the first post!",
				imageUrl: "images/duck.jpg",
				creator: {
					name: "Maximilian"
				},
				createdAt: new Date()
			}
		]
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
	const post = new Post({
		title: title,
		content: content,
		imageUrl: "aaaaaaa",
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
