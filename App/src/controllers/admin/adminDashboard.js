import db from "../../models";
import {getOrderDashboard, getOrderRange} from "../../services/orderService";
import dayjs from "dayjs";

class AdminDashBoardController {
    async index(req, res) {
        const totalOrder = await db.Order.count();
        const totalOrderDelivered = db.Order.count({
            where: {
                status: 3
            }
        });
        const totalOrderCanceled =  db.Order.count({
            where: {
                status: 4
            }
        });
        const totalUser = db.User.count({
            where: {
                roleId: 'user'
            }
        });

        const [ totalOrderResult,
                totalOrderDeliveredResult, 
                totalOrderCanceledResult,
                totalUserResult 
        ] = await Promise.all([ totalOrder ,totalOrderDelivered, totalOrderCanceled, totalUser]);

        const totalPrice = await getOrderDashboard();

        res.render('pages/admin/dashboard', {
            totalOrder: totalOrderResult,
            totalOrderDelivered: totalOrderDeliveredResult,
            totalOrderCanceled: totalOrderCanceledResult,
            totalUser: totalUserResult,
            totalPrice: totalPrice,
        });
    }

    async apiIndex(req, res) {
        const toDay = new Date();
        const fromDay = new Date(toDay.getTime() - 7 * 24 * 60 * 60 * 1000);

        const getOrder7Days = await getOrderRange(fromDay, toDay);

        let sum = [];
        for(let i = 1; i <= 7; i++) {
            const date = dayjs(fromDay).add(i, 'day').format('DD/MM/YYYY');
            const index = getOrder7Days.orderDates.findIndex(x => x.orderDate === date);
            if (index !== -1) {
                sum.push(getOrder7Days.orderDates[index].sumOrder);
            }
            else {
                sum.push(0);
            }
            
        }

        let dates = [];
        for(let i = 1; i <= 7; i++) {
            const date = dayjs(fromDay).add(i, 'day').format('DD/MM/YYYY');
            const index = getOrder7Days.orderDates.findIndex(x => x.orderDate === date);
            if (index !== -1) {
                dates.push(date);
            }
            else {
                dates.push(date);
            }
            
        }

        res.json({
            sum: sum,
            date: dates
        });
    }

    async apiGetOrder(req, res) {
        const orderCount =  db.Order.count();
        
        const orderStatus0=  db.Order.count({ where: {status: 0}})
        const orderStatus1=  db.Order.count({ where: {status: 1}})
        const orderStatus2=  db.Order.count({ where: {status: 2}})
        const orderStatus3=  db.Order.count({ where: {status: 3}})
        const orderStatus4=  db.Order.count({ where: {status: 4}})
        const [ orderCountResult,
                orderStatus3Result,
                orderStatus4Result,
                orderStatus2Result,
                orderStatus1Result,
                orderStatus0Result
        ] = await Promise.all([ orderCount,
                                orderStatus3,
                                orderStatus4,
                                orderStatus2,
                                orderStatus1,
                                orderStatus0]);

        res.json({
            orderCount: orderCountResult,
            orderStatus3: orderStatus3Result,
            orderStatus4: orderStatus4Result,
            orderStatus2: orderStatus2Result,
            orderStatus1: orderStatus1Result,
            orderStatus0: orderStatus0Result,
        });
    }

}



export default new AdminDashBoardController();
