import db from '../models';
import dayjs from 'dayjs'
import {Op} from 'sequelize'

const getAllOrder = async (offset = 0) => {
    const limit = 9;

    try {
        const products = await db.Order.findAndCountAll({
            offset: parseInt(offset),
            limit,
            include: [
                {
                    model: db.OrderDetails,
                },
            ],
            orderBy: [['updatedAt', 'desc']],
            nest: true,
        });

        return products;
    } catch (err) {
        throw new Error(err);
    }
}

const getAllOrderStatus = async (offset = 0) => {
    try {
        const orders = await db.Order.findAll({
            offset: parseInt(offset),
            limit: 9,
            where: {
                status: 2,
            },
            include: [
                {
                    model: db.OrderDetails,
                },
            ],
            orderBy: [['updatedAt', 'desc']],
            nest: true,
        });
        return orders;
    }
    catch (err) {
        throw new Error(err);
    }
}


const deleteOrder = async (productId) => {
    try {
        const product = await db.Order.destroy({
            where: {
                id: productId,
            },
        });

        return product
    } catch (error) {
        throw new Error(error);
    }
};

const getOrder = async (id) => {
    try {
        const order = await db.Order.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: db.OrderDetails,
                    include: db.Product
                },
            ],
            nest: true,
        });
        if (order) {
            return order;
        } else {
            return null;
        }
    } catch (err) {
        throw new Error(err);
    }
};

const updateOrder = async (req) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const product = await db.Order.findOne({
            where: {
                id: id,
            },
        });

        if (product) {
            const newProduct = await product.update(body);
            return newProduct;
        }
    } catch (error) {
        throw new Error(error);
    }
};

const getOrderRange = async (fromDate, toDate, offset = 0) => {
    try {
        if (!toDate) {
            toDate = dayjs().endOf("day")
        }

        const product = await db.Order.findAll({
            where: {
                order_date: {
                    [Op.between]: [dayjs(fromDate).startOf("day").toDate(), dayjs(toDate).endOf("day").toDate()]
                },
                //get status = 3
                status: 3,
            },
            offset,
            include: [
                {
                    model: db.OrderDetails,
                    include: db.Product
                },
            ],
            nest: true,
        });
        if (product) {
            let totalPrice = 0

            const orders = product.map(x => {
                const details = x.OrderDetails.map(y => {
                    return Math.ceil((100-y?.discount)/100 * y?.price * y?.quantity)
                })
                
                totalPrice += details.reduce((a, b) => a + b, 0)
               
               
            
                return {
                    id: x?.id,
                    orderTotalPrice: details,
                    name: x?.full_name,
                    phone_number: x?.phone_number,
                    address: x?.address,
                    order_date: x?.order_date,
                }
            })
            
            // BIỂU ĐỒ CỘT TRANG ADMIN
            let orderDates = [];
            // so sanh ngay nếu trùng thì tăng số lượng 
            for (let i = 0; i < orders.length; i++) {
                const order = orders[i];
                const orderDate = dayjs(order.order_date).format('DD/MM/YYYY');
                const index = orderDates.findIndex(x => x.orderDate === orderDate);
               // nếu trùng thì tăng sumOrder lên 1 đơn vị
                if (index !== -1) {
                    orderDates[index].sumOrder += 1;
                }
                // nếu không trùng thì thêm vào mảng
                else {
                    orderDates.push({
                        orderDate,
                        sumOrder: 1,
                    });
                }
            }
            return {
                orders,
                totalPrice,
                orderDates
            };
            
        } else {
            return null;
        }
        
    } catch (err) {
        throw new Error(err);
    }
}

const getOrderDashboard = async () => {
    try{
        const product = await db.Order.findAll({
            include: [
                {
                    model: db.OrderDetails,
                    include: db.Product
                },
            ],
            nest: true,
        });
        if (product) {
            let totalPrice = 0
            const orders = product.map(x => {
                const details = x.OrderDetails.map(y => {
                    return Math.ceil((100-y?.discount)/100 * y?.price * y?.quantity)
                })
                
                totalPrice += details.reduce((a, b) => a + b, 0)
            })
      
            return {
                totalPrice,
            };
            
        }
        return null;

    }catch(err){
        throw new Error(err);
    }
}

const completeOrder = async (id) => {
    try {
        const order = await db.Order.findOne({
            where: {
                id,
            },
        });
        if (order) {
            const newOrder = await order.update({
                status: 3,
            });
            return newOrder;
        }
        return null;

    }
    catch (error) {
        throw new Error(error);
    }
}

export {getAllOrder, deleteOrder, getOrder, updateOrder, getOrderRange, getOrderDashboard, getAllOrderStatus, completeOrder};