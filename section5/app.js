const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
	console.log("always");
	//自動でheaderが付加される
	next();
});

app.use("/add-product", (req, res, next) => {
	console.log("in the another");
	//自動でheaderが付加される
	res.send(
		"<form action='/product' method='POST'><input type='text'name='title' ><button type='submit'>add product</button></input></form>"
	);
});
app.use("/product", (req, res, next) => {
	console.log(req.body);
	res.redirect("/");
});

app.use("/", (req, res, next) => {
	console.log("in the another middleware");
	//自動でheaderが付加される
	res.send("<h1>hhhhhhhhaaaaaaaaiiiii</h1>");
});

app.listen(3000);
