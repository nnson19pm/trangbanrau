/** @format */

import { getAllBlogCategoryWithCount, createCategoryBlog, getCategoryBySlug, updateCategoryBlog, deleteCategoryBlog } from '../../services/blogCategoryService';

class AdminBlogCategoryController {
	async index(req, res) {
		const offset = req.query.offset || 0;
		const products = await getAllBlogCategoryWithCount(offset);

		res.render('pages/admin/categoryBlog/index', {
			products,
			offset,
		});
	}

	async edit(req, res) {
		const id = req.params?.slug;

		if (!id) {
			res.render('error/404');
		}

		const blogCategory = await getCategoryBySlug(id);

		res.render('pages/admin/categoryBlog/edit', {
			blogCategory,
		});
	}

	async update(req, res) {
		if (!req.params.slug) {
			res.render('error/404');
		}

		try {
			const data = await updateCategoryBlog(req);
			if (data) {
				req.flash(data.status, data.message);
				res.redirect('back');
			} else {
				req.flash('error', 'Sửa danh mục blog thất bại');
				res.redirect('back');
			}
		} catch (err) {
			console.error(err);

			req.flash('error', 'Sửa blog thất bại');
			res.redirect('back');
		}
	}

	async create(req, res) {
		res.render('pages/admin/categoryBlog/create');
	}

	async store(req, res) {
		try {
			const data = await createCategoryBlog(req);

			
			if (data) {
				req.flash(data.status, data.message);
				res.redirect('back');
			} else {
				req.flash('error', 'Thêm danh mục blog thất bại');
				res.redirect('back');
			}
		
		} catch (err) {
			console.error(err);

			req.flash('error', 'Lỗi server');
			res.redirect('back');
		}
	}

	async delete(req, res) {
		try {
			const slug = req.params.slug;

			if (slug) {
				const data = await deleteCategoryBlog(slug);
				if (data) {
					req.flash(data.status, data.message);
					res.redirect('back');
				} else {
					req.flash('error', 'Xoá danh mục bài thất bại');
					res.redirect('back');
				}
			} else {
				req.flash('error', 'Thiếu ID bài viết');
				res.redirect('back');
			}
		} catch (err) {
			console.error(err);

			req.flash('error', 'Có lỗi xảy ra');
			res.redirect('back');
		}
	}
}

export default new AdminBlogCategoryController();
