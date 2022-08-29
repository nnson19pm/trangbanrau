import db from '../models'
import {Op} from 'sequelize';
import bcrypt from 'bcrypt';


const getAllUser = async (page, limit) => {
    try {
        // pagination
        const offset = page ? (page - 1) * limit : 0;
        const usersData = await db.User.findAndCountAll({
            limit,
            offset,
            where: {
                delete_flag: false
            },
            attributes: {
                exclude: ['password']
            },
        });

        return usersData;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

const getUserDeleted = async (page, limit) => {
    try {
        // pagination
        const offset = page ? (page - 1) * limit : 0;
        const usersData = await db.User.findAndCountAll({
            limit,
            offset,
            where: {
                delete_flag: true
            },
            attributes: {
                exclude: ['password']
            },
        });

        return usersData;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

const restoreUser = async (userId) => {
    try {
        const user = await db.User.findOne({
            where: {
                id: userId
            }
        });
        if(user){
            const restoreUser = await user.update({delete_flag: false});
            return restoreUser;
        }
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

const searchUser = async (searchKey) => {
    try {
        const usersData = await db.User.findAll({
            where: {
                [Op.or]: [
                    {
                        username: {
                            [Op.like]: `%${searchKey}%`
                        }
                    },
                    {
                        email: {
                            [Op.like]: `%${searchKey}%`
                        }
                    },
                    {
                        full_name: {
                            [Op.like]: `%${searchKey}%`
                        }
                    }
                ]
            }
        });
        return usersData;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

const createUser = async (userData) => {
    try {
        // check if user already exists username or email
        const userExists = await db.User.findOne({
            where: {
                [Op.or]: [
                    {username: userData.username},
                    {email: userData.email}
                ]
            }
        });

        if (!userExists) {
            const hashedPassword = await hashPassword(userData.password);
            const newUser = await db.User.create({
                username: userData.username,
                password: hashedPassword,
                email: userData.email,
                full_name: userData.full_name,
                phone_number: userData.phone_number,
                address: userData.address,
                gender: userData.gender,
                roleId: userData.roleId,
                delete_flag: false
            });
            return newUser;
        }


    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

const updateUser = async (userId, userBody) => {
    try {
        const id = userId;
        const body = {...userBody};

        const user = await db.User.findOne({
            where: {
                id
            },
        });

        if (user) {
            const updatedUser = await user.update(body);
            return updatedUser;
        }
        return null;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

const deleteUser = async (userId) => {
    try {
        const id = userId;
        const user = await db.User.findOne({
            where: {
                id
            },
        });
        if(user){
            const deletedUser = await user.update({delete_flag: true});
            return deletedUser;
        }
       
        return userData;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

const getUser = async (id) => {
    try {
        const product = await db.User.findOne({
            where: {
                id,
            },
            nest: true,
        });

        if (product) {
            return product;
        } else {
            return null;
        }
    } catch (err) {
        throw new Error(err);
    }
};


const updatePassword = async (userId, userBody) => {
    try {
        const id = userId;
        const body = userBody;
        
        const oldPassword = body.oldPassword;
        const newPassword = body.newPassword;
        const retypeNewPassword = body.retypeNewPassword;
        
        const user = await db.User.findOne({
            where: {
                id
            },
        });

        if(user){
            const isMatch = await bcrypt.compare(oldPassword, user.password);
          
            if(isMatch){

                if(newPassword === retypeNewPassword){
                    const hashedPassword = await hashPassword(newPassword);
                    await user.update({
                        password: hashedPassword
                    });
                    return {
                        error: 'success',
                        message: 'Thay Đổi Mật Khẩu Thành Công'
                    };
                    
                }
                return {
                    error: 'error',
                    message: 'Mật Khẩu Mới Không Trùng Khớp'
                };
            }
            return {
                error: 'error',
                message: 'Mật Khẩu Cũ Không Đúng'
            };
        }
        return {
            error: 'error',
            message: 'Tài Khoản Không Tồn Tại'
        };


    } catch (err) {
        throw new Error(err);
    }
}
export {
    getAllUser,
    createUser,
    hashPassword,
    updateUser,
    deleteUser,
    searchUser,
    getUser,
    updatePassword,
    getUserDeleted,
    restoreUser
};
