const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		editing: false
	});
};

exports.postAddProduct = (req, res, next) => {
	const { title, price, description, imageUrl } = req.body;
	const { _id } = req.user;
	const product = new Product({
		title,
		price,
		description,
		imageUrl,
		userId: _id
	});
	product
		.save()
		.then(result => {
			// console.log(result);
			console.log("Created Product");
			res.redirect("/admin/products");
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/");
	}
	const prodId = req.params.productId;
	Product.findById(prodId)
		// Product.findById(prodId)
		.then(product => {
			if (!product) {
				return res.redirect("/");
			}
			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				path: "/admin/edit-product",
				editing: editMode,
				product: product
			});
		})
		.catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
	const { productId, title, price, imageUrl, description } = req.body;

	const updatedProduct = {
		title,
		price,
		imageUrl,
		description
	};

	// const prodId = req.body.productId;
	// const updatedTitle = req.body.title;
	// const updatedPrice = req.body.price;
	// const updatedImageUrl = req.body.imageUrl;
	// const updatedDesc = req.body.description;

	// const updatedProduct = {
	// 	title: updatedTitle,
	// 	price: updatedPrice,
	// 	imageUrl: updatedImageUrl,
	// 	description: updatedDesc
	// };

	Product.findByIdAndUpdate(productId, updatedProduct)
		.then(result => {
			console.log("UPDATED PRODUCT!");
			res.redirect("/admin/products");
		})
		.catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
	Product.find()
		// .select("title price -_id")
		// .populate("userId", "name")
		.then(products => {
			console.log(products);
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin/products"
			});
		})
		.catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
	const { productId } = req.body;
	Product.findByIdAndRemove(productId)
		.then(() => {
			console.log("DESTROYED PRODUCT");
			res.redirect("/admin/products");
		})
		.catch(err => console.log(err));
};
