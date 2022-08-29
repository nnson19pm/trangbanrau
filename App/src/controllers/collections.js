/** @format */

import { getAllProductCategories } from '../services/productCategoryService';
import { getDiscountProduct, getAllProducts, getLatestProduct, getProductByKeyword  } from '../services/productService';

class CollectionsController {
	async collections(req, res) {
		const offset = parseInt(req.query.offset) || 0;

		try {
			const discountProducts = await getDiscountProduct();

			const products = await getAllProducts(offset);

			const latestProducts = await getLatestProduct();

			await res.render('pages/user/index', {
				discountProducts,
				products,
				offset,
				latestProducts,
			});
		} catch (err) {
			throw new Error(err);
		}
	}
	
	async getCollectionsByKeyword(req, res) {
		const keyword = req.query.kw;
		const page = parseInt(req.query.page) || 1;
		try {
			const discountProducts = await getDiscountProduct();

			const products = await getProductByKeyword(keyword , page);

			const totalPage = Math.ceil(products.count / 3);

			const latestProducts = await getLatestProduct();

			const productCategories = await getAllProductCategories();
			await res.render('pages/user/searchProduct', {
				discountProducts,
				products,
				keyword,
				latestProducts,
				productCategories,
				totalPage,
				page
			});

		} catch (err) {
			throw new Error(err);
		}
	}
}

export default new CollectionsController();
