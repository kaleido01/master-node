const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Edit Products",
		path: "/admin/add-product",
		editing: false
	});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		res.redirect("/");
	}
	const prodId = req.params.productId;
	Product.findById(prodId, product => {
		if (!product) {
			return res.redirect("/");
		}
		res.render("admin/edit-product", {
			pageTitle: "Edit Products",
			path: "/admin/edit-product",
			editing: editMode,
			product: product
		});
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const description = req.body.description;
	const price = req.body.price;
	const product = new Product(title, imageUrl, description, price);
	product.save();
	res.redirect("/");
};
exports.postEditProduct = (req, res, next) => {};

exports.getProducts = (req, res, next) => {
	Product.fetchAll(products => {
		res.render("admin/products", {
			pageTitle: "Admin Products",
			prods: products,
			path: "/admin/products"
		});
	});
};
