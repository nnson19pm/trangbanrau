import userService from '../services/userService';

class UserController {

    // [GET] /api/user/get-list
    async getListUser(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const data = await userService.getAllUser(page, limit);
            if(data) {
                return res.status(200).json({
                    status: 'ok',
                    message: 'Get list user successfully',
                    data
                })
            }
            
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    // [GET] /api/user/search
    async searchUser(req, res) {
        try {
            const searchKey = req.query.q;
            if (searchKey) {
                const usersData = await userService.searchUser(searchKey);
                return res.status(200).json({
                    message: 'Search user successfully',
                    usersData
                })
            }
            return res.status(400).json({
                message: 'Search key is required'
            })

        } 
        catch (err) {
            throw new Error(err);
        }
            
    }
    

    // [POST] /api/user/create
    async createUser(req, res) {
        try {
            const userData = await userService.createUser(req.body);
            if (userData) {
                return res.status(201).json({
                    message: 'Create user successfully',
                    userData
                })
            }
            return res.status(400).json({
                message: 'Username or email already exists'
            })

        }
        catch (err) {
            return res.status(500).json({
                message: 'Create user failed',
                err
            })
        }
    }

    // [PUT] /api/user/update
    async updateUser(req, res) {
        try {
            const userId = req.query.id;
            const userBody = req.body;

            if (userId) {
                const userData = await userService.updateUser(userId, userBody);
                switch (userData) {
                    case null || undefined:
                        return res.status(404).json({
                            message: 'User not found'
                        })
                    case false:
                        return res.status(400).json({
                            message: 'Password is incorrect'
                        })
                    default:
                        return res.status(200).json({
                            message: 'Update user successfully',
                            userData
                        })
                }

            }
            return res.status(400).json({
                message: 'User id is required'
            })
        }
        catch (err) {
            return res.status(500).json({
                message: 'Update user failed',
                err: err
            })
        }
    }

    // [DELETE] /api/user/delete
    async deleteUser(req, res) {
        try {
            const userId = req.query.id;
            if (userId) {
                const userData = await userService.deleteUser(userId);
                if (userData) {
                    return res.status(200).json({
                        message: 'Delete user successfully',
                        userData
                    })
                }
                return res.status(400).json({
                    message: 'User not found'
                })
            }
            return res.status(400).json({
                message: 'User id is required'
            })
        }
        catch (err) {
            return res.status(500).json({
                message: 'Delete user failed',
            })
        }
    }
}
export default new UserController();