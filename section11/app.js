const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const errorController = require("./controllers/404");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// db.execute("SELECT * FROM products")
// 	.then(result => {
// 		console.log(result);
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	User.findByPk(1)
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constrains: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
	// .sync()
	.sync({ force: true })
	.then(result => {
		// console.log(result);
		return User.findByPk(1);
	})
	.then(user => {
		if (!user) {
			return User.create({ name: "kaleido", email: "test@gmai" });
		}
		return user;
	})
	.then(user => {
		// console.log(user);
		app.listen(3000);
	})
	.catch(err => {
		console.log(err);
	});
