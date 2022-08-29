'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       
    }
  }
  Banner.init({
    banner_name: DataTypes.STRING,
    banner_image: DataTypes.STRING,
    banner_description: DataTypes.STRING,
    banner_status: DataTypes.INTEGER,
    banner_link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};

