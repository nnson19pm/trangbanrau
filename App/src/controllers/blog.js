/** @format */

import { getAllBlogCategory } from '../services/blogCategoryService';
import { getRecentBlog, getAllBlogs, getBlogBySlug, getRelatedBlog } from '../services/blogService';
import dayjs from 'dayjs';
class BlogController {
	async index(req, res) {
		const offset = parseInt(req.query.offset) || 0;

		try {
			const blogCategories = await getAllBlogCategory();
			const blogs = await getAllBlogs(offset);

			const recentBlogs = await getRecentBlog(3);

			res.render('pages/user/blog', {
				blogCategories,
				recentBlogs,
				blogs,
				offset,
			});
		} catch (err) {
			throw new Error(err);
		}
	}

	async detail(req, res) {
		const slug = req.params.slug;

		if (!slug) {
			res.redirect('err/404');
			return;
		}

		try {
			const blog = await getBlogBySlug(slug);

			if (!blog) {
				res.redirect('err/404');
				return;
			}

			const blogCategories = await getAllBlogCategory();
			const recentBlogs = await getRecentBlog(3);
			const relatedBlog = await getRelatedBlog(blog?.blogCategoryId);

			res.render('pages/user/blogDetails', {
				blog,
				blogCategories,
				recentBlogs,
				relatedBlog,
			});
		} catch (err) {
			throw new Error(err);
		}
	}
}

export default new BlogController();
