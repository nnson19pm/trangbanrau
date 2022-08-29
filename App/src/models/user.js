/** @format */

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.Order, {
				foreignKey: 'userId',
			});

			User.hasMany(models.Blog, {
				foreignKey: 'userId',
			});
		}
	}

	User.init(
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			email: DataTypes.STRING,
			full_name: DataTypes.STRING,
			phone_number: DataTypes.STRING,
			address: DataTypes.STRING,
			gender: DataTypes.BOOLEAN,
			roleId: DataTypes.STRING,
			delete_flag: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
    
	return User;
};
