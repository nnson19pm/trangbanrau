/** @format */
import { getMyOrders, orderCancellation } from '../services/myOrderService';
import { getOrder } from '../services/orderService';

class MyOderController {
	async index(req, res) {
		try {
			const userId = req.session.user.id;
			const data = await getMyOrders(userId);
			if (data) {
				res.render('pages/user/myOrder', {
					myOrder: data,
				});
			} else {
				res.redirect('/');
			}
		} catch (err) {
			throw new Error(err);
		}
	}

	async cancel(req, res) {
		try {
			const orderId = req.params.id;
			const userId = req.session.user.id;
			// console.log(orderId, userId);
			const data = await orderCancellation(orderId, userId);

			if (data) {
				req.flash('success', 'Huỷ đơn thành công');
				return res.redirect('back');
			}
		} catch (err) {
			req.flash('error', 'Lỗi: ' + err);
			return res.redirect('back');
		}
	}
}

export default new MyOderController();
