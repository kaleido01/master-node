const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");

const app = express();

MONGODB_URI =
	"mongodb+srv://kaleido:kaleido@cluster0-y0a8x.mongodb.net/message?retryWrites=true";

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"OPTIONS, GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

app.use("/feed", feedRoutes);

app.unsubscribe((error, req, res, next) => {
	console.log(error);
	const status = erorr.status || 500;
	const message = error.message;
	res.status(status).json({ message });
});

mongoose
	.connect(MONGODB_URI)
	.then(result => {
		app.listen(8080);
	})
	.catch(err => {
		console.log(err);
	});
