/** @format */

import loginService from '../services/loginService';
import bcrypt from "bcrypt";
import db from "../models";
import {Op} from "sequelize";

class LoginController {
    // [Post] /api/login
    async login(req, res) {
        res.render('pages/login');
    }

    async doLogin(req, res) {
        const username = req.body.email_username;
        const password = req.body.password;

        if (!username || !password) {
            await req.flash('error', 'Tên đăng nhập hoặc mật khẩu không được trống');
            res.redirect('back');
            return;
        }
        const data = await loginService.loginUser(username, password, req, res);

        if(data.status == true){
            await req.flash('userInfo', data);
            if(data.roleId === 'admin' || data.roleId === 'staff' && data.delete_flag === false) {
                res.redirect('/admin');
            }
            else if(data.roleId === 'user' && data.delete_flag === false ) {
                res.redirect('/');
            }
            else {
                res.redirect('/shipper');
            }
            return;
        }else if(data.status == false){
            await req.flash('error', data.message);
            res.redirect('back');
            return;
        }
        else{
            await req.flash('error', data.message);
            res.redirect('back');
            return;
        }
    }

    // [Get] /api/logout
    logout(req, res) {
        loginService.logoutUser(req, res);

        res.redirect('/login');
    }

    register(req, res) {
        res.render('pages/register')
    }

    async doRegister(req, res) {
        const {
            username,
            password,
            email,
            fullName,
            phoneNumber,
            address,
            gender,
        } = req.body;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            // check username or email is exist
            const userExists = await db.User.findOne({
                where: {
                    [Op.or]: [
                        {username: username},
                        {email: email}
                    ]
                }
            });
            if (!userExists) {
                const newUser = await db.User.create({
                    username: username,
                    password: hashed,
                    email: email,
                    full_name: fullName,
                    phone_number: phoneNumber,
                    address: address,
                    gender: gender,
                    roleId: 'user',
                    delete_flag: false
                });

                if (newUser){
                    req.flash('regSuccess', 'Đăng ký thành công')

                    return res.redirect('/login')
                } else {
                    req.flash('regFailed', 'Đăng ký thất bại')

                    return res.redirect('back')
                }
            }

            req.flash('regFailed', 'Email hoặc tên đăng nhập đã tồn tại')

            return res.redirect('back')

        } catch (err) {
            console.log(err)
        }
    }
}

export default new LoginController();
