/** @format */

'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Blogs', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
			},
			slug: {
				type: Sequelize.STRING,
			},
			thumbnail: {
				type: Sequelize.STRING,
			},
			content: {
				type: Sequelize.TEXT('long'),
			},
			userId: {
				type: Sequelize.INTEGER,
			},
			blogCategoryId: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Blogs');
	},
};
