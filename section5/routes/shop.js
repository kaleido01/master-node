const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
	console.log("in the another middleware");
	//自動でheaderが付加される
	res.send("<h1>hhhhhhhhaaaaaaaaiiiii</h1>");
});

module.exports = router;
