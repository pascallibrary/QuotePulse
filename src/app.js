const express = require('express');
const app = express()

//--Middle ware--
// body parser for json requests

app.use(express.json());
// body parser for url-encoded requests 

app.use(express.urlencoded({ extended: true }))


// Routes 
app.get('/', (req, res) => {
    res.send('Welcome to QuotePulse');
});


app.use((err, req, res, next ) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'An unexpected error occured',
    });
});

module.exports = app;

