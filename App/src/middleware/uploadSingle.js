/** @format */

const multer = require('multer');
import db from '../models';
import fs from 'fs';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'src/public/images');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + '-' + file.originalname);
	},
});

const imageFilter = async (req, file, cb) => {
	if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
		return cb(new Error('Only image files are allowed!'), false);
	}
	// limit file size
	if (file.size > 1024 * 1024 * 5) {
		return cb(new Error('File size is too large!'), false);
	}
	cb(null, true);
};

export const uploadSingle = multer({ storage: storage, fileFilter: imageFilter, dest: 'src/public/images' }).single('thumbnails');

export const handleUploadSingle = (req, res, next) => {
	// async..await is not allowed in global scope, must use a wrapper
	uploadSingle(req, res, async (err) => {
		if (err) {
			return res.status(500).json({ message: err.message });
		}

		const product = await db.Product.findOne({
			where: {
				id: req.query.id,
			},
			raw: true,
		});
		if (product) {
			const thumbnails = product.thumbnails;
			const fileImage = fs.existsSync(`./src/public/${thumbnails}`);
			// check if file is exist in folder image
			if (fileImage && req.file) {
				// delete file in folder image
				fs.unlinkSync(`./src/public/${thumbnails}`, (err) => {
					if (err) throw err;
				});
				next();
			} else {
				next();
			}
		}
	});
};
