const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
})
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    // limit file size
    if (file.size > 1024 * 1024 * 5) {
        return cb(new Error('File size is too large!'), false);
    }
    // limit < 5 images
    if (req.files.length > 5) {
        return cb(new Error('No more than 5 images are allowed!'), false);
    }
    // no image
    if (!file) {
        return cb(new Error('No image provided!'), false);
    }

    cb(null, true);
}

const uploadMultiple = multer({ storage: storage , fileFilter: imageFilter, dest: "src/public/images"}).array("image", 10);
const handleUploadMultiple = (req, res, next) => {
    uploadMultiple(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        next();
    });

}

export default handleUploadMultiple;


