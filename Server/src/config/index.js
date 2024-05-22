"use strict";

const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
var morgan = require('morgan');
const createHttpError = require('http-errors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const authRoute = require('../api/v1/routes/auth.route');
const userRoute = require('../api/v1/routes/user.route');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);

app.use((req, res, next) => {
    next(createHttpError.NotFound('This route is not exit'));
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message
    })
}
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})