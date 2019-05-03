const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const adminData = require("./admin");

router.get("/", (req, res, next) => {
	products = adminData.products;
	res.render("shop", {
		pageTitle: "shop",
		prods: products,
		path: "/",
		hasProducts: products.length > 0,
		activeShop: true,
		productCSS: true
	});
});

module.exports = router;
