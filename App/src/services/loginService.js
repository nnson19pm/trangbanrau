/** @format */

import db from '../models';
import bcrypt from 'bcrypt';

const loginUser = async (username, password, req, res) => {
	try {
		// check user exist and delete_flag = false
		const user = await db.User.findOne({
			where: {
				username: username,
				delete_flag: false
			}
		});
		if(user){
			// check password
			const isMatch = await bcrypt.compare(password, user.password);
			if(isMatch){
				const { password, ...userData } = user.dataValues;
				req.session.isLoggedIn = true;
				req.session.user = userData;

				return {
					...userData,
					status:  true
				};
				
			} else {
				return {
					message: 'Mật khẩu không chính xác',
					status: false
				}
			}
		}else{
			return {
				message: 'Tài khoản không tồn tại hoặc đã bị khóa',
				status: null
			}
		}
		
		
	} catch (err) {
		console.log(err);
	}
};

const logoutUser = (req, res) => {

	req.session.destroy();
};

export default {
	loginUser,
	logoutUser,
};
