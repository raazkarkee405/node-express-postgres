const express = require('express');
const app = express();

app.use(express.json());

const cors = require('../api/middlewares/cors.middleware');
app.use(cors);

require('../api/middlewares/middleware')(app);

//load routes
require('../config/routes')(app);

// use format for no endpoint error response
app.use((req, res, next) => {
    const error = new Error("Routes not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({error: {message: error.message}});
});

module.exports = app;