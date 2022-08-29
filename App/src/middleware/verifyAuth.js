/** @format */

import jwt from 'jsonwebtoken';
import createError from '../utils/createError';

const authMiddleware = {
    // verifyToken: (req, res, next) => {
    //     const token = req.headers.token;
    //     if (token) {
    //         const accessToken = token.split(' ')[1]; //EX :  bearer token
    //         jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, user) => {
    //             if (err) {
    //                 return res.status(403).json({
    //                     message: err.message,
    //                 });
    //             }
    //             req.user = user;
    //             next();
    //         });
    //     } else {
    //         return res.status(401).json({
    //             message: 'Auth failed',
    //         });
    //     }
    // },

    // verifyTokenAdmin: (req, res, next) => {
    //     authMiddleware.verifyToken(req, res, () => {
    //         if (req.user.roleId === 'admin') {
    //             next();
    //         } else {
    //             createError.notAuthorized(res);
    //         }
    //     });
    // },

    // verifyTokenUserAndAdmin: (req, res, next) => {
    //     authMiddleware.verifyToken(req, res, () => {
    //         if (req.user.roleId === 'user' || req.user.roleId === 'admin') {
    //             next();
    //         } else {
    //             createError.notAuthorized(res);
    //         }
    //     });
    // },

    // verifyTokenStaff: (req, res, next) => {
    //     authMiddleware.verifyToken(req, res, () => {
    //         if (req.user.roleId === 'staff') {
    //             next();
    //         } else {
    //             createError.notAuthorized(res);
    //         }
    //     });
    // },

    checkAdmin: (req, res, next) => {
        if (req.session.isLoggedIn) {
            if (req.session.user.roleId === 'admin') {
                next();
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    },

    checkAdminAndStaff: (req, res, next) => {
        if (req.session.isLoggedIn) {
            if (req.session.user.roleId === 'admin' || req.session.user.roleId === 'staff') {
                next();
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    },
    
    checkShipper: (req, res, next) => {
        if (req.session.isLoggedIn) {
            if (req.session.user.roleId === 'shipper') {
                next();
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    },

    checkUser: (req, res, next) => {
         if (req.session.isLoggedIn) {
            if (req.session.user.roleId === 'user') {
                next();
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    }

};

export default authMiddleware;
