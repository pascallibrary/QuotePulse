require('dotenv').config();

const express = require('express');
const app = require('./src/app'); 
const connectDB = require('./src/utils/db');
const config = require('./src/config');
const cors = require('cors');

const PORT = config.PORT;

// ✅ Allow requests from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // if you're using cookies or auth headers
}));

app.use(express.json());

// connect to the db here

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Access the API at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error('Could not start server due to DB connection error:', err);
});