const products = [];

exports.getAddProduct = (req, res, next) => {
	res.render("add-product", {
		prods: products,
		pageTitle: "add products",
		path: "/",
		hasProducts: products.length > 0,
		activeShop: true,
		productCSS: true
	});
};

exports.postAddProduct = (req, res, next) => {
	products.push({ title: req.body.title });
	res.redirect("/");
};

exports.getProducts = (req, res, next) => {
	res.render("shop", {
		pageTitle: "shop",
		prods: products,
		path: "/",
		hasProducts: products.length > 0,
		activeShop: true,
		productCSS: true
	});
};
