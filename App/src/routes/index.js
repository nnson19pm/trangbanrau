/** @format */

// import authMiddleware from '../middleware/verifyAuth';
import authRouter from './auth';
import home from '../routes/home';
import collections from '../routes/collections';
import myOrder from '../routes/myOrder'
import myProfile from '../routes/myProfile';

import shipper from '../routes/shipper';

import dashboardRoute from '../routes/admin/dashboard';

import productRoute from '../routes/product';
import categoryRoute from '../routes/category';
import bannerRoute from '../routes/banner';
import blogRoute from '../routes/blog';
import blogCategoryRoute from '../routes/blogCategory';
import cartRoute from '../routes/cart';

import adminInvoiceReceipt from './admin/invoiceReceipt';
import adminProduct from './admin/product';
import adminDashboard from './admin/dashboard';
import adminProductCategory from './admin/productCategory';
import AdminBlogRoute from './admin/blog';
import AdminBlogCategoryRoute from './admin/blogCatgory';
import AdminOrderRoute from './admin/order';
import AdminUserRoute from './admin/user';
import AdminAnalyticRoute from './admin/analytic';


function routes(app) {
    // ADMIN ROUTES
    app.use('/', dashboardRoute);

    app.use('/', categoryRoute);
    app.use('/', productRoute);
    app.use('/', bannerRoute);
    app.use('/', blogRoute);
    app.use('/', blogCategoryRoute);
    app.use('/', cartRoute);
    app.use('/', adminInvoiceReceipt);
    app.use('/', adminProduct);
    app.use('/', adminDashboard);
    app.use('/', adminProductCategory);
    app.use('/', AdminBlogRoute);
    app.use('/', AdminBlogCategoryRoute);
    app.use('/', AdminOrderRoute);
    app.use('/', AdminUserRoute);
    app.use('/', AdminAnalyticRoute);

    // USER ROUTES
    app.use('/', home);
    app.use('/', collections);
    app.use('/', myOrder);
    app.use('/', myProfile);

    //SHIPPER ROUTES
    app.use('/', shipper);
    //UTILS ROUTES
    app.use('/', authRouter);
    app.use('*', (req, res) => {
    	res.render('err/404');
    });
}

export default routes;
