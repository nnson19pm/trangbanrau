/** @format */

import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getRelatedProduct,
    restoreProduct
} from '../services/productService';

class ProductController {
    async getAllProducts(req, res) {
        // const offset = req.params.offset || 0;
        const limit = 9;
        const page = req.params.page || 1;
        try {
            // const products = await getAllProducts(offset);
            const products = await getAllProducts(limit, page);

            return res.status(200).json(products);
        } catch (err) {
            throw new Error(err);
        }
    }

    async createProduct(req, res) {
        try {
            const data = await createProduct(req);

            if (data) {
                req.flash(data.status, data.message)
                res.redirect('back')
            } else {
                req.flash('error', 'Thêm sản phẩm thất bại')
                res.redirect('back')
            }
        } catch (err) {
            console.error(err)

            req.flash('error', 'Lỗi server')
            res.redirect('back')
        }
    }

    async updateProduct(req, res) {
        if (!req.params.id) {
            res.render('error/404')
        }

        try {
            const data = await updateProduct(req);
            if (data) {
                req.flash('success', 'Sửa sản phẩm thành công')
                res.redirect('back')
            } else {
                req.flash('error', 'Sửa sản phẩm thất bại')
                res.redirect('back')
            }
        } catch (err) {
            console.error(err)

            req.flash('error', 'Sửa sản phẩm thất bại')
            res.redirect('back')
        }
    }

    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;

            if (productId) {
                const data = await deleteProduct(productId);

                if (data) {
                    req.flash('success', 'Xoá sản phẩm thành công')
                    res.redirect('back')
                }
                else{
                    req.flash('error', 'Xoá sản phẩm thất bại')
                    res.redirect('back')
                }
            } else {
                req.flash('error', 'Thiếu ID sản phẩm')
                res.redirect('back')
            }
        } catch (err) {
            console.error(err)

            req.flash('error', 'Có lỗi xảy ra')
            res.redirect('back')
        }
    }

    async getProductDetail(req, res) {
        const id = req.params.id;

        if (!id) {
            res.redirect('/');
            return;
        }

        try {
            const product = await getProduct(id);

            if (!product) {
                res.render('err/404');
                return false;
            }

            const relatedProducts = await getRelatedProduct(product.categoryId);

            res.render('pages/user/productDetails', {
                product,
                relatedProducts,
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async restoreProduct(req, res) {
        try {
            const productId = req.params.id;

            if (productId) {
                const data = await restoreProduct(productId);

                if (data) {
                    req.flash('success', 'Khôi phục sản phẩm thành công')
                    res.redirect('back')
                }
                else{
                    req.flash('error', 'Khôi phục sản phẩm thất bại')
                    res.redirect('back')
                }
            } else {
                req.flash('error', 'Thiếu ID sản phẩm')
                res.redirect('back')
            }
        } catch (err) {
            console.error(err)

            req.flash('error', 'Có lỗi xảy ra')
            res.redirect('back')
        }
    }
}

export default new ProductController();
