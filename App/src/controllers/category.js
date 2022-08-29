/** @format */

import categoryService from '../services/categoryService';

class CategoryController {
    async getAllCategory(req, res) {
        try {
            const data = await categoryService.getAllCategory();
            if (data) {
                return res.status(200).json({
                    message: 'Create category success',
                    data: data,
                });
            }
            return res.status(400).json({
                message: 'Create category fail',
            });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getCategoryDetail(req, res) {
        const slug = req.params.slug;
        const offset = req.query.offset || 0;

        if (!slug) {
            res.render('err/404');
            return;
        }

        try {
            const data = await categoryService.getCategoryBySlug(slug, offset);

            if (!data) {
                res.render('err/404');
                return;
            }

            res.render('pages/user/category', {
                category: data,
                offset,
            });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async createCategory(req, res) {
        try {
            const data = await categoryService.createCategory(req);
            if (data) {
				req.flash(data.status, data.message);
				res.redirect('back');
			} else {
				req.flash('error', 'Thêm danh mục blog thất bại');
				res.redirect('back');
			}
        } catch (error) {
            console.log(error);

            req.flash('error', 'Có lỗi xảy ra')
            res.redirect('back')
        }
    }

    async updateCategory(req, res) {
        
        try {
            // if (!req.params.slug) {
            //     res.render('err/404')
            // }
            const data = await categoryService.updateCategory(req,res);

            if (data) {
                req.flash(data.status, data.message);
				res.redirect('back');
                
            } else {
                req.flash('error', 'Sửa danh mục thất bại')
                res.redirect('back')
            }
        } catch (error) {
            console.log(error);

            req.flash('error', 'Có lỗi xảy ra')
            res.redirect('back')
        }
    }

    async deleteCategory(req, res) {
        try {
            const id = req.params.id;

            if (!id) {
                res.render('error/404')
            }

            const deleteSuccess = await categoryService.deleteCategory(id);

            if (deleteSuccess) {
                req.flash('success', 'Xoá danh mục sản phẩm thành công')
                res.redirect('back')
            } else {
                req.flash('error', 'Xoá danh mục sản phẩm thất bại')
                res.redirect('back')
            }
        } catch (error) {
            console.log(error);
            req.flash('error', 'Có lỗi xảy ra')
            res.redirect('back')
        }
    }
}

export default new CategoryController();
