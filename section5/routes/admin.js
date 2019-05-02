const express = require("express");
const path = require("path");
const router = express.Router();
const rootDir = require("../util/path");

// /admin/add-product =>get
router.get("/add-product", (req, res, next) => {
	console.log("in the another");
	//自動でheaderが付加される
	res.sendFile(path.join(rootDir, "views", "add-product.html"));
});
// /admin/add-product =>post

router.post("/add-product", (req, res, next) => {
	console.log(req.body);
	res.redirect("/");
});

module.exports = router;
