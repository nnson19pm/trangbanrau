import {getOrderRange} from '../../services/orderService'
import dayjs from 'dayjs'
class AdminIncomeController {
    async index(req, res) {
        let orders;

        if (req.query?.fromDate || req.query?.toDate) {
            orders = await getOrderRange(req.query?.fromDate, req.query?.toDate, req.query?.offet)
        }

        const fromDateFormat = dayjs(req.query?.fromDate).format('DD/MM/YYYY')
        const toDateFormat = dayjs(req.query?.toDate).format('DD/MM/YYYY')

        res.render('pages/admin/analytic/income', {
            orders,
            fromDate: req.query?.fromDate,
            toDate: req.query?.toDate,
            fromDateFormat,
            toDateFormat
        })
    }
}

export default new AdminIncomeController()