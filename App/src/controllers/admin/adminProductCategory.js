/** @format */

import {
    getAllProductCategories,
    getAllProductCategoriesWithCount,
    getProductCategory
} from '../../services/productCategoryService'

class AdminProductCategoryController {
    async index(req, res) {
        const offset = req.query.offset || 0
        const products = await getAllProductCategoriesWithCount(offset)

        res.render('pages/admin/categoryProduct/index', {
            productCategories: products,
            offset
        });
    }

    async edit(req, res) {
        const slug = req.params?.slug

        if (!slug) {
            res.render('error/404')
        }

        const productCategory = await getProductCategory(slug)

        res.render('pages/admin/categoryProduct/edit', {
            productCategory
        });
    }

    async create(req, res) {
        res.render('pages/admin/categoryProduct/create');
    }
}

export default new AdminProductCategoryController();
