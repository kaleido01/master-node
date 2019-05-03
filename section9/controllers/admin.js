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
	const product = new Product(null, title, imageUrl, description, price);
	product.save();
	res.redirect("/");
};
exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedImageUrl = req.body.imageUrl;
	const updatedDescription = req.body.description;
	const updatedPrice = req.body.price;
	const updatedProduct = new Product(
		prodId,
		updatedTitle,
		updatedImageUrl,
		updatedDescription,
		updatedPrice
	);
	console.log(updatedProduct);
	updatedProduct.save();
	res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId, deleteProduct => {
		if (!product) {
			return res.redirect("/");
		}
	});
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll(products => {
		res.render("admin/products", {
			pageTitle: "Admin Products",
			prods: products,
			path: "/admin/products"
		});
	});
};
