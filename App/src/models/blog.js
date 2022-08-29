'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Blog.belongsTo(models.BlogCategory, {
        foreignKey: 'blogCategoryId'
      });
    }
  }
  Blog.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    content: DataTypes.TEXT('long'),
    thumbnail: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    blogCategoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};

