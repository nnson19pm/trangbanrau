/** @format */

import db from '../models';

const getAllProductCategories = async () => {
    try {
        const products = await db.ProductCategory.findAll();

        return products;
    } catch (err) {
        throw new Error(err);
    }
};

const getAllProductCategoriesWithCount = async (offset = 0) => {
    const limit = 9;

    try {
        const products = await db.ProductCategory.findAndCountAll({
            offset: parseInt(offset),
            limit,
            nest: true,
        });

        return products;
    } catch (err) {
        throw new Error(err);
    }
};

const getProductCategory = async (slug) => {
    try {
        const product = await db.ProductCategory.findOne({
            where: {
                slug
            },
            nest: true
        })

        return product
    } catch (e) {
        throw new (e)
    }
}



export {getAllProductCategories, getAllProductCategoriesWithCount, getProductCategory};
