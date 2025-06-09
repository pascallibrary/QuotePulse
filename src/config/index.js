require('dotenv').config();

const config = {
   MONGO_URI: process.env.MONGO_URI,
   PORT: process.env.PORT || 3000,
   JWT_SECRET: process.env.JWT_SECRET,
   EMAIL_USER: process.env.EMAIL_USER,
   EMAIL_PASS: process.env.EMAIL_PASS,
}

// Basic validation for essential variables
if (!config.MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in .env')
    process.exit(1); 
}

if (!config.JWT_SECRET) {
    console.error('WARNING: JWT_SECRET is not defined in .env. Authentication will not work correctly.');
}

module.exports = config;
