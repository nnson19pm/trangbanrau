'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Banners', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        banner_name: {
            type: Sequelize.STRING,
        },
        banner_image: {
            type: Sequelize.STRING,
        },
        banner_description: {
            type: Sequelize.STRING,
        },
        banner_status: {
            type: Sequelize.INTEGER,
        },
        banner_link: {
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
    await queryInterface.dropTable('Banners');
  }
};





