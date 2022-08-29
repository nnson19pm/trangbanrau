/** @format */

import { updateBlog, deleteBlog, createBlog } from '../../services/blogService';
import { getAllBlogs, getBlogBySlug } from '../../services/blogService';
import { getAllBlogCategory } from '../../services/blogCategoryService';

class AdminBlogController {
	async index(req, res) {
		const offset = req.query.offset || 0;
		const products = await getAllBlogs(offset);

		res.render('pages/admin/blog/index', {
			products,
			offset,
		});
	}

	async edit(req, res) {
		const id = req.params?.slug;

		if (!id) {
			res.render('error/404');
		}

		const blog = await getBlogBySlug(id);
		const blogCategory = await getAllBlogCategory();

		res.render('pages/admin/blog/edit', {
			blog,
			blogCategory,
		});
	}

	async update(req, res) {
		if (!req.params.slug) {
			res.render('error/404');
		}

		try {
			const data = await updateBlog(req);
			if (data) {
				req.flash('success', 'Sửa blog thành công');
				res.redirect('back');
			} else {
				req.flash('error', 'Sửa blog thất bại');
				res.redirect('back');
			}
		} catch (err) {
			console.error(err);

			req.flash('error', 'Sửa blog thất bại');
			res.redirect('back');
		}
	}

	async create(req, res) {
		const blogCategory = await getAllBlogCategory();

		res.render('pages/admin/blog/create', {
			blogCategory,
		});
	}

	async store(req, res) {
		try {
			const data = await createBlog(req);

			if (data) {
				req.flash('success', 'Thêm blog thành công');
				res.redirect('back');
			} else {
				req.flash('error', 'Thêm blog thất bại');
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
			const productId = req.params.slug;

			if (productId) {
				const data = await deleteBlog(productId);

				if (data) {
					req.flash('success', 'Xoá sản phẩm thành công');
					res.redirect('back');
				}
			} else {
				req.flash('error', 'Thiếu ID sản phẩm');
				res.redirect('back');
			}
		} catch (err) {
			console.error(err);

			req.flash('error', 'Có lỗi xảy ra');
			res.redirect('back');
		}
	}
}

export default new AdminBlogController();
