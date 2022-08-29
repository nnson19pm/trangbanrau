import {getAllUser, deleteUser, getUser, updateUser, createUser, updatePassword, getUserDeleted, restoreUser} from "../../services/userService";

class AdminOrderController {
    async index(req, res) {
        const offset = req.query.offset || 0
        const users = await getAllUser(offset)

        res.render('pages/admin/user/index', {
            users,
            offset
        });
    }

    async delete(req, res) {
        try {
            const userId = req.params.id;

            if (userId) {
                const data = await deleteUser(userId);

                if (data) {
                    req.flash('success', 'Xoá người dùng thành công')
                    res.redirect('back')
                }
            } else {
                req.flash('error', 'Thiếu ID sản phẩm')
                res.redirect('back')
            }
        } catch (err) {
            console.error(err)

            req.flash('error', 'Có lỗi xảy ra')
            res.redirect('back')
        }
    }

    async edit(req, res) {
        const id = req.params?.id

        if (!id) {
            res.render('error/404')
        }

        const user = await getUser(id)

        res.render('pages/admin/user/edit', {
            user,
        });
    }

    async update(req, res) {
        const id =  req.params?.id || req.session?.user.id
        if (!id) {
            res.render('error/404')
        }

        try {
            const data = await updateUser(id, req.body);

            if (data) {
                req.flash('success', 'Sửa người dùng thành công')
                res.redirect('back')
            } else {
                req.flash('error', 'Sửa người dùng thất bại')
                res.redirect('back')
            }
        } catch (err) {
            console.error(err)

            req.flash('error', 'Sửa người dùng thất bại')
            res.redirect('back')
        }
    }

    async create(req, res) {
        res.render('pages/admin/user/create')
    }

    async store(req, res) {
        try {
            const data = await createUser(req.body);
    
            if (data) {
                req.flash('success', 'Tạo người dùng thành công')
                res.redirect('back')
            } else {
                req.flash('error', 'Tạo người dùng thất bại')
                res.redirect('back')
            }
        } catch (err) {
            console.error(err)

            req.flash('error', 'Tạo người dùng thất bại')
            res.redirect('back')
        }
    }

    async myProfile(req, res) {
        const id = req.session?.user.id
        if (!id) {
            res.render('error/404')
        }

        const user = await getUser(id)

        res.render('pages/admin/myProfile', {
            user,
        });
    }
    
    async getPageUpdatePassword(req, res) {
        res.render('pages/admin/changePassword')
    }
    
    async updatePassword(req, res) {
        const id = req.session?.user.id
        const body = {...req.body}
        if (!id) {
            res.render('error/404')
        }

        try {
            const data = await updatePassword(id, body);

            if (data) {

                if(data.error === "error"){
                    req.flash('error', data.message)
                    res.redirect('back')
                }
                else{
                    req.flash(data.error, data.message)
                    res.redirect('back')
                    setTimeout(() => {
                        req.session.destroy();
                    }, 1000)
                } 
            } else {
                req.flash('Lỗi', 'Thay đổi mật khẩu không thành công')
                res.redirect('back')
            }
           
        } catch (err) {
            console.error(err)

            req.flash('error', 'Sửa người dùng thất bại')
            res.redirect('back')
        }
    }

    async getUserDeleted(req, res) {
        const offset = req.query.offset || 0
        const users = await getUserDeleted(offset)

        res.render('pages/admin/user/indexUserDeleted', {
            users,
            offset
        });
    }

    async restoreUser(req, res) {
        try {
            const userId = req.params.id;

            if (userId) {
                const data = await restoreUser(userId);

                if (data) {
                    req.flash('success', 'Khôi phục người dùng thành công')
                    res.redirect('back')
                }
            } else {
                req.flash('error', 'Thiếu ID sản phẩm')
                res.redirect('back')
            }
        } catch (err) {
            console.error(err)

            req.flash('error', 'Có lỗi xảy ra')
            res.redirect('back')
        }
    }
}

export default new AdminOrderController();
