/** @format */
import { getAllBlogCategory, getCategoryBySlug } from '../services/blogCategoryService';

class BlogCategoryController {
	async detail(req, res) {
		const slug = req.params.slug;
		const offset = req.query.offset || 0;

		if (!slug) {
			res.render('err/404');
			return;
		}

		try {
			const data = await getCategoryBySlug(slug, offset);
			const blogCategories = await getAllBlogCategory();

			if (!data) {
				res.render('err/404');
				return;
			}

			res.render('pages/user/blogCategory', {
				category: data,
				blogCategories,
				offset,
			});
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	}
}

export default new BlogCategoryController();
