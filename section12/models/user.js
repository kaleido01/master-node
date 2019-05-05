const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
	constructor(name, email) {
		this.name = name;
		this.email = email;
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
