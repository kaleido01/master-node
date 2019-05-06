const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

class User {
	constructor(name, email, cart, id) {
		this.name = name;
		this.email = email;
		this.cart = cart ? cart : (cart = { items: [] }); // {items:[]}
		this._id = id;
	}

	save() {
		const db = getDb();

		return db
			.collection("users")
			.insertOne(this)
			.then(result => {
				console.log(result);
			})
			.catch(err => {
				console.log(err);
			});
	}

	addToCart(product) {
		const cartProductIndex = this.cart.items.findIndex(cp => {
			return cp.productId.toString() === product._id.toString();
		});

		let newQuantity = 1;
		let updatedCartItems = [...this.cart.items];

		if (cartProductIndex !== -1) {
			//既にその商品はかごの中なので量を一つ増やす
			newQuantity = this.cart.items[cartProductIndex].quantity + 1;
			updatedCartItems[cartProductIndex].quantity = newQuantity;
		} else {
			updatedCartItems.push({
				productId: new ObjectId(product._id),
				quantity: newQuantity
			});
		}
		const updatedCart = {
			items: updatedCartItems
		};
		const db = getDb();
		return db
			.collection("users")
			.updateOne(
				{ _id: new ObjectId(this._id) },
				{ $set: { cart: updatedCart } }
			);
	}

	getCart() {
		const db = getDb();
		const productIds = this.cart.items.map(item => {
			return item.productId;
		});

		return db
			.collection("products")
			.find({ _id: { $in: productIds } })
			.toArray()
			.then(products => {
				return products.map(product => {
					return {
						...product,
						quantity: this.cart.items.find(item => {
							return item.productId.toString() === product._id.toString();
						}).quantity
					};
				});
			});
	}

	static fetchAll() {
		const db = getDb();
		return db
			.collection("products")
			.find()
			.toArray()
			.then(products => {
				console.log(products);
				return products;
			})
			.catch(err => {
				console.log(err);
			});
	}

	static findById(prodId) {
		const db = getDb();
		return db
			.collection("users")
			.find({ _id: new ObjectId(prodId) })
			.next();
	}
}

module.exports = User;
