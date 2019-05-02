const http = require("http");

const express = require("express");

const app = express();

app.use((req, res, next) => {
	console.log("in the middleware");
	next(); //次のミドルウェアへ進むことを可能にする
});
app.use((req, res, next) => {
	console.log("in the another middleware");
});

const server = http.createServer(app);

server.listen(3000);
