require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/utils/db');
const config = require('./src/config');

const PORT = config.PORT;

// connect to the db here

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server running on port ${PORT}');
        console.log(`Access the API at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error('Could not start server due to DB connection error:', err);
});