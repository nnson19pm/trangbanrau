/** @format */

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ProductCategory extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// ProductCategory has a 1 to many relationship with a product
			ProductCategory.hasMany(models.Product, {
				foreignKey: 'categoryId',
			});
		}
	}
	ProductCategory.init(
		{
			name: DataTypes.STRING,
			slug: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'ProductCategory',
		}
	);
	return ProductCategory;
};
