const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
	console.log("in the another");
	//自動でheaderが付加される
	res.send(
		"<form action='/product' method='POST'><input type='text'name='title' ><button type='submit'>add product</button></input></form>"
	);
});
router.post("/product", (req, res, next) => {
	console.log(req.body);
	res.redirect("/");
});

module.exports = router;
