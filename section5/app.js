const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
	console.log("always");
	//自動でheaderが付加される
	next();
});

app.use("/add-product", (req, res, next) => {
	console.log("in the another");
	//自動でheaderが付加される
	res.send("<h1>the add product</h1>");
});
app.use("/", (req, res, next) => {
	console.log("in the another middleware");
	//自動でheaderが付加される
	res.send("<h1>hhhhhhhhaaaaaaaaiiiii</h1>");
});

app.listen(3000);
