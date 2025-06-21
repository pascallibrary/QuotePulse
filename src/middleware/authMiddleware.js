const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    
    // check if token is present in the Authorization header 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        try {
    
            // try and get token for from header(format: 'BEARER-TOKEN')
            token = req.headers.authorization.split(' ')[1];


            // verify token 
            const decoded = jwt.verify(token, config.JWT_SECRET);


            // Attach user to the request object(excluding password) 
            req.user = await User.findById(decoded.id).select('password')

            if (!req.user) {
                return res.status(401).json({ status: 'error', message: 'Not authorized, user not found'})
            }

            next();


        } catch (error) {
            console.error('Authentication error:', error.message);

            if (error.name === 'TokenExpiredError'){
                return res.status(401).json({ status: 'error', message: 'Not authorized, token expired'})
            }

            if(error.name === 'JsonWebTokenError') {
                return res.status(401).json({ status: 'error', message: 'Not authorized, invalid token'})
            }
            res.status(401).json({ status: 'error', message: 'Not Authorized, token failed'});
        }

        if(!token){
            res.status(401).json({ status: 'error', message: 'Not authorized, no token'});
        }

        module.exports = { protect };
} 