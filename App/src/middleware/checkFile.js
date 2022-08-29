export const checkFile = (req, res, next) => {
    if (req.files && req.files.file) {
        const file = req.files.file;
        const fileName = file.name;
        const fileExt = fileName.split('.').pop();
        const fileMime = file.mimetype;

        if (fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'png' || fileExt === 'gif') {
            if (fileMime === 'image/jpeg' || fileMime === 'image/png' || fileMime === 'image/gif' && file.size < 2 * 1024 * 1024) {
                next();
            } else {
                req.flash('error', 'Không đúng định dạng ảnh hoặc ảnh có kích thước lớn hơn 2MB');
                res.redirect('back')
            }
        } else {
            req.flash('error', 'Không đúng định dạng ảnh');
            res.redirect('back')
        }
    } else {
        next();
    }
}