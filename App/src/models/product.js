'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // product has a 1 to many relationship with a gallery
      Product.hasMany(models.Gallery, {
        foreignKey: 'productId',
      });
      // product has a 1 to many relationship with a category
      Product.belongsTo(models.ProductCategory, {
        foreignKey: 'categoryId',
      });
      // product has a 1 to many relationship with a order detail
      Product.hasMany(models.OrderDetails, {
        foreignKey: 'productId',
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    thumbnails: DataTypes.STRING,
    quantity: DataTypes.FLOAT,
    quantity_sold: DataTypes.FLOAT,
    mass: DataTypes.INTEGER,
    delete_flag: DataTypes.BOOLEAN,
    categoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

