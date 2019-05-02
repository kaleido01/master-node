const express = require("express");

const router = express.Router();

// /admin/add-product =>get
router.get("/add-product", (req, res, next) => {
	console.log("in the another");
	//自動でheaderが付加される
	res.send(
		"<form action='/admin/product' method='POST'><input type='text'name='title' ><button type='submit'>add product</button></input></form>"
	);
});
// /admin/add-product =>post

router.post("/add-product", (req, res, next) => {
	console.log(req.body);
	res.redirect("/");
});

module.exports = router;
