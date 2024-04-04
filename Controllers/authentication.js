const jwt = require('jsonwebtoken');
const { User } = require('../Models/user');
const AppError = require('../utils/errorHandler');

const isAuthenticated = async (req, res, next) => {
    try {
        let token;

        const authHeader = req.headers.authorization;
        if (authHeader) {
            token = authHeader.split(' ')[1];
        } else if (req.cookies) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return next(new AppError('Unauthorized', 401));
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const date = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < date) {
            return next(new AppError('Token expired', 401));
        }

        const user = await User.findById(decodedToken.id);
        if (!user) {
            return next(new AppError('User not found', 404));
        }

        req.user = user;
        next();
    } catch (err) {
        next(new AppError('Unauthorized', 401));
    }
};

module.exports = { isAuthenticated };










// const jwt = require('jsonwebtoken')
// const { User } = require('../Models/user')
// const AppError = require('../utils/errorHandler')

// const isAuthenticated = async (req, res, next) => {

//     try {
//         const authHeader = req.headers.authorization
//         if (authHeader) {
//             const token = authHeader.split(' ')[1];
//             return token
//         }
//         if (req.cookies) var token = req.cookies.jwt
//         const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
//         const date = new Date
//         const time = parseInt(date.getTime() / 1000)
//         const user = await User.findById(decodedToken.id)

//         if (user && decodedToken.iat < time)
//             req.user = user

//          next()
//     } catch (err) {
//         next(new AppError(err, 500))
//     }
// }

// module.exports = { isAuthenticated }