const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");

const app = express();

MONGODB_URI =
	"mongodb+srv://kaleido:kaleido@cluster0-y0a8x.mongodb.net/message?retryWrites=true";

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

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

mongoose
	.connect(MONGODB_URI)
	.then(result => {
		app.listen(3000);
	})
	.catch(err => {
		console.log(err);
	});

app.listen(8080);
