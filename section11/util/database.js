const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "desudora", {
	dialect: "mysql",
	host: "localhost"
});
module.exports = sequelize;
