/** @format */

import db from '../models';
import { regexSpecialCharacter } from '../utils/regex';
import { createSlug } from '../utils/slug';
const getAllCategory = async () => {
    try {
        const category = await db.Category.findAll();
        return category;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const getCategoryBySlug = async (slug, offset = 0) => {
    try {
        const cates = await db.ProductCategory.findOne({
            where: {
                slug,
            },
            include: [
                {
                    model: db.Product,
                    limit: 9,
                    offset,
                },
            ],
        });

        if (cates) {
            return cates;
        } else {
            return null;
        }
    } catch (err) {
        throw new Error(err);
    }
};

const createCategory = async (req) => {
    try {
        const body = req.body;
        const name = body.name;

        if(regexSpecialCharacter(name) == true){
			return {
				status: 'error',
				message: 'Tên danh mục không được chứa kí tự đặc biệt'
			}
		}

        if(!name) {
			return {
				status: 'error',
				message: 'Tên danh mục không được để trống',
			};
		}

        const slug  = createSlug(name);
		const titleIsExist = await db.ProductCategory.findOne({
			where: {
				name,
				slug
			},
		});


        if (titleIsExist) {
			return {
				status: 'error',
				message: `Tên danh mục [ ${name} ] có slug [${slug}] đã tồn tại`,
			};
		}
		else{
			await db.ProductCategory.create({	
				name: body.name,
				slug
			});
			return {
				status: 'success',
				message: `Tạo danh mục [ ${name} ] thành công`,
			};
		}

    } catch (error) {
        throw new Error(error);
    }
};

const updateCategory = async (req, res) => {
    try {
        const slug = req.params?.slug;
        const name = req.body.name;
        
        if(regexSpecialCharacter(name) == true){
			return {
				status: 'error',
				message: 'Tên danh mục không được chứa kí tự đặc biệt'
			}
		}

		if(!name) {
			return {
				status: 'error',
				message: 'Tên danh mục không được để trống',
			};
		}

        const productCategory = await db.ProductCategory.findOne({
			where: {
				slug: slug
			},
		});

		if (productCategory) {

			const newSlug = createSlug(name);
			// check if new slug is exist in database
			const slugIsExist = await db.ProductCategory.findOne({
				where: {
					slug: newSlug
				},
			});
            if(!slugIsExist){
				await productCategory.update({
					name: name,
					slug: newSlug
				});
				return {
					status: 'success',
					message: `Cập nhật danh mục [ ${name} ] có slug [ ${newSlug} ] thành công`,
				};
			}
			return {
				status: 'error',
				message: `Tên danh mục [ ${name} ] có slug [ ${newSlug} ] đã tồn tại`,
			};
		}
    } catch (error) {
        throw new Error(error);
    }
};

const deleteCategory = async (id) => {
    try {
        const productCategory = await db.ProductCategory.destroy({
            where: {
                id: id,
            },
        });

        return productCategory;
    } catch (error) {
        throw new Error(error);
    }
};

export default {getAllCategory, createCategory, updateCategory, deleteCategory, getCategoryBySlug};
