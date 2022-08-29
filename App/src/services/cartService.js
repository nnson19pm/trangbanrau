/** @format */

import db from '../models';
import { getProduct } from './productService';


const checkStockSaveCart = async (cart) => {
	for (let i = 0; i < cart.length; i++) {
		const product = await getProduct(cart[i].productId);
		if(product.quantity < cart[i].quantity){
			return {
				status: false,
				message: `Sản phẩm ${product.name} vượt quá số lượng trong kho`,
			};
		}
	}
}

const saveCart = async (cart, orderInfo) => {
	try {
		const stock = await checkStockSaveCart(cart);
		if(stock){
			return {
				status: false,
				data: stock.message
			}
		}
		else{
			const order = await db.Order.create({
				full_name: orderInfo.full_name,
				address: orderInfo.address,
				phone_number: orderInfo.phone_number,
				note: orderInfo.note,
				order_date: new Date(),
				createdAt: new Date(),
				updatedAt: new Date(),
				status: 0,
				userId: orderInfo?.userId || null,
			});

			await Promise.all(
				cart.map(async (x) => {
					const product = await getProduct(x.productId);

					if (product) {
						const quantity = x?.quantity || 1;

						const orderDetail = await db.OrderDetails.create({
							quantity,
							price: product?.price,
							discount: product?.discount,
							productId: product?.id,
							orderId: order?.id,
							createdAt: new Date(),
							updatedAt: new Date(),
						});

						if (product.quantity - quantity < 0) {
							product.quantity = 0;
						} else {
							product.quantity -= quantity;
						}

						product.quantity_sold += quantity;

						product.save();
					}
				})
			);

			return {
				status: true,
				data: order?.id,
			}
		}
	} catch (e) {
		throw new Error(e);
	}
};

const checkStock = async (productId, quantity) => {
	const product = await db.Product.findOne({
		where: {
			id: productId,
		},
	});

	if (!product) {
		throw new Error('Sản phẩm không tồn tại');
	}

	if (product.quantity < quantity) {
		return false;
	}

	return true;
};

export { saveCart, checkStock };
