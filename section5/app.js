const express = require("express");

const app = express();

app.use((req, res, next) => {
	console.log("in the middleware");
	next(); //次のミドルウェアへ進むことを可能にする
});
app.use((req, res, next) => {
	console.log("in the another middleware");

	//自動でheaderが付加される
	res.send("<h1>hhhhhhhhaaaaaaaaiiiii</h1>");
});

app.listen(3000);
