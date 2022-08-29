/** @format */

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import connectDB from './config/connectDB';
import path from 'path';
import session from 'express-session';
import flash from 'express-flash';

import { getAllProductCategories } from './services/productCategoryService';

const app = express();

//cors only http://localhost:3000
app.use(
	cors({
		origin: '*',
	})
);

// setup session
app.use(
	session({
		secret: 'abcxyzthisissecretkey',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
			// secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
		},
	})
);

// apply express-flash-message middleware
app.use(flash());

app.use(async function (req, res, next) {
	// if there's a flash message in the session request, make it available in the response, then delete it
	res.locals.sessionFlash = req.session.sessionFlash;
	delete req.session.sessionFlash;

	res.locals.isLoggedIn = req.session.isLoggedIn;
	res.locals.user = req.session.user;
	res.locals.cart = req.session.cart;

	res.locals.productCategories = await getAllProductCategories();
	next();
});

app.locals.truncateString = (str, num) => {
	// str = character length
	if (str.length <= num) {
		return str;
	}
	return str.slice(0, num) + '...';
};

// static files
app.use(express.static(path.join(__dirname, 'public')));

//view engine
app.set('view engine', 'ejs');
app.set('views', './src/views/');

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

//route
routes(app);

//dotenv
dotenv.config();
const port = process.env.PORT || 3030;

//connect to db
// connectDB();

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});
