/** @format */

import db from '../models';

const getAllProducts = async (offset = 0) => {
	const limit = 9;

	try {
		const products = await db.Product.findAndCountAll({
			where: {
				delete_flag: false,
			},
			offset: parseInt(offset),
			limit,
			include: [
				{
					model: db.Gallery,
				},
				{
					model: db.ProductCategory,
				},
			],
			order: [['updatedAt', 'desc']],
			nest: true,
		});

		return products;
	} catch (err) {
		throw new Error(err);
	}
};

const createProduct = async (req) => {
	try {
		// const images = req.files?.map((file) => {
		//     return file.path.replace(/\\/g, '/').split('src/public')[1];
		// });

		const body = req.body;

		const isExitName = await db.Product.findOne({
			where: {
				name: body.name,
			},
		});
		
		if(isExitName) {
			return {
				status: 'error',
				message: 'Tên sản phẩm đã tồn tại',
			}
		}else{
			const thumbPath = '/images/' + req.file?.filename || '';

			const product = await db.Product.create({
				...body,
				thumbnails: thumbPath,
				delete_flag: false,
			});
			return {
				status: 'success',
				message: 'Thêm sản phẩm thành công',
			}
		}

		

		// let gallery;

		// if (images) {
		// 	gallery = await db.Gallery.bulkCreate(
		// 		images.slice(1).map((image) => {
		// 			return {
		// 				productId: product.id,
		// 				image: image,
		// 			};
		// 		})
		// 	);
		// } else {
		// 	gallery = '';
		// }


	} catch (error) {
		throw new Error(error);
	}
};

const updateProduct = async (req) => {
	try {
		const id = req.params.id;
		const body = req.body;

		const product = await db.Product.findOne({
			where: {
				id: id,
			},
		});

		if (product) {
			if (!req.file) {
				const thumbnails = product?.thumbnails;

				const newProduct = await product.update({
					...body,
					thumbnails,
				});

				return newProduct;
			} else {
				const image = '/images/' + req.file?.filename;

				const newProduct = await product.update({
					...body,
					thumbnails: image,
				});
				return newProduct;
			}
		}
	} catch (error) {
		throw new Error(error);
	}
};

const deleteProduct = async (productId) => {
	try {
		// find product and update delete_flag = true
		const product = await db.Product.findOne({
			where: {
				id: productId,
			},
		});
		if(product) {
			const newProduct = await product.update({
				delete_flag: true,
			});
			return newProduct;
		}
		return null;
	} catch (error) {
		throw new Error(error);
	}
};

const getProduct = async (id) => {
	try {
		const product = await db.Product.findOne({
			where: {
				delete_flag: false,
				id,
			},
			include: [
				{
					model: db.Gallery,
				},
				{
					model: db.ProductCategory,
				},
			],
			nest: true,
		});

		if (product) {
			return product;
		} else {
			return null;
		}
	} catch (err) {
		throw new Error(err);
	}
};

const getDiscountProduct = async (count = 6) => {
	try {
		const products = await db.Product.findAll({
			where: {
				delete_flag: false,
				// discount >=1
				discount: {
					[db.Sequelize.Op.gt]: 0,
				},
				// quantity > 0
				quantity: {
					[db.Sequelize.Op.gt]: 0,
				},
			},
			order: [['discount', 'desc']],
			limit: count,
			include: [
				{
					model: db.Gallery,
				},
				{
					model: db.ProductCategory,
				},
			],
			nest: true,
		});
		return products;
	} catch (err) {
		throw new Error(err);
	}
};

const getLatestProduct_viewHome = async (limit = 12) => {
	try {
		const products = await db.Product.findAll({
			where: {
				delete_flag: false,
			},
			limit: limit,
			orderBy: [['updatedAt', 'desc']],
			nest: true,
		});
		return products;
	} catch (err) {
		throw new Error(err);
	}
};

const getLatestProduct = async () => {
	try {
		const products = await db.Product.findAll({
			where: {
				delete_flag: false,
			},
			limit: 9,
			orderBy: [['updatedAt', 'desc']],
			nest: true,
		});

		let sProduct = [];

		const chunkSize = 3;
		for (let i = 0; i < products.length; i += chunkSize) {
			const chunk = products.slice(i, i + chunkSize);
			sProduct.push(chunk);
		}

		return sProduct;
	} catch (err) {
		throw new Error(err);
	}
};

const getRelatedProduct = async (categoryId) => {
	try {
		const products = await db.Product.findAll({
			where: {
				delete_flag: false,
				categoryId,
			},
			order: db.Sequelize.literal('rand()'),
			limit: 4,
			orderBy: [['updatedAt', 'desc']],
			nest: true,
		});

		return products;
	} catch (err) {
		throw new Error(err);
	}
};

const getProductByKeyword = async (keyword, page) => {
	try {
		const limit = 3;
		const offset = (page - 1) * limit ;
		const products = await db.Product.findAndCountAll({
			where: {
				delete_flag: false,
				name: {
					[db.Sequelize.Op.like]: `%${keyword}%`,
				},
			},
			order: db.Sequelize.literal('rand()'),
			order: [['updatedAt', 'desc']],
			limit: limit,
			offset: offset,
			nest: true,
		});

		if (products) {
			return products;
		}
		return null;
	} catch (err) {
		throw new Error(err);
	}
};

const getAllProductDeleted = async (offset = 0) => {
	const limit = 9;

	try {
		const products = await db.Product.findAndCountAll({
			where: {
				delete_flag: true,
			},
			offset: parseInt(offset),
			limit,
			order: [['updatedAt', 'desc']],
		});

		return products;
	} catch (err) {
		throw new Error(err);
	}
};

const restoreProduct = async (productId) => {
	try {
		const product = await db.Product.findOne({
			where: {
				id: productId,
			},
		});
		if (product) {
			const newProduct = await product.update({
				delete_flag: false,
			});
			return newProduct;
		}
		return null;
	} catch (error) {
		throw new Error(error);
	}
};


export { getAllProducts, createProduct, updateProduct, deleteProduct, getDiscountProduct, getLatestProduct, getProduct, getRelatedProduct, getLatestProduct_viewHome, getProductByKeyword, getAllProductDeleted, restoreProduct };
