/** @format */
import db from '../models';
import { getProduct } from '../services/productService';
import { checkStock, saveCart } from '../services/cartService';

class CartController {
	async index(req, res) {
		const cart = req.session.cart || [];

        let totalPrice = 0

		const productWithCart = await Promise.all(
			cart.map(async (x) => {
				const product = await getProduct(x.productId);
				if (product) {
					const pad = Math.ceil(((100 - product?.discount) / 100) * product.price);

					totalPrice += pad * x.quantity;

					return {
						id: product.id,
						name: product.name,
						price: product.price,
						discount: product.discount,
						priceAfterDiscount: pad,
						quantity: x.quantity,
						thumbnails: product.thumbnails,
					};
				}
			})
		);

		res.render('pages/user/cart', {
			products: productWithCart,
			totalPrice: totalPrice,
			
		});
	}

	async addToCart(req, res) {
		const productId = parseInt(req.query.productId);
		let quantity = parseInt(req.query.quantity) || 1;

		if (!productId) {
			res.json({
				message: 'Bạn chưa chọn sản phẩm',
			}).status(400);
			return;
		}

		if (quantity <= 0) {
			quantity = 1;
		}
		const cart = req.session.cart || [];

		const checkExist = cart.findIndex((x) => {
			return x.productId == productId;
		});
		let check = true;
		if (checkExist == -1) {
			cart.push({
				productId,
				quantity: quantity,
			});
		} else {
			//check stock 
			const product = await getProduct(productId);
			if(cart[checkExist].quantity + 1 > product.quantity) {
				check = false;
			}
			else{
				cart[checkExist].quantity += quantity;
				check = true;
			}
			
		}

		req.session.cart = cart;
		if(check == true){
			res.json({
				code: 200,
				message: 'Thêm sản phẩm thành công',
			})
		}
		else{
			res.json({
				code: 400,
				message: 'Sản phẩm không đủ hàng',
			});
		}

	}

	deleteItemInCart(req, res) {
		const productId = parseInt(req.query.productId);

		if (!productId) {
			res.json({
				code: 400,
				message: 'Bạn chưa chọn sản phẩm',
			}).status(400);
			return;
		}

		const cart = req.session.cart;

		if (!cart) {
			res.json({
				code: 200,
				message: 'Giỏ hàng rỗng',
			});

			return;
		}

		req.session.cart = cart.filter((x) => x.productId != productId);

		// console.log(req.session.order);

		res.json({
			code: 200,
			message: 'Xoá sản phẩm thành công',
		});
	}

	async updateQuantity(req, res) {
		const productId = parseInt(req.query.productId);
		const quantity = parseInt(req.query.quantity);

		const product = await db.Product.findOne({
			where: {
				delete_flag: false,
				id: productId,
			},
			nest: true,
		});

		if (!productId || !quantity) {
			res.json({
				code: 400,
				message: 'Bạn chưa chọn sản phẩm hoặc số lượng lỗi',
			}).status(400);
			return;
		}

		const cart = req.session.cart || [];

		if (!cart) {
			res.json({
				code: 400,
				message: 'Giỏ hàng rỗng',
			});

			return;
		}

		const checkStockAvailable = await checkStock(productId, quantity);

		// console.log(checkStockAvailable);

		if (!checkStockAvailable) {
			res.json({
				code: 400,
				message: 'Mặc Hàng Đã Quá Số Lượng Trong Kho ',
				quantity: product.quantity,
			});

			return;
		}

		const checkExist = cart.findIndex((x) => {
			return x.productId == productId;
		});

		if (checkExist == -1) {
			cart.push({
				productId,
				quantity: quantity,
			});
		} else {
			cart[checkExist].quantity = quantity;
		}

		req.session.cart = cart;

		// console.log(req.session.order);

		res.json({
			code: 200,
			message: 'Success',
		});
	}

	async getTotalPrice(req, res) {
		const cart = req.session.cart || [];

		let totalPrice = 0;
		let totalDiscount = 0;
		await Promise.all(
			cart.map(async (x) => {
				const product = await getProduct(x.productId);

				if (product) {
					const pad = Math.ceil(((100 - product?.discount) / 100) * product.price)
					const dis =  (product.price * x.quantity * product.discount)/100;	
					
					totalDiscount += dis
					totalPrice += pad * x.quantity;	
				}
			})
		);

		res.json({
			code: 200,
			totalPrice: totalPrice,
			totalDiscount: totalDiscount,
		});
	}

	async getQuantity(req, res) {
		const productId = parseInt(req.query.productId);
		const product = await db.Product.findOne({
			where: {
				delete_flag: false,
				id: productId,
			},
			nest: true,
		});
		if (product) {
			return product.quantity;
		}
		return null;
	}

	async saveCart(req, res) {
		const full_name = req.body?.full_name;
		const phone_number = req.body?.phone_number;
		const address = req.body?.address;
		const note = req.body?.note;

		if (!full_name || !phone_number || !address) {
			req.flash('error', 'Thiếu thông tin!');
			res.redirect('back');

			return;
		}

		if (!req.session?.cart) {
			req.flash('error', 'Giỏ hàng trống');
			res.redirect('back');
			return;
		}

		const orderInfo = {
			full_name,
			phone_number,
			address,
			note,
			userId: req.session?.user?.id || null,
		};

		try {
			const result = await saveCart(req.session?.cart, orderInfo);
			if (result.status == true) {
				req.flash('success', 'Tạo đơn thành công. Mã đơn hàng: ' + result.data);
				req.session.cart = [];
				res.redirect('back');
			} else {
				req.flash('error', `${result.data}`);
				res.redirect('back');
			}
		} catch (e) {
			console.log(e);

			req.flash('error', 'Lỗi không xác định');
			res.redirect('back');
		}
	}
}

export default new CartController();
