/** @format */

import db from '../models';
import slugify from 'slugify';
import { createSlug } from '../utils/slug';
import { regexSpecialCharacter } from '../utils/regex';


const getAllBlogCategory = async () => {
	try {
		const cates = await db.BlogCategory.findAll();

		return cates;
	} catch (err) {
		throw new Error(err);
	}
};

const getAllBlogCategoryWithCount = async (offset = 0) => {
	const limit = 10;

	try {
		const blogs = await db.BlogCategory.findAndCountAll({
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

const getCategoryBySlug = async (slug, offset) => {
	try {
		const cates = await db.BlogCategory.findOne({
			where: {
				slug,
			},
			include: [
				{
					model: db.Blog,
					limit: 8,
					offset,
				},
			],
		});

		if (cates) {
			return cates;
		} else {
			return null;
		}
	} catch (err) {
		throw new Error(err);
	}
};

const createCategoryBlog = async (req) => {
	try {
		const body = req.body;
		const name = body.name;
		
		if(regexSpecialCharacter(name) == true){
			return {
				status: 'error',
				message: 'Tên danh mục không được chứa kí tự đặc biệt'
			}
		}

		if(!name) {
			return {
				status: 'error',
				message: 'Tên danh mục không được để trống',
			};
		}

		const slug  = createSlug(name);
		const titleIsExist = await db.BlogCategory.findOne({
			where: {
				name,
				slug
			},
		});
	
		if (titleIsExist) {
			return {
				status: 'error',
				message: `Tên danh mục [ ${name} ] có slug [${slug}] đã tồn tại`,
			};
		}
		else{
			await db.BlogCategory.create({	
				name: body.name,
				slug
			});
			return {
				status: 'success',
				message: `Tạo danh mục [ ${name} ] thành công`,
			};
		}
		
	} catch (error) {
		throw new Error(error);
	}
};

const updateCategoryBlog = async (req) => {
	try {
		const slug = req.params.slug;
		const name = req.body.name;

		if(regexSpecialCharacter(name) == true){
			return {
				status: 'error',
				message: 'Tên danh mục không được chứa kí tự đặc biệt'
			}
		}

		if(!name) {
			return {
				status: 'error',
				message: 'Tên danh mục không được để trống',
			};
		}

		// Find data by slug in database
		const blogCategory = await db.BlogCategory.findOne({
			where: {
				slug: slug
			},
		});

		if (blogCategory) {

			const newSlug = createSlug(name);
			// check if new slug is exist in database
			const slugIsExist = await db.BlogCategory.findOne({
				where: {
					slug: newSlug
				},
			});
			if(!slugIsExist){
				await blogCategory.update({
					name: name,
					slug: newSlug
				});
				return {
					status: 'success',
					message: `Cập nhật danh mục [ ${name} ] có slug [ ${newSlug} ] thành công`,
				};
			}
			return {
				status: 'error',
				message: `Tên danh mục [ ${name} ] có slug [ ${newSlug} ] đã tồn tại`,
			};

		}
	} catch (error) {
		throw new Error(error);
	}
};

const deleteCategoryBlog = async (slug) => {
	try {
		const blogCategory = await db.BlogCategory.findOne({
			where: {
				slug: slug
			},
		});

		if(blogCategory){

			await Promise.all([blogCategory.destroy(), db.Blog.destroy({
				where: {
					blogCategoryId: blogCategory.id
				}
			})]);

			return {
				status: 'success',
				message: `Xóa danh mục [ ${blogCategory.name} ] thành công`,
			};
		}
		return {
			status: 'error',
			message: `Danh mục [ ${blogCategory.name} ] không tồn tại`,
		};
		

	} catch (error) {
		throw new Error(error);
	}
};

export { getAllBlogCategory, getCategoryBySlug, getAllBlogCategoryWithCount, createCategoryBlog, updateCategoryBlog, deleteCategoryBlog };
