const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
	constructor(name, email, cart, id) {
		this.name = name;
		this.email = email;
		this.cart = cart; // {items:[]}
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
		const updatedCart = { items: [{ ...product, quantity: 1 }] };
		const db = getDb();
		return db
			.collection("users")
			.updateOne({ _id: new ObjectId(this._id) }, $set({ cart: updatedCart }));
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
			.find({ _id: new mongodb.ObjectId(prodId) })
			.next();
	}
}

module.exports = User;
