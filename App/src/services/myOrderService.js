/** @format */

import db from '../models';

const getMyOrders = async (userId) => {
    try {
        const myOrder = await db.Order.findAll({
            where: {
                userId: userId
            },
            include: [
                {
                    model: db.OrderDetails,
                    include: db.Product
                },
            ],
            order: [
                ['order_date', 'DESC']
            ],
            nest: true
        });

		if (myOrder) {
			return myOrder;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

const orderCancellation = async (orderId, userId) => {
	try {
		const order = await db.Order.findOne({
			where: {
				id: orderId,
				userId: userId,
			},
			nest: true,
		});

		if (!order) {
			throw new Error('Đơn hàng không tồn tại hoặc bạn không phải chủ sở hữu');
		}

		if (order?.status === 3 || order?.status === 2) {
			throw new Error('Đơn hàng đang được vận chuyển. Không thể huỷ!');
		}

		order.status = 4;
		order.save();

		const orderItems = await db.OrderDetails.findAll({
			where: {
				orderId,
			},
		});

        // console.log(orderItems)
        // console.log(typeof orderItems)

		if (orderItems) {
			orderItems.forEach(async (orderItem) => {
				const product = await db.Product.findOne({
					where: {
						id: orderItem.productId,
					},
				});

				if (product) {
					product.quantity += orderItem.quantity;
				}

				product.save();
			});
		}

		return true;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export { getMyOrders, orderCancellation };
