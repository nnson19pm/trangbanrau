/** @format */

const addToCart = (productId, quantity = 1) => {
	$.get(`/api/cart/addToCart?productId=${productId}&quantity=${quantity}`, function (data, status) {
		if(data.code === 200) {
			alert('Thêm sản phẩm vào giỏ hàng thành công');
			
		}else{
			alert('Sản phẩm không đủ!');
		}
		
	});
};

const deleteItemInCart = (productId) => {
	$.get(`/api/cart/deleteItemInCart?productId=${productId}`, function (data, status) {
		if (status === 'success') {
			if (data.code === 200) {
				alert('Xoá sản phẩm thành công');

				$(`#item-${productId}`).remove();
				$(`#review-order-${productId}`).remove();
				$.get('/api/cart/getCartTotalPrice', function (data, status) {
					if (data.code === 200) {
						$('#discount').html("0 VND");
						$('#totalPrice').html("0 VND");
					}
				});
			} else {
				alert(data.message);
			}
		} else {
			alert('Có lỗi xảy ra. Vui lòng thử lại sau');
			console.error(data);
		}

		// console.log(data, status);
	});
};

const updateProductQuantity = (productId, price, quantity, discount) => {
	$.get(`/api/cart/updateQuantity?productId=${productId}&quantity=${quantity}`, function (data, status) {
		if (status === 'success') {
			if (data.code === 200) {
				// alert('Cập nhật số lượng sản phẩm thành công')
				
				let nPrice = (price * quantity).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
				
				$(`#totalprice-item-${productId}`).html(nPrice);

				$.get('/api/cart/getCartTotalPrice', function (data, status) {
					if (data.code === 200) {
						$('#discount').html(data.totalDiscount.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}));
						$('#totalPrice').html(data.totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}));
					}
				});
			} else {
				alert(data.message);
				location.reload();
				// $('quantity-' + productId).html(data.quantity);
			}
		} else {
			alert('Có lỗi xảy ra. Vui lòng thử lại sau');
			console.error(data);
		}
	});
};
