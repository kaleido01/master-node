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
