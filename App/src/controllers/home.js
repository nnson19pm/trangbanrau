/** @format */

import { getAllProductCategories } from '../services/productCategoryService';
import { getDiscountProduct, getAllProducts, getLatestProduct_viewHome } from '../services/productService';

import {getRecentBlog} from '../services/blogService';

class HomeController {
	async home(req, res) {
		
		try {
			// const recentBlog = getRecentBlog();
			// const discountProduct = getDiscountProduct();
			// promises all 
			const [recentBlog, discountProducts, latestProduct_viewHome] = await Promise.all([
				getRecentBlog(),
				getDiscountProduct(),
				getLatestProduct_viewHome()
			]);
			
		
			await res.render('pages/user/home', {
				recentBlog,
				discountProducts,
				latestProduct_viewHome
			});
		} catch (err) {
			throw new Error(err);
		}
	}
}

export default new HomeController();
