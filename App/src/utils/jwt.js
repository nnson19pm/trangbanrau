import jwt from 'jsonwebtoken';


const jwtToken = {
    generateToken(user) {
        return jwt.sign({
            id: user.id,
            roleId: user.roleId
        }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' })
    },

    generateRefreshToken(user) {
        return jwt.sign({
            id: user.id,
            roleId: user.roleId
        }, process.env.JWT_SECRET_KEY_RF, { expiresIn: '30d' })
    },

    // save cookie 
    setCookie(res, name, value, timeDays ) {
        res.cookie(name, value, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * timeDays, 
            path: '/',
            sameSite: 'strict',
            // secure: true,
        })
    },

    // [Post] /api/refresh-token
    async requestRefreshToken(req, res) {
        // cookie 
        const cookies_refreshToken = req.cookies.refreshToken;
        if (!cookies_refreshToken) {
            return res.status(401).json({ message: "You are not authenticated!" });
        }
        jwt.verify(cookies_refreshToken, process.env.JWT_SECRET_KEY_RF, (err, user) => {
            if (err) { return console.log(err) }
            const newToken = jwtToken.generateToken(user)
            const newRefreshToken = jwtToken.generateRefreshToken(user)
            jwtToken.setCookie(res, 'refreshToken', newRefreshToken, 7)
            req.user = user;
            res.status(200).json(newToken)
        })
    },

}
export default jwtToken;
