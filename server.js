// main entry of the application

const app = require('./src/app'); // Import the Express Application
const connectDB = require('./src/utils/db'); // Import the database connection utility
const config = require('./src/config')

const PORT = config.PORT;




// start the server 
app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Access the API at http://localhost:${PORT}`)
})