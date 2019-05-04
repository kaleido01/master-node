const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define({
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: Sequelize.STRING,
	email: Sequelize.DOUBLE
});

module.exports = User;
