/** @format */

import {getAllProductCategories} from '../../services/productCategoryService'
import {getAllProducts, getProduct, getAllProductDeleted} from '../../services/productService'

class AdminProductController {
    async index(req, res) {
        const offset = req.query.offset || 0
        const products = await getAllProducts(offset)

        res.render('pages/admin/product/index', {
            products,
            offset
        });
    }

    async edit(req, res) {
        const id = req.params?.id

        if (!id) {
            res.render('error/404')
        }

        const product = await getProduct(id)
        const productCategory = await getAllProductCategories()

        res.render('pages/admin/product/edit', {
            product,
            productCategory
        });
    }

    async create(req, res) {
        const productCategory = await getAllProductCategories()

        res.render('pages/admin/product/create', {
            productCategory
        });
    }

    async garbageCan(req, res) {
        const offset = req.query.offset || 0
        const products = await getAllProductDeleted(offset)

        res.render('pages/admin/product/restore', {
            products,
            offset
        });
    }
}

export default new AdminProductController();
