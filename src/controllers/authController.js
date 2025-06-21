// handle the logic for handling user registration and login requests

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (id) => {
    return jwt.sign({ id }, config.JWT_SECRET, {
        expiresIn: '1h', // token expires in 1hr
    });
}

// @desc Register a new user
// @route POST /api/auth/register
// @access Public

const registerUser = async(req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ status: 'error', message: 'Please enter all fields'})
    }

    try {
        // check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ status: 'error', message: 'User already exists'})
        }

        // Create new user
        const user = await User.create({
            email,
            password,
        });

        if (user) {
           res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: {
                id: user._id,
                email: user.email,
                token: generateToken(user._id),
            },
           });
        } else {
            res.status(400).json({ status: 'error', message: 'Invalid user data'});
        } 
    } catch(error) {
      // check for mongoose validations error
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({status: 'error', message: messages.join(',') });
      } 
      console.error('Registration error:', error.message);
      res.status(500).json({ status: 'error', message: 'Server error during registration'})
    };
};

// @desc Authenticate user and get token
// @route POST /api/auth/login
// @access public

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: 'error', message: 'Please fill all fields' });
    }

    try {
        const user = await User.findOne({ email }).select('+password');
        
        if (user && (await user.comparePassword(password))) {
            res.status(200).json({
                status: 'success',
                message: 'Logged in successfully',
                data: {
                    id: user._id,
                    email: user.email,
                    token: generateToken(user._id),
                },
            });
        } else {
            res.status(401).json({ status: 'error', message: 'Invalid credientials'})
        }         
    } catch (error) {
        console.error('Login error:', error.message)
        res.status(500).json({ status: 'error', message: 'Server error during login'})
    }
};

module.exports = { registerUser, loginUser };
