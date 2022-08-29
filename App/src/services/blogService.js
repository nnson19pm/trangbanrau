/** @format */

import db from '../models';
import { createSlug } from '../utils/slug';
import { regexSpecialCharacter } from '../utils/regex';
const getRecentBlog = async (limit = 3) => {
	try {
		const blogs = await db.Blog.findAll({
			limit,
			orderBy: [['updatedAt', 'desc']],
			nest: true,
		});

		return blogs;
	} catch (err) {
		throw new Error(err);
	}
};

const getAllBlogs = async (offset = 0) => {
	const limit = 10;

	try {
		const blogs = await db.Blog.findAndCountAll({
			offset: parseInt(offset),
			limit,
			orderBy: [['updatedAt', 'desc']],
			nest: true,
		});

		return blogs;
	} catch (err) {
		throw new Error(err);
	}
};

const getBlogBySlug = async (slug) => {
	try {
		const blog = await db.Blog.findOne({
			where: {
				slug,
			},
			include: [
				{
					model: db.User,
				},
				{
					model: db.BlogCategory,
				},
			],
		});

		if (blog) {
			return blog;
		} else {
			return null;
		}
	} catch (err) {
		throw new Error(err);
	}
};

const getRelatedBlog = async (categoryId) => {
	try {
		const blog = await db.Blog.findAll({
			where: {
				blogCategoryId: categoryId,
			},
			order: db.Sequelize.literal('rand()'),
			orderBy: [['updatedAt', 'desc']],
			limit: 3,
			nest: true,
		});

		return blog;
	} catch (err) {
		throw new Error(err);
	}
};

const updateBlog = async (req) => {
	try {
		const id = req.params.slug;
		const body = req.body;
		if(regexSpecialCharacter(req.body.title) == true){
			return {
				status: 'error',
				message: 'Tên danh mục không được chứa kí tự đặc biệt'
			}
		}

		if(!req.body) {
			return {
				status: 'error',
				message: 'Tên danh mục không được để trống',
			};
		}
		const product = await db.Blog.findOne({
			where: {
				slug: id,
			},
		});

		if (product) {
			if (!req.file) {
				const thumbnails = product?.thumbnails;

				const newProduct = await product.update({
					...body,
					slug: createSlug(body?.title),
					thumbnail: thumbnails,
				});

				return newProduct;
			} else {
				const image = '/images/' + req.file?.filename;

				const newProduct = await product.update({
					...body,
					slug: createSlug(body?.title),
					thumbnail: image,
				});
				return newProduct;
			}
		}
	} catch (error) {
		throw new Error(error);
	}
};

const deleteBlog = async (productId) => {
	try {
		// find product and update delete_flag = true
		const product = await db.Blog.destroy({
			where: {
				slug: productId,
			},
		});

		return product;
	} catch (error) {
		throw new Error(error);
	}
};

const createBlog = async (req) => {
	try {
	
		const body = req.body;
		const userId = req.session?.user.id;
		if(regexSpecialCharacter(body?.title) == true){
			return {
				status: 'error',
				message: 'Tên danh mục không được chứa kí tự đặc biệt'
			}
		}
		const thumbPath = '/images/' + req.file?.filename || '';

		const product = await db.Blog.create({
			...body,
			slug: createSlug(body?.title),
			thumbnail: thumbPath,
			// delete_flag: false,
			userId: userId
		});

		return product;
	} catch (error) {
		throw new Error(error);
	}
};

export { getRecentBlog, getAllBlogs, getBlogBySlug, getRelatedBlog, updateBlog, deleteBlog, createBlog };
