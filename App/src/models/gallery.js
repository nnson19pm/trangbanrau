'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        // product has a 1 to many relationship with a gallery
        Gallery.belongsTo(models.Product, {
          foreignKey: 'productId',
        });
    }
  }
  Gallery.init({
    productId: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Gallery',
  });
  return Gallery;
};

