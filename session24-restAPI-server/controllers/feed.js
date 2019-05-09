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
		return res.status(422).json({
			message: "Validation failed, entered datais incorrect",
			errors: errors.array()
		});
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
			console.log(err);
		});
};
