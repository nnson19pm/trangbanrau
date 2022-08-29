import {getAllOrder, deleteOrder, getOrder, updateOrder, getAllOrderStatus, completeOrder} from "../../services/orderService";
import db from "../../models";
class AdminOrderController {
    async index(req, res) {
        const offset = req.query.offset || 0
        const products = await getAllOrder(offset)

        res.render('pages/admin/order/index', {
            products,
            offset
        });
    }

    async delete(req, res) {
        try {
            const productId = req.params.id;

            if (productId) {
                const data = await deleteOrder(productId);

                if (data) {
                    req.flash('success', 'Xoá đơn hàng thành công')
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

    async edit(req, res) {
        const id = req.params?.id

        if (!id) {
            res.render('error/404')
        }

        const order = await getOrder(id)

        res.render('pages/admin/order/edit', {
            order,
        });
    }

    async update(req, res) {
        if (!req.params.id) {
            res.render('error/404')
        }

        try {
            const data = await updateOrder(req);
            if (data) {
                req.flash('success', 'Sửa thành công')
                res.redirect('back')
            } else {
                req.flash('error', 'Sửa thất bại')
                res.redirect('back')
            }
        } catch (err) {
            console.error(err)

            req.flash('error', 'Sửa  thất bại')
            res.redirect('back')
        }
    }

    async receipt(req, res) {
		if (!req.params?.id) {
			res.render('err/404');
			return;
		}

		const order = await getOrder(req.params?.id);

		let price = 0;

		order.OrderDetails.forEach((x) => {
			price += Math.ceil((100-x?.discount)/100 * x?.price * x?.quantity)
		});
		// console.log(order)

		if (!order) {
			res.render('err/404');
			return;
		}

		res.render('pages/invoiceReceipt', { order, totalPrice: price });
	}

    async indexPageShipper(req, res) {
        // get all order status 3
        const offset = req.query.offset || 0
        const orders = await getAllOrderStatus(offset)
        res.render('pages/shipper', {
            orders,
            offset
        })

    }

    async updateStatus(req, res) {
        try {
            const orderId = req.params.id;
            const order = await completeOrder(orderId);
            if (order) {
                req.flash('success', 'Hoàn tất giao hàng')
                return res.redirect('back')
            }
            req.flash('error', 'Có lỗi xảy ra')
            
        } catch (error) {
            req.flash('error', 'Lỗi: ' + error);
			return res.redirect('back');
        }
    }

    async search(req, res) {
        console.log(req)
    }
}

export default new AdminOrderController();
