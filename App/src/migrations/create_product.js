'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.FLOAT,
        },
        discount: {
            type: Sequelize.FLOAT,
        },
        thumbnails: {
            type: Sequelize.STRING,
        },
        quantity: {
            type: Sequelize.FLOAT,
        },
        quantity_sold: {
            type: Sequelize.FLOAT,
        },
        mass: {
            type: Sequelize.INTEGER,
        },
        delete_flag: {
            type: Sequelize.BOOLEAN,
        },
        categoryId: {
            type: Sequelize.STRING,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE 
        }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};





